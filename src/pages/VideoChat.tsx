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
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 space-y-6">
          <CardHeader className="justify-center block text-center">
            <CardTitle className="text-3xl text-blue-400 mb-2">Video Lounge</CardTitle>
            <p className="text-slate-400">Join a class room or create a new study session</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Button onClick={startMeeting} isLoading={isLoading} className="w-full py-3 text-lg">
                Create New Room
              </Button>
              <div className="relative border-b border-slate-700 py-2">
                <span className="absolute left-1/2 -ml-3 -mt-3 bg-slate-900 px-2 text-slate-500">or</span>
              </div>
              <input
                disabled
                placeholder="Enter Room Code (Mock)"
                className="w-full bg-slate-800 border-slate-700 text-slate-100 rounded-lg p-3 text-center opacity-50 cursor-not-allowed"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col h-[90vh]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Study Session</h2>
          <p className="text-sm text-slate-400">Room ID: {roomId}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-green-400 hover:text-green-300">Invite Others</Button>
          <Button variant="danger" onClick={() => setJoined(false)}>
            <FaPhoneSlash /> Leave
          </Button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden h-full">
        {/* Left column: Video Feeds */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {/* Main User Feed */}
          <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-md">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-700/50">
              <span className="text-slate-400 px-4 py-2 bg-black/40 rounded">You (Placeholder)</span>
            </div>
            
            {/* Overlay controls for individual feed */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full px-3">
              <button className="text-white hover:text-blue-400 transition"><FaMicrophone size={14}/></button>
              <button className="text-white hover:text-blue-400 transition"><FaVideo size={14}/></button>
              <button className="text-white hover:text-blue-400 transition"><FaDesktop size={14}/></button>
            </div>
          </div>

          {/* Peer Feed */}
          <div className="relative flex-shrink-0 lg:aspect-video aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700 mt-auto md:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto mb-2 flex items-center justify-center text-slate-400">P</div>
                <span className="text-xs text-slate-400">Waiting for peer...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Whiteboard / Screen Share */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-2">
          <div className="flex-1 h-full w-full">
            <Whiteboard />
          </div>
        </div>
      </div>
    </div>
  );
}
