import { Link } from 'react-router-dom';
import { Card, CardBody } from '../util/components/Card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-4 animate-pulse">
          Welcome to PAL
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          The ultimate forum-like hub where students connect, learn, teach, and collaborate together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <Link to="/auth">
          <Card hoverable className="h-full text-center border-blue-500/30 hover:border-blue-400 transition-colors">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <span className="text-4xl mb-4">👤</span>
              <h3 className="text-xl font-bold text-white mb-2">Profile & Auth</h3>
              <p className="text-slate-400 text-sm">Sign in to manage your classes and connections.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/video">
          <Card hoverable className="h-full text-center border-purple-500/30 hover:border-purple-400 transition-colors">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <span className="text-4xl mb-4">🎥</span>
              <h3 className="text-xl font-bold text-white mb-2">Study Rooms</h3>
              <p className="text-slate-400 text-sm">Join video calls with a built-in whiteboard.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/forum">
          <Card hoverable className="h-full text-center border-teal-500/30 hover:border-teal-400 transition-colors">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <span className="text-4xl mb-4">💬</span>
              <h3 className="text-xl font-bold text-white mb-2">Student Forum</h3>
              <p className="text-slate-400 text-sm">Ask questions with LaTeX math support.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/chat">
          <Card hoverable className="h-full text-center border-orange-500/30 hover:border-orange-400 transition-colors">
            <CardBody className="flex flex-col items-center justify-center py-8">
              <span className="text-4xl mb-4">🤖</span>
              <h3 className="text-xl font-bold text-white mb-2">AI Student Chat</h3>
              <p className="text-slate-400 text-sm">Teach an AI concepts to test your own knowledge.</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
}
