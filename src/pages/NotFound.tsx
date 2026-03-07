import { Link } from "react-router-dom";

export function Component() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans text-slate-50">
      <div className="text-center max-w-md w-full space-y-6 animate-fade-in">
        <div className="relative">
          {/* Subtle glow effect behind the text */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          
          <h1 className="relative text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600">
            404
          </h1>
        </div>

        <div className="space-y-2 relative z-10">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Page not found
          </h2>
          <p className="text-slate-400 text-sm">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="pt-8 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Component;
