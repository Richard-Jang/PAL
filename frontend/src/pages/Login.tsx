import React, { useState } from 'react';
import { supabase } from '../util/lib/supabase';
import { Button } from '../util/components/Button';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '../util/components/Card';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

function LoginForm({ onSwitchMode }: { onSwitchMode: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) throw error;
      navigate('/profile');
    } catch (error: any) {
      setErrorMsg(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardBody className="space-y-4">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm shadow-sm">
            {errorMsg}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-slate-300'} text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm`}
            placeholder="you@example.com"
          />
          {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-slate-300'} text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm`}
            placeholder="••••••••"
          />
          {errors.password && <span className="text-xs text-red-500 font-medium">{errors.password.message}</span>}
        </div>
      </CardBody>
      <CardFooter className="flex-col gap-3">
        <Button type="submit" className="w-full" isLoading={loading}>
          Sign In
        </Button>
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-sm text-slate-500 hover:text-purple-600 transition font-medium"
        >
          Need an account? Sign up
        </button>
      </CardFooter>
    </form>
  );
}

function SignUpForm({ onSwitchMode }: { onSwitchMode: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signUp({ email: data.email, password: data.password });
      if (error) throw error;
      alert('Check your email for the login link!');
      reset();
    } catch (error: any) {
      setErrorMsg(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Create an Account
        </CardTitle>
      </CardHeader>
      <CardBody className="space-y-4">
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm shadow-sm">
            {errorMsg}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-slate-300'} text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm`}
            placeholder="you@example.com"
          />
          {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-slate-300'} text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm`}
            placeholder="••••••••"
          />
          {errors.password && <span className="text-xs text-red-500 font-medium">{errors.password.message}</span>}
        </div>
      </CardBody>
      <CardFooter className="flex-col gap-3">
        <Button type="submit" className="w-full" isLoading={loading}>
          Sign Up
        </Button>
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-sm text-slate-500 hover:text-purple-600 transition font-medium"
        >
          Already have an account? Sign in
        </button>
      </CardFooter>
    </form>
  );
}

export function Component() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-fuchsia-300/20 blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90">
        {isLogin ? (
          <LoginForm onSwitchMode={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onSwitchMode={() => setIsLogin(true)} />
        )}
      </Card>
    </div>
  );
}

export default Component;
