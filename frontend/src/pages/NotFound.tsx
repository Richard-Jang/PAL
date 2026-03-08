import { Link } from "react-router-dom";

export function Component() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-slate-900 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-magenta-300/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-[100px] pointer-events-none" />

      <div className="text-center max-w-lg w-full space-y-8 animate-fade-in relative z-10 bg-white/60 p-12 rounded-3xl backdrop-blur-md shadow-sm border border-slate-200 backdrop-blur-xl">
        <div className="relative">
          {/* Subtle glow effect behind the text */}
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />

          <h1 className="relative text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-600 to-magenta-600 drop-shadow-sm">
            404
          </h1>
        </div>

        <div className="space-y-3 relative z-10">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Page not found
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="pt-8 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Component;
