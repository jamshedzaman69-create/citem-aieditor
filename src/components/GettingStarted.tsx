import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Chrome, Copy, Check, ExternalLink, Loader2, Wrench, Key } from 'lucide-react';
import { getSubscriptionIdFromCheckoutSession } from '../services/subscription';
import { updateUserProfileSubscriptionId } from '../services/supabase';
import type { UserProfile } from '../types';

interface Props {
  checkoutSessionId?: string;
  userProfile?: UserProfile | null;
  userId?: string;
  onUseNow: () => void;
}

export default function GettingStarted({ checkoutSessionId, userProfile, userId, onUseNow }: Props) {
  const { t } = useTranslation();
  const [subscriptionId, setSubscriptionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If we have a stored subscription ID from the user profile, use it
    if (userProfile?.stripe_subscription_id && !checkoutSessionId) {
      setSubscriptionId(userProfile.stripe_subscription_id);
      setIsLoading(false);
      return;
    }

    // If we have a checkout session ID, fetch the subscription ID from Stripe
    const fetchSubscriptionId = async () => {
      try {
        setIsLoading(true);
        const id = await getSubscriptionIdFromCheckoutSession(checkoutSessionId);
        setSubscriptionId(id);
        
        // Save the subscription ID to the user's profile if we have a userId
        if (userId && id) {
          await updateUserProfileSubscriptionId(userId, id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to retrieve subscription ID');
      } finally {
        setIsLoading(false);
      }
    };

    if (checkoutSessionId) {
      fetchSubscriptionId();
    }
  }, [checkoutSessionId, userProfile, userId]);

  const handleCopyActivationCode = async () => {
    try {
      await navigator.clipboard.writeText(subscriptionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy activation code:', err);
    }
  };

  const chromeExtensionUrl = 'https://chromewebstore.google.com/detail/ophgoenijfmjlbajpfcojbdbplaoocek?utm_source=item-share-cb';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Welcome to </span>
            <span className="text-purple-500">CiteMe!</span>
          </h1>
          
          {subscriptionId && (
            <div className="mb-8">
              <p className="text-lg text-gray-300 mb-4">Your activation code is:</p>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/30 inline-block">
                <code className="text-yellow-400 text-xl font-mono">{subscriptionId}</code>
              </div>
            </div>
          )}
          
          <p className="text-xl text-gray-300 mb-8">
            Your subscription is now active. Choose how you'd like to get started:
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
            <p className="text-gray-400">Setting up your account...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={onUseNow}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Continue to App
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Option 1: Use Web App */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20 hover:border-purple-500/40 transition-all duration-300 group">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-900/20 rounded-2xl group-hover:bg-purple-900/30 transition-colors">
                    <ArrowRight className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Use Web App</h3>
                <p className="text-gray-300 mb-8">
                  Start generating citations right now in your browser. Perfect for quick citations and managing your library.
                </p>
                <button
                  onClick={onUseNow}
                  className="w-full bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center group"
                >
                  Start Using CiteMe
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Option 2: Chrome Extension */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20 hover:border-purple-500/40 transition-all duration-300 group">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-900/20 rounded-2xl group-hover:bg-purple-900/30 transition-colors">
                    <Chrome className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Chrome Extension</h3>
                <p className="text-gray-300 mb-6">
                  Get citations while browsing any website. Perfect for research and seamless integration with your workflow.
                </p>
                <a
                  href={chromeExtensionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Download Chrome Extension
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Install & Activate Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Install & Activate</h2>
            <p className="text-lg text-gray-400">
              If your activation code isn't at the top of this page, check your email.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Install */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-900/20 rounded-xl mr-4">
                  <Wrench className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">First, Install The Extension</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Simply click below, to install CiteMe, then make sure to pin it to your menu bar.
              </p>
              <a
                href={chromeExtensionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group text-lg"
              >
                Install CiteMe on Chrome
              </a>
            </div>

            {/* Step 2: Activate */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-900/20 rounded-xl mr-4">
                  <Key className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Then, Activate It</h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Once installed, just copy and paste your activation code into the extension and click Activate.
              </p>
              
              {subscriptionId && (
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={subscriptionId}
                      readOnly
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm"
                    />
                    <button
                      onClick={handleCopyActivationCode}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        copied
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}