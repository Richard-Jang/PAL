import { Card, CardBody, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { supabase } from '../util/lib/supabase';

export function Component() {
  const { 
    username, 
    school, 
    graduationYear, 
    classes, 
    isLoading 
  } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (isLoading) return <div className="p-8 text-center text-purple-600 animate-pulse font-medium min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 min-h-[90vh] bg-slate-50/50">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-purple-100">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 tracking-tight">
          Your Profile
        </h1>
        <Button variant="ghost" onClick={handleSignOut} className="text-red-500 hover:text-red-700 hover:bg-red-50 font-bold">Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-purple-100 shadow-xl shadow-purple-900/5 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-800">About You</CardTitle>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full bg-slate-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden ring-4 ring-purple-100 mb-4 transition-transform hover:scale-105 duration-300">
                <FaUserCircle className="w-full h-full text-slate-300" />
              </div>
              <div className="text-center w-full px-2">
                <h2 className="text-2xl font-black text-slate-800 truncate">{username || "No Username"}</h2>
                <p className="text-slate-500 font-medium truncate">{user?.email}</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100">
                  Student
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 text-sm space-y-4 font-medium">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1 font-black">School</span>
                <span className="text-slate-800 font-bold leading-tight block">{school || "No school specified"}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1 font-black">Graduation Year</span>
                <span className="text-slate-800 font-bold">{graduationYear || "N/A"}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2 border-blue-100 shadow-xl shadow-blue-900/5 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              📚 My Classes
            </CardTitle>
          </CardHeader>
          <CardBody>
            {classes && classes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {classes.map((cls, index) => (
                  <div key={index} className="p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center hover:shadow-lg hover:border-blue-200 transition-all group cursor-default">
                    <span className="text-blue-600 font-black text-xl mb-1 group-hover:scale-105 transition-transform origin-left">{cls}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Current Class</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No classes added yet.</p>
                <Button variant="ghost" className="mt-2 text-blue-600 text-sm font-bold" onClick={() => navigate('/forum')}>Explore Forum</Button>
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-slate-100">
               <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 justify-center italic">
                 Academic records managed via PAL profile service
               </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Component;
