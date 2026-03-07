import Latex from 'react-latex';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useDatabase } from '../util/hooks/useDatabase';

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
    tags: ['CS', 'Web Dev', 'React'],
    content: 'Why does my effect run infinitely here? `useEffect(() => { setX(x + 1) }, [x])`',
    views: 89,
    comments: 12,
    lastActive: '5 mins ago'
  }
];

export default function Forum() {
  useDatabase('posts');

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">
            Student Forum
          </h1>
          <p className="text-slate-400">Discuss classes, ask questions, and share knowledge.</p>
        </div>
        <Button>Create Post</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {MOCK_POSTS.map((post) => (
            <Card hoverable className="cursor-pointer" key={post.id}>
              <CardHeader className="mb-2">
                <CardTitle className="text-xl text-blue-300">{post.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="text-slate-300 mb-4 whitespace-pre-wrap">
                  <Latex>{post.content}</Latex>
                </div>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-800 text-xs rounded-md text-slate-400 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="pt-3 mt-4">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Author: {post.author}</span>
                  <span>{post.views} views</span>
                  <span>{post.comments} comments</span>
                </div>
                <span className="text-xs text-slate-500">{post.lastActive}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Tags</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-wrap gap-2">
              {['Computer Science', 'Math', 'Physics', 'Biology', 'Homework Help'].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700 cursor-pointer text-sm rounded-full text-blue-300 border border-slate-700/50 transition">
                  {tag}
                </span>
              ))}
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Summarizer</CardTitle>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-slate-400 mb-4">Paste a long forum thread link to get a quick AI summary of the discussion.</p>
              <input placeholder="Paste link..." className="w-full bg-slate-800 border border-slate-700 rounded p-2 mb-2 text-white text-sm" />
              <Button className="w-full" variant="secondary">Summarize Thread</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
