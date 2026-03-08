import { Link } from 'react-router-dom';
import { Card, CardBody } from '../util/components/Card';

export function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-200/40 to-fuchsia-200/40 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-blue-200/40 to-cyan-200/30 blur-3xl mix-blend-multiply" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-magenta-200/30 to-pink-200/30 blur-3xl mix-blend-multiply" />
      </div>

      <div className="text-center mb-16 relative z-10 w-full">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 mb-6 tracking-tight drop-shadow-sm">
          Welcome to PAL
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium">
          The ultimate forum-like hub where students connect, learn, teach, and collaborate together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl relative z-10 px-4">
        <Link to="/profile" className="group">
          <Card hoverable className="h-full text-center border-blue-200 group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all duration-300">
            <CardBody className="flex flex-col items-center justify-center py-10">
              <span className="text-5xl mb-6 text-blue-500 transform group-hover:scale-110 transition-transform">👤</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">Profile</h3>
              <p className="text-slate-600 text-sm font-medium">Manage your classes, info, and connections.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/video" className="group">
          <Card hoverable className="h-full text-center border-purple-200 group-hover:border-purple-400 group-hover:bg-purple-50/50 transition-all duration-300">
            <CardBody className="flex flex-col items-center justify-center py-10">
              <span className="text-5xl mb-6 text-purple-500 transform group-hover:scale-110 transition-transform">🎥</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors">Study Rooms</h3>
              <p className="text-slate-600 text-sm font-medium">Join video calls with a built-in whiteboard.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/forum" className="group">
          <Card hoverable className="h-full text-center border-fuchsia-200 group-hover:border-fuchsia-400 group-hover:bg-fuchsia-50/50 transition-all duration-300">
            <CardBody className="flex flex-col items-center justify-center py-10">
              <span className="text-5xl mb-6 text-fuchsia-500 transform group-hover:scale-110 transition-transform">💬</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-fuchsia-700 transition-colors">Student Forum</h3>
              <p className="text-slate-600 text-sm font-medium">Ask questions with LaTeX math support.</p>
            </CardBody>
          </Card>
        </Link>

        <Link to="/chat" className="group">
          <Card hoverable className="h-full text-center border-indigo-200 group-hover:border-indigo-400 group-hover:bg-indigo-50/50 transition-all duration-300">
            <CardBody className="flex flex-col items-center justify-center py-10">
              <span className="text-5xl mb-6 text-indigo-500 transform group-hover:scale-110 transition-transform">🤖</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors">AI Student Chat</h3>
              <p className="text-slate-600 text-sm font-medium">Teach an AI concepts to test your own knowledge.</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Component;
