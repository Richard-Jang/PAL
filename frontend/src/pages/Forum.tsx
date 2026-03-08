import React, { useState, useMemo } from 'react';
import Latex from 'react-latex';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useDatabase } from '../util/hooks/useDatabase';
import { FaSearch } from 'react-icons/fa';

// Requires katex CSS for react-latex to render properly usually, but we implement the logic
// import 'katex/dist/katex.min.css';

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Help with Taylor Series',
    author: 'math_wiz22',
    tags: ['Math', 'Calculus'],
    content: 'Can someone explain how to find the Maclaurin series for $e^x$? I keep getting stuck after the first few terms.',
    views: 142,
    comments: 5,
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    title: 'React useEffect dependency array',
    author: 'frontend_dev',
    tags: ['Computer Science', 'Web Dev', 'React'],
    content: 'Why does my effect run infinitely here? `useEffect(() => { setX(x + 1) }, [x])`',
    views: 89,
    comments: 12,
    lastActive: '5 mins ago'
  },
  {
    id: 3,
    title: 'Physics 2: Capacitors in series',
    author: 'tesla_fan',
    tags: ['Physics', 'Homework Help'],
    content: 'If I have two capacitors $C_1 = 5\\mu F$ and $C_2 = 10\\mu F$ in series, what is the equivalent capacitance $C_{eq}$?',
    views: 34,
    comments: 2,
    lastActive: '10 mins ago'
  }
];

const ALL_TAGS = ['Computer Science', 'Math', 'Physics', 'Biology', 'Homework Help', 'Web Dev', 'Calculus', 'React'];

export function Component() {
  useDatabase('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-slate-50 min-h-screen">
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
          <Button className="shrink-0 shadow-fuchsia-500/30">Create Post</Button>
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
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold text-slate-700">No posts found</h3>
              <p className="text-slate-500 mt-2 font-medium">Try adjusting your search query or removing filters.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card hoverable className="cursor-pointer border-transparent shadow-sm hover:shadow-md transition-all duration-300 group" key={post.id}>
                <CardHeader className="mb-2">
                  <CardTitle className="text-2xl text-slate-800 group-hover:text-fuchsia-600 transition-colors font-bold">{post.title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="text-slate-600 mb-6 whitespace-pre-wrap leading-relaxed font-medium">
                    <Latex>{post.content}</Latex>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                        className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm border transition-colors ${
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
                <CardFooter className="pt-4 mt-6 border-slate-100">
                  <div className="flex items-center gap-6 text-sm font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></span> {post.author}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg">{post.views} views</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg">{post.comments} comments</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{post.lastActive}</span>
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
          
          <Card className="border-blue-100 shadow-blue-900/5 bg-gradient-to-br from-white to-blue-50/50">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg flex items-center gap-2">✨ AI Summarizer</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm font-medium text-slate-600 mb-4 leading-relaxed">Paste a long forum thread link to get a quick AI summary of the discussion.</p>
              <input placeholder="Paste link..." className="w-full bg-white border border-slate-300 rounded-lg p-3 mb-4 text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none transition-all" />
              <Button className="w-full shadow-sm" variant="primary">Summarize Thread</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Component;
