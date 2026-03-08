import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Latex from 'react-latex';
import { Card, CardBody, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useProfile } from '../context/ProfileContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const commentSchema = yup.object().shape({
  content: yup.string().required('Comment cannot be empty'),
});

export function Component() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { username } = useProfile();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const fetchPost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const onCommentSubmit = async (data: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: username || 'Anonymous Student',
          content: data.content,
        }),
      });

      if (response.ok) {
        reset();
        fetchPost(); // Refresh post to show new comment
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  const toggleComplete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !post.completed }),
      });
      if (response.ok) {
        if (!post.completed) navigate('/forum');
        else fetchPost();
      }
    } catch (error) {
      console.error('Failed to toggle complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-fuchsia-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-700">Post not found</h2>
        <Button onClick={() => navigate('/forum')} className="mt-4">Back to Forum</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-slate-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/forum')}
          className="flex items-center gap-2 text-slate-500 hover:text-fuchsia-600 font-bold transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Forum
        </button>
        {post.author === username && (
          <Button 
            onClick={toggleComplete}
            variant={post.completed ? "ghost" : "primary"}
            className={post.completed ? "text-green-600 border-green-200 hover:bg-green-50" : "bg-green-600 hover:bg-green-700 shadow-green-500/30"}
          >
            {post.completed ? "✓ Completed" : "Mark as Complete"}
          </Button>
        )}
      </div>

      <Card className="border-transparent shadow-md bg-white">
        <CardHeader className="border-b border-slate-50 pb-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
                  {post.title}
                </CardTitle>
                {post.completed && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full border border-green-200 uppercase tracking-widest">
                    Completed
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-fuchsia-50 text-fuchsia-700 text-xs font-bold rounded-full border border-fuchsia-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></span>
                <span className="text-sm font-bold text-slate-700">{post.author}</span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-8">
          <div className="text-slate-700 text-lg whitespace-pre-wrap leading-relaxed font-medium">
            <Latex>{post.content}</Latex>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-6">

        {/* Existing Comments */}
        <div className="space-y-4">
          {post.comments?.map((comment: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-400 italic">User</span>
                  {comment.author}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-slate-600 font-medium leading-relaxed">
                <Latex>{comment.content}</Latex>
              </div>
            </div>
          ))}
          {post.comments?.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">No replies yet. Be the first to join the conversation!</p>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          Replies <span className="text-fuchsia-600 bg-fuchsia-50 px-3 py-1 rounded-full text-sm">{post.comments?.length || 0}</span>
        </h3>

        {/* Comment Form */}
        <Card className="border-fuchsia-100 shadow-sm bg-white">
          <CardBody>
            <form onSubmit={handleSubmit(onCommentSubmit)} className="space-y-4">
              <div>
                <textarea
                  {...register('content')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 font-medium focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all h-32"
                  placeholder="Share your thoughts or provide help..."
                />
                {errors.content && <p className="text-red-500 text-xs mt-1 font-bold">{errors.content.message}</p>}
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="shadow-fuchsia-500/30 flex items-center gap-2">
                  <FaPaperPlane size={14} /> Send Reply
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Component;
