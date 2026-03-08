import { useEffect, useState } from 'react';
import { supabase } from '../util/lib/supabase';
import { Card, CardBody, CardHeader, CardTitle } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useNavigate } from 'react-router-dom';

export function Component() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return <div className="p-8 text-center text-purple-600 animate-pulse font-medium min-h-screen">Loading profile...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 min-h-[90vh]">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-purple-100">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-fuchsia-600 tracking-tight">
          Your Profile
        </h1>
        <Button variant="ghost" onClick={handleSignOut} className="text-red-500 hover:text-red-700 hover:bg-red-50">Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-1 border-purple-100 shadow-purple-900/5">
          <CardHeader>
            <CardTitle>About You</CardTitle>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="relative w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg mx-auto overflow-hidden ring-4 ring-purple-100">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800 truncate">{user.email}</p>
              <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">Student</p>
            </div>

            <div className="pt-6 border-t border-slate-100 text-sm space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg">
                <span className="font-semibold text-slate-600">Major</span>
                <span className="text-slate-800 font-bold">Computer Science</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50/50 rounded-lg">
                <span className="font-semibold text-slate-600">Graduation</span>
                <span className="text-slate-800 font-bold">2026</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="xl:col-span-2 border-blue-100 shadow-blue-900/5">
          <CardHeader>
            <CardTitle>Academic History</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-slate-500 mb-6 font-medium">Past classes retrieved from Nebula Labs API</p>
            <ul className="space-y-4">
              {[
                { id: 'CS 3345', name: 'Data Structures', term: 'Fall 2024', color: 'blue' },
                { id: 'CS 2340', name: 'Computer Architecture', term: 'Spring 2024', color: 'purple' },
                { id: 'CS 3341', name: 'Probability & Statistics', term: 'Fall 2023', color: 'fuchsia' }
              ].map(course => (
                <li key={course.id} className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow group cursor-pointer hover:border-purple-200">
                  <div className="flex flex-col">
                    <span className={`font-black text-${course.color}-600 text-lg mb-1 group-hover:text-${course.color}-700 transition-colors`}>{course.id}</span>
                    <span className="text-slate-600 font-medium">{course.name}</span>
                  </div>
                  <span className="text-xs px-3 py-1 font-bold bg-slate-100 text-slate-600 rounded-full shadow-inner">{course.term}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Component;
