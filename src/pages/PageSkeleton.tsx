import React from 'react';

export function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 max-w-sm w-full animate-pulse-slow">
        <div className="relative flex items-center justify-center">
          {/* Background Track */}
          <div className="absolute w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
          
          {/* Spinning Primary Ring */}
          <div className="absolute w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent border-l-transparent animate-spin"></div>
          
          {/* Inner pulsing element */}
          <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        
        <div className="space-y-2 text-center w-full mt-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Loading...
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Getting things ready for you
          </p>
          
          {/* Progress bar skeleton */}
          <div className="mt-6 w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-1/2 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
