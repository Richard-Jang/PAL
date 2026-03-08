import { useState, useMemo, useEffect } from 'react';
import Latex from 'react-latex';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useProfile } from '../context/ProfileContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSummary, buildPostContext } from '../util/hooks/useSummary';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  tags: yup.string().required('At least one tag is required (comma separated)'),
});

const ALL_TAGS = ['Computer Science', 'Math', 'Physics', 'Biology', 'Homework Help', 'Web Dev', 'Calculus', 'React'];

export function Component() {
  const { username } = useProfile();
  const navigate = useNavigate();
  const { isSummarizing, generateSummary } = useSummary();
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSelectingForSummary, setIsSelectingForSummary] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);

  const togglePostSelection = (id: string) => {
    setSelectedPostIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleAiAction = async () => {
    if (!isSelectingForSummary) {
      setIsSelectingForSummary(true);
      setSelectedPostIds([]);
      return;
    }

    if (selectedPostIds.length === 0) {
      setIsSelectingForSummary(false);
      return;
    }

    // For each selected post: fetch full data → Gemini summarize → post as a comment by "PAL"
    try {
      await Promise.all(selectedPostIds.map(async (postId) => {
        // 1. Fetch the full post with comments
        const res = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${postId}`);
        if (!res.ok) return;
        const fullPost = await res.json();

        // 2. Build the context string and call Gemini via hook
        const context = buildPostContext(fullPost);
        const summary = await generateSummary(context);

        if (summary) {
          // 3. Post the Gemini summary as a comment under the original post
          await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author: 'PAL', content: summary }),
          });
        }
      }));

      setIsSelectingForSummary(false);
      setSelectedPostIds([]);
      fetchPosts();
    } catch (error) {
      console.error('Failed to generate AI summary:', error);
    }
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    reset({ title: '', content: '', tags: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    reset({
      title: post.title,
      content: post.content,
      tags: post.tags.join(', '),
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    const postData = {
      title: data.title,
      content: data.content,
      tags: data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== ''),
      author: username || 'Anonymous Student',
    };

    try {
      const url = editingPost 
        ? `${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${editingPost.id}`
        : `${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts`;
      
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-slate-50 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-fuchsia-100">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 tracking-tight mb-2">
            Student Forum
          </h1>
          <p className="text-slate-600 font-medium">Discuss classes, ask questions, and share knowledge.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all shadow-sm"
            />
          </div>
          <Button onClick={openCreateModal} className="shrink-0 shadow-fuchsia-500/30">Create Post</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {selectedTag && (
             <div className="flex items-center gap-2 mb-2">
               <span className="text-sm font-semibold text-slate-500">Filtered by:</span>
               <span className="px-3 py-1 bg-fuchsia-100 text-xs font-bold rounded-full text-fuchsia-800 border border-fuchsia-200 shadow-sm flex items-center gap-2">
                 {selectedTag}
                 <button onClick={() => setSelectedTag(null)} className="hover:text-fuchsia-500 transition-colors">&times;</button>
               </span>
             </div>
          )}
          
          {loading ? (
             <div className="text-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500 mx-auto"></div>
               <p className="mt-4 text-slate-500 font-medium italic">Retrieving latest discussions...</p>
             </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold text-slate-700">No posts found</h3>
              <p className="text-slate-500 mt-2 font-medium">Try adjusting your search query or removing filters.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card 
                onClick={() => isSelectingForSummary ? togglePostSelection(post.id) : navigate(`/forum/${post.id}`)}
                hoverable
                className={`transition-all duration-300 group relative cursor-pointer border ${
                  isSelectingForSummary 
                    ? selectedPostIds.includes(post.id)
                      ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                      : 'border-purple-200 bg-white hover:border-purple-400'
                    : 'border-transparent shadow-sm hover:shadow-md'
                }`} 
                key={post.id}
              >
                {post.author === username && !isSelectingForSummary && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(post);
                      }} 
                      className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-blue-500 hover:border-blue-200 shadow-sm"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost(post.id);
                      }} 
                      className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-red-500 hover:border-red-200 shadow-sm"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                )}
                {isSelectingForSummary && (
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-colors ${
                    selectedPostIds.includes(post.id) ? 'bg-purple-600 border-purple-600' : 'border-purple-200'
                  } flex items-center justify-center`}>
                    {selectedPostIds.includes(post.id) && <span className="text-white text-xs font-black">✓</span>}
                  </div>
                )}
                <CardHeader className="mb-2">
                  <div className="flex items-center gap-3 pr-16 text-left">
                    <CardTitle className={`text-2xl font-bold transition-colors leading-tight ${
                       isSelectingForSummary ? 'text-slate-700' : 'text-slate-800 group-hover:text-fuchsia-600'
                    }`}>
                      {post.title}
                    </CardTitle>
                    {post.completed && (
                      <span className="shrink-0 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md border border-emerald-200 uppercase tracking-widest">
                        ✓ Done
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="text-left">
                  <div className="text-slate-600 mb-6 whitespace-pre-wrap leading-relaxed font-medium">
                    <Latex>{post.content}</Latex>
                  </div>
                  <div className="flex flex-wrap gap-2 text-left">
                    {post.tags.map((tag: any) => (
                      <span 
                        key={tag} 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSelectingForSummary) setSelectedTag(tag);
                        }}
                        className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm border transition-colors cursor-pointer ${
                          selectedTag === tag 
                            ? 'bg-fuchsia-600 text-white border-fuchsia-700' 
                            : 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 hover:bg-fuchsia-100'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardBody>
                <CardFooter className="pt-4 mt-6 border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 text-left">
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span className={`w-5 h-5 rounded-full ${post.author === 'PAL' ? 'bg-gradient-to-br from-fuchsia-600 to-purple-600 animate-pulse ring-2 ring-purple-200' : 'bg-gradient-to-br from-blue-400 to-purple-400'}`}></span> 
                      {post.author}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg whitespace-nowrap">{post.views || 0} views</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg whitespace-nowrap">{post.comments?.length || 0} comments</span>
                  </div>
                  {post.completed ? (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 uppercase tracking-widest shadow-sm">
                      Completed
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{new Date(post.updatedAt).toLocaleDateString()}</span>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-purple-100 shadow-purple-900/5 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-wrap gap-2 pt-2">
              {ALL_TAGS.map(tag => (
                <span 
                  key={tag} 
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 cursor-pointer text-sm font-semibold rounded-full shadow-sm transition-colors border ${
                    tag === selectedTag 
                      ? 'bg-purple-600 text-white border-purple-700' 
                      : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </CardBody>
          </Card>
          
          <Card className={`transition-all duration-500 border ${
            isSelectingForSummary 
              ? 'border-purple-400 bg-purple-50 shadow-lg shadow-purple-500/10' 
              : 'border-blue-100 bg-gradient-to-br from-white to-blue-50/50'
          }`}>
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg flex items-center gap-2">
                {isSelectingForSummary ? '🤖 AI Selecting...' : '✨ AI Summarizer'}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm font-medium text-slate-600 mb-4 leading-relaxed">
                {isSelectingForSummary 
                  ? "Click on the forum cards to your left that you want to include in the summary."
                  : "Select multiple discussions to get an instant AI-powered summary of the core takeaways."}
              </p>
              
              <Button 
                onClick={handleAiAction}
                isLoading={isSummarizing}
                className={`w-full shadow-lg transition-all duration-300 ${
                  isSelectingForSummary 
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30' 
                    : 'shadow-blue-500/20'
                }`}
              >
                {isSelectingForSummary 
                  ? `Generate Summary (${selectedPostIds.length})` 
                  : 'Summarize with AI'}
              </Button>

              {isSelectingForSummary && (
                <button 
                  onClick={() => {
                    setIsSelectingForSummary(false);
                    setSelectedPostIds([]);
                  }}
                  className="w-full mt-4 text-[10px] font-black text-slate-400 hover:text-purple-600 uppercase tracking-widest transition-colors"
                >
                  Cancel Selection
                </button>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal - Post Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
            <h2 className="text-3xl font-black mb-6 text-gray-800">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all font-bold text-slate-800"
                  placeholder="What's on your mind?"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1 font-bold">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Content (LaTeX Supported)</label>
                <textarea
                  {...register('content')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all h-32 font-medium text-slate-700"
                  placeholder="Explain your problem... Use $...$ for equations."
                />
                {errors.content && <p className="text-red-500 text-xs mt-1 font-bold">{errors.content.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Tags (Comma Separated)</label>
                <input
                  {...register('tags')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all font-bold text-slate-800"
                  placeholder="Math, Calculus, Homework Help"
                />
                {errors.tags && <p className="text-red-500 text-xs mt-1 font-bold">{errors.tags.message}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1 font-bold">Cancel</Button>
                <Button type="submit" className="flex-1 font-bold shadow-fuchsia-500/30">
                  {editingPost ? 'Save Changes' : 'Post to Forum'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;
