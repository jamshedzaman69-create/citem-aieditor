import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, RefreshCw } from 'lucide-react';
import { supabase } from '../services/supabase';
import { checkSubscriptionStatus } from '../services/subscription';

interface Props {
  onSuccess: () => void;
  defaultIsSignUp?: boolean;
  setShowSubscriptionModal: (show: boolean) => void;
}

export default function AuthForm({ onSuccess, defaultIsSignUp = false, setShowSubscriptionModal }: Props) {
  const [isSignUp, setIsSignUp] = useState(defaultIsSignUp);
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          const status = await checkSubscriptionStatus(data.user.email || '');
          if (status !== 'Active') {
            setShowSubscriptionModal(true);
          }
        }
        onSuccess();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          const status = await checkSubscriptionStatus(data.user.email || '');
          if (status !== 'Active') {
            setShowSubscriptionModal(true);
          }
        }
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg border border-purple-900/20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p className="mt-2 text-gray-400">
          {isSignUp
            ? 'Sign up and complete payment to get instant citations, automatically formatted and ready to use'
            : 'Sign in to get new citations and access your citation library'}
        </p>
      </div>

      {!showResetPassword ? (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your password"
            />
            <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-900/10 p-3 rounded-md border border-red-900/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isSignUp ? (
            <>
              <UserPlus className="h-5 w-5 mr-2" />
              Sign Up
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </>
          )}
        </button>

        {isSignUp && (
          <p className="text-yellow-500 text-sm bg-yellow-900/10 p-3 rounded-md border border-yellow-900/20">
            Existing Chrome Extension User? Create an account with the SAME EMAIL you used to sign up to the chrome extension, and your membership will be added here. You'll also be able to access and manage your subscription here.
          </p>
        )}

        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={() => setShowResetPassword(true)}
            className="text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or</span>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
          {!resetSent ? (
            <>
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input
                    id="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/10 p-3 rounded-md border border-red-900/20">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </>
          ) : (
            <div className="text-center text-green-400 bg-green-900/10 p-4 rounded-md border border-green-900/20">
              Check your email for password reset instructions.
            </div>
          )}

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowResetPassword(false);
                setResetSent(false);
                setResetEmail('');
                setError('');
              }}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Back to {isSignUp ? 'sign up' : 'sign in'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}