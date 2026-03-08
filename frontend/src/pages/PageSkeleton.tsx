import React from 'react';

export function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full transition-colors duration-300">
      <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white shadow-sm border border-purple-100 max-w-sm w-full animate-fade-in relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-magenta-500" />

        <div className="relative flex items-center justify-center my-4">
          {/* Background Track */}
          <div className="absolute w-24 h-24 rounded-full border-[6px] border-slate-100"></div>

          {/* Spinning Primary Ring */}
          <div className="absolute w-24 h-24 rounded-full border-[6px] border-purple-500 border-t-transparent border-l-transparent border-b-magenta-500 animate-[spin_1.5s_linear_infinite]"></div>

          {/* Inner pulsing element */}
          <div className="w-10 h-10 bg-blue-500/10 rounded-full animate-ping delay-150"></div>
          <div className="absolute w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        </div>

        <div className="space-y-3 text-center w-full mt-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
            Loading...
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Getting things ready for you
          </p>

          {/* Progress bar skeleton */}
          <div className="mt-8 w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
