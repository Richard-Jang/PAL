import React, { useState } from 'react';
import { supabase } from '../util/lib/supabase';
import { Button } from '../util/components/Button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../util/components/Card';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/profile');
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the login link!');
      }
    } catch (error: any) {
      setErrorMsg(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleAuth}>
          <CardHeader>
            <CardTitle>{isLogin ? 'Welcome Back' : 'Create an Account'}</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded p-3 text-sm rounded-lg">
                {errorMsg}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 text-slate-100 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border-slate-700 text-slate-100 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </CardBody>
          <CardFooter className="flex-col gap-3">
            <Button type="submit" className="w-full" isLoading={loading}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-white transition"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
