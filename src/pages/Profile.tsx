import { useEffect, useState } from 'react';
import { supabase } from '../util/lib/supabase';
import { Card, CardBody, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/auth');
      }
    });
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!user) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading profile...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Your Profile
        </h1>
        <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 mx-auto overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-200 truncate">{user.email}</p>
              <p className="text-xs text-slate-500">Student</p>
            </div>
            
            <div className="pt-4 border-t border-slate-800 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Major:</span>
                <span className="text-slate-200">Computer Science</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Graduation:</span>
                <span className="text-slate-200">2026</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Past Classes (Nebula Labs API Mock)</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3">
              {[
                { id: 'CS 3345', name: 'Data Structures', term: 'Fall 2024' },
                { id: 'CS 2340', name: 'Computer Architecture', term: 'Spring 2024' },
                { id: 'CS 3341', name: 'Probability & Statistics', term: 'Fall 2023' }
              ].map(course => (
                <li key={course.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 flex justify-between items-center hover:bg-slate-800 transition">
                  <div>
                    <span className="font-semibold text-blue-400 mr-2">{course.id}</span>
                    <span className="text-slate-300">{course.name}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-slate-900 rounded-full text-slate-400">{course.term}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
