import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import VideoChat from './pages/VideoChat';
import Forum from './pages/Forum';
import AIChat from './pages/AIChat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 font-sans text-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video" element={<VideoChat />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/chat" element={<AIChat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
