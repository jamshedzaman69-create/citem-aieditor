import React, { useState } from 'react';
import { BookText, Library, Plus, CreditCard, Rocket } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CitationForm from './components/CitationForm';
import SubscriptionModal from './components/SubscriptionModal';
import CitationResult from './components/CitationResult';
import AuthForm from './components/AuthForm';
import AccountSettings from './components/AccountSettings';
import GettingStarted from './components/GettingStarted';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { generateCitation } from './services/openai';
import { checkSubscriptionStatus } from './services/subscription';
import { cache } from './utils/cache';
import { supabase, saveCitation, getSavedCitations, deleteCitation, getUserProfile } from './services/supabase';
import type { Citation, CitationRequest, SubscriptionStatus, UserProfile } from './types';

type View = 'landing' | 'generate' | 'saved' | 'account' | 'gettingStarted' | 'privacy' | 'terms';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [citation, setCitation] = useState<Citation | null>(null);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [savedCitations, setSavedCitations] = useState<Citation[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [lastRequest, setLastRequest] = useState<CitationRequest | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [checkoutSessionId, setCheckoutSessionId] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  React.useEffect(() => {
    // Check for checkout session ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      setCheckoutSessionId(sessionId);
      setCurrentView('gettingStarted');
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkSubscriptionStatus(session.user.email || '')
          .then(status => {
            setSubscriptionStatus(status);
            if (status !== 'Active') {
              setShowSubscriptionModal(true);
            }
          });
        // Load user profile
        getUserProfile(session.user.id)
          .then(profile => setUserProfile(profile))
          .catch(error => console.error('Error loading user profile:', error));
        loadSavedCitations();
      } else {
        setSavedCitations([]);
        setUserProfile(null);
        if (currentView !== 'landing' && currentView !== 'privacy' && currentView !== 'terms') {
          setCurrentView('landing');
        }
      }
    });
  }, []);

  const handleViewChange = (view: View) => {
    if (!user && view !== 'landing' && view !== 'privacy' && view !== 'terms') {
      setShowAuth(true);
      setIsSignUp(true);
    } else {
      setCurrentView(view);
    }
  };

  const loadSavedCitations = async () => {
    try {
      const citations = await getSavedCitations();
      setSavedCitations(citations);
    } catch (error) {
      console.error('Error loading saved citations:', error);
    }
  };

  const handleSubmit = async (request: CitationRequest) => {
    if (!user?.email) return;
    
    const status = await checkSubscriptionStatus(user.email);
    setSubscriptionStatus(status);
    
    if (status !== 'Active') {
      setShowSubscriptionModal(true);
      return;
    }
    
    setIsLoading(true);
    try {
      setLastRequest(request);
      const result = await generateCitation(request);
      setCitation(result);
    } catch (error) {
      console.error('Error generating citation:', error);
      // TODO: Add error handling UI
    }
    setIsLoading(false);
  };

  const handleRegenerate = () => {
    if (citation && lastRequest) {
      handleSubmit(lastRequest);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (citation) {
      try {
        await saveCitation(citation);
        await loadSavedCitations();
      } catch (error) {
        console.error('Error saving citation:', error);
      }
    }
    setIsSaving(false);
  };

  const handleDelete = (index: number) => {
    const citation = savedCitations[index];
    if (citation.id) {
      deleteCitation(citation.id)
        .then(() => loadSavedCitations())
        .catch(error => console.error('Error deleting citation:', error));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSavedCitations([]);
    cache.clear(); // Clear cached subscription status on logout
  };

  return (
    <>
      {showSubscriptionModal && user?.email && subscriptionStatus && (
        <SubscriptionModal
          status={subscriptionStatus}
          email={user.email}
          onClose={() => setShowSubscriptionModal(false)}
        />
      )}
      {showAuth && !user ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <AuthForm
            onSuccess={() => setShowAuth(false)}
            defaultIsSignUp={isSignUp}
            setShowSubscriptionModal={setShowSubscriptionModal}
          />
        </div>
      ) : currentView === 'landing' ? (
        <LandingPage
          onGetStarted={() => handleViewChange('generate')}
          handleViewChange={handleViewChange}
          setCurrentView={setCurrentView}
          setShowAuth={setShowAuth}
          setIsSignUp={setIsSignUp}
          user={user}
          handleSignOut={handleSignOut}
        />
      ) : (
        <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-purple-900/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <span className="text-xl font-bold text-white">CiteMe</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  >
                    <span className="text-sm">{user.email}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setShowAuth(true);
                      setIsSignUp(false);
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setShowAuth(true);
                      setIsSignUp(true);
                    }}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-64 bg-gray-800 border-r border-purple-900/20 shadow-lg z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  handleViewChange('generate');
                  setIsMenuOpen(false);
                }}
                className={`w-full px-4 py-2 flex items-center ${
                  currentView === 'generate'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Generate Citations
              </button>
              <button
                onClick={() => {
                  handleViewChange('saved');
                  setIsMenuOpen(false);
                }}
                className={`w-full px-4 py-2 flex items-center ${
                  currentView === 'saved'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Library className="h-4 w-4 mr-2" />
                Saved Citations
              </button>
              {user && userProfile?.stripe_subscription_id && (
                <button
                  onClick={() => {
                    setCurrentView('gettingStarted');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 flex items-center ${
                    currentView === 'gettingStarted'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Getting Started
                </button>
              )}
              {user && subscriptionStatus && (
                <button
                  onClick={() => {
                    handleViewChange('account');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 flex items-center ${
                    currentView === 'account'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Account Settings
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {currentView === 'generate' ? (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Generate Citations
              </h1>
              <p className="mt-2 text-lg text-gray-400">
                Generate accurate citations for your academic work
              </p>
            </div>

            <div className="w-full max-w-3xl space-y-8">
              <CitationForm onSubmit={handleSubmit} isLoading={isLoading} />
              
              {citation && (
                <CitationResult
                  citation={citation}
                  onSave={handleSave}
                  onRegenerate={handleRegenerate}
                  isSaving={isSaving}
                />
              )}
            </div>
          </div>
        ) : currentView === 'saved' ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-3xl text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Saved Citations
                </h1>
                <p className="mt-2 text-lg text-gray-400">
                  Your library of saved citations
                </p>
              </div>

              {savedCitations.length === 0 ? (
                <div className="text-center text-gray-400 mt-12">
                  <Library className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                  <p>No saved citations yet</p>
                </div>
              ) : (
                <div className="w-full max-w-3xl space-y-6">
                  {savedCitations.map((citation, index) => (
                    <CitationResult
                      key={index}
                      citation={citation}
                      onDelete={() => handleDelete(index)}
                      showSaveButton={false}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : currentView === 'account' && user ? (
              <AccountSettings email={user.email} onSignOut={handleSignOut} />
          ) : currentView === 'gettingStarted' && (checkoutSessionId || userProfile?.stripe_subscription_id) ? (
              <GettingStarted
                checkoutSessionId={checkoutSessionId}
                userProfile={userProfile}
                userId={user?.id}
                onUseNow={() => setCurrentView('generate')}
              />
          ) : currentView === 'privacy' ? (
              <PrivacyPolicy onBack={() => setCurrentView('landing')} />
          ) : currentView === 'terms' ? (
              <TermsOfService onBack={() => setCurrentView('landing')} />
          ) : null}
      </main>
      </div>
      )}
    </>
  );
}

export default App;