import { useState } from 'react';
import { useVideoRoom } from '../util/hooks/useVideoRoom';
import { Button } from '../util/components/Button';
import { Card, CardBody, CardHeader, CardTitle } from '../util/components/Card';
import { Whiteboard } from '../util/components/Whiteboard';
import { FaMicrophone, FaVideo, FaPhoneSlash, FaDesktop } from 'react-icons/fa';

export function Component() {
  const { initRoom, roomId, isLoading } = useVideoRoom();
  const [joined, setJoined] = useState(false);

  const startMeeting = async () => {
    const id = await initRoom('Study Session', 'Data Structures prep', false);
    if (id) {
      setJoined(true);
    }
  };

  if (!joined) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-magenta-300/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-[100px] pointer-events-none" />

        <Card className="max-w-md w-full text-center p-8 space-y-6 shadow-xl border-white bg-white/80 backdrop-blur-md">
          <CardHeader className="justify-center block text-center">
            <CardTitle className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight mb-3">Video Lounge</CardTitle>
            <p className="text-slate-600 font-medium">Join a classroom or create a new study session</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <Button onClick={startMeeting} isLoading={isLoading} className="w-full py-4 text-lg shadow-blue-500/25">
                Create New Room
              </Button>
              <div className="relative border-b border-slate-200 py-3">
                <span className="absolute left-1/2 -ml-3 -mt-3.5 bg-white px-3 text-sm font-bold text-slate-400 rounded-full">or</span>
              </div>
              <input
                disabled
                placeholder="Enter Room Code (Mock)"
                className="w-full border border-slate-200 text-slate-500 font-medium rounded-xl p-4 text-center opacity-70 cursor-not-allowed outline-none"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col h-[90vh] min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Study Session</h2>
          <p className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full mt-2 inline-block">Room ID: {roomId}</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold w-full sm:w-auto">Invite Others</Button>
          <Button variant="danger" onClick={() => setJoined(false)} className="shadow-sm font-bold w-full sm:w-auto">
            <FaPhoneSlash /> Leave
          </Button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden h-full">
        {/* Left column: Video Feeds */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {/* Main User Feed */}
          <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm group">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80">
              <span className="text-slate-200 px-4 py-2 bg-black/60 rounded-lg text-sm font-bold shadow-lg backdrop-blur-sm">You (Placeholder)</span>
            </div>

            {/* Overlay controls for individual feed */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-white/90 backdrop-blur-md p-2 rounded-full px-4 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="text-slate-600 hover:text-blue-600 transition"><FaMicrophone size={16} /></button>
              <button className="text-slate-600 hover:text-blue-600 transition"><FaVideo size={16} /></button>
              <button className="text-slate-600 hover:text-blue-600 transition"><FaDesktop size={16} /></button>
            </div>
          </div>

          {/* Peer Feed */}
          <div className="relative flex-shrink-0 lg:aspect-video aspect-square bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 mt-auto md:mt-0 items-center justify-center flex hover:border-blue-300 transition-colors">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 bg-white shadow-sm rounded-full mx-auto mb-3 flex items-center justify-center text-slate-400 font-bold text-xl ring-4 ring-slate-50">
                  <span className="animate-pulse">P</span>
                </div>
                <span className="text-sm font-semibold text-slate-500">Waiting for peer...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Whiteboard / Screen Share */}
        <div className="lg:col-span-3 flex flex-col h-full bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden p-3 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-magenta-500 opacity-20 pointer-events-none z-10" />
          <div className="flex-1 h-full w-full relative z-0">
            <Whiteboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
