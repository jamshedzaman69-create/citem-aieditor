import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookText, ArrowRight, Sparkles, Lock, Library, Plus, CreditCard, BookOpen, ChevronDown } from 'lucide-react';
import UserCounter from './UserCounter';
import PricingCard from './PricingCard';
import LanguageToggle from './LanguageToggle';

interface Props {
  onGetStarted: () => void;
  handleViewChange: (view: 'landing' | 'generate' | 'saved' | 'account') => void;
  setCurrentView: (view: 'landing' | 'generate' | 'saved' | 'account' | 'gettingStarted' | 'privacy' | 'terms') => void;
  setShowAuth: (show: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  user: any;
  handleSignOut?: () => void;
}

export default function LandingPage({ onGetStarted, handleViewChange, setCurrentView, setShowAuth, setIsSignUp, user, handleSignOut }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const handleLegalPageNavigation = (page: 'privacy' | 'terms') => {
    setCurrentView(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-lg sm:text-xl font-bold text-white truncate">CiteMe</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <LanguageToggle />
              {user ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    onClick={() => onGetStarted()}
                    className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">{t('nav.useCiteMe')}</span>
                    <span className="sm:hidden">CiteMe</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">{t('nav.signOut')}</span>
                    <span className="sm:hidden">{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      setShowAuth(true);
                      setIsSignUp(false);
                    }}
                    className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">{t('nav.logIn')}</span>
                    <span className="sm:hidden">{t('nav.login')}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      setShowAuth(true);
                      setIsSignUp(true);
                    }}
                    className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">{t('nav.signUp')}</span>
                    <span className="sm:hidden">{t('nav.signup')}</span>
                  </button>
                </>
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
                  onGetStarted();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-gray-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('nav.generateCitations')}
              </button>
              {user && (
                <>
                  <button
                    onClick={() => {
                      handleViewChange('saved');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-gray-700"
                  >
                    <Library className="h-4 w-4 mr-2" />
                    {t('nav.savedCitations')}
                  </button>
                  <button
                    onClick={() => {
                      handleViewChange('account');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 flex items-center text-gray-300 hover:bg-gray-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {t('nav.accountSettings')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-white">{t('landing.title')} </span>
              <span className="text-purple-500">CiteMe.</span>
            </h1>

            <h2 className="text-2xl md:text-3xl mb-4 text-white">
              {t('landing.subtitle')}
            </h2>

            <p className="text-xl md:text-2xl mb-8 text-purple-400">
              {t('landing.description')}
            </p>

            <div className="flex justify-center">
              <button
                onClick={user ? onGetStarted : () => {
                  setShowAuth(true);
                  setIsSignUp(true);
                }}
                className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors flex items-center"
              >
                {user ? t('landing.useCiteMe') : t('landing.getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Background gradient circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl" />
        </div>
      </div>

      {/* Features Section */}
      {/* Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{t('landing.seeInAction')}</h2>
          <p className="text-xl text-gray-400">{t('landing.seeInActionDesc')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-purple-900/20">
            <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '75%' }}>
              <img
                src="https://lkehnxijtgcicvfoxmpu.supabase.co/storage/v1/object/public/publicImages/Find%20a%20citation%20in%20seconds.gif"
                alt="Citation Generation Interface"
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{t('landing.smartGeneration')}</h3>
              <p className="text-gray-400">{t('landing.smartGenerationDesc')}</p>
            </div>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-purple-900/20">
            <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '75%' }}>
              <img
                src="https://lkehnxijtgcicvfoxmpu.supabase.co/storage/v1/object/public/publicImages/Format%20citations%20in%20a%20click.gif"
                alt="Citation Result Interface"
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{t('landing.instantResults')}</h3>
              <p className="text-gray-400">{t('landing.instantResultsDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-900/20 rounded-2xl">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">{t('landing.aiAccuracy')}</h3>
            <p className="text-gray-400">
              {t('landing.aiAccuracyDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-900/20 rounded-2xl">
                <Lock className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">{t('landing.multipleStyles')}</h3>
            <p className="text-gray-400">
              {t('landing.multipleStylesDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-900/20 rounded-2xl">
                <Library className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">{t('landing.saveOrganize')}</h3>
            <p className="text-gray-400">
              {t('landing.saveOrganizeDesc')}
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-900/20 rounded-2xl">
                <BookOpen className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">{t('landing.realStudies')}</h3>
            <p className="text-gray-400">
              {t('landing.realStudiesDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-200">
          {t('landing.whatStudentsSay')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
            <p className="text-lg text-gray-300 mb-6">
              "{t('reviews.sophie')}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Sophie M.</p>
                <p className="text-sm text-gray-400">Stanford University</p>
              </div>
              <div className="flex text-yellow-500">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
            <p className="text-lg text-gray-300 mb-6">
              "{t('reviews.alex')}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Alex J.</p>
                <p className="text-sm text-gray-400">University of Kent</p>
              </div>
              <div className="flex text-yellow-500">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
            <p className="text-lg text-gray-300 mb-6">
              "{t('reviews.liam')}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Liam R.</p>
                <p className="text-sm text-gray-400">University of Texas at Austin</p>
              </div>
              <div className="flex text-yellow-500">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-2xl border border-purple-900/20">
            <p className="text-lg text-gray-300 mb-6">
              "{t('reviews.emily')}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Emily T.</p>
                <p className="text-sm text-gray-400">University of Florida</p>
              </div>
              <div className="flex text-yellow-500">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{t('faq.title')}</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { question: t('faq.howToUse'), answer: t('faq.howToUseAnswer') },
            { question: t('faq.willTeachersKnow'), answer: t('faq.willTeachersKnowAnswer') },
            { question: t('faq.whyUse'), answer: t('faq.whyUseAnswer') },
            { question: t('faq.whatIfDontLike'), answer: t('faq.whatIfDontLikeAnswer') }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg border border-purple-900/20 overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-purple-400 transition-transform duration-200 ${
                    openFaqIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openFaqIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('landing.choosePlan')}</h2>
          <p className="text-xl text-gray-300">
            {t('landing.choosePlanDesc')}
          </p>
        </div>
        
        <div className="flex justify-center">
          <PricingCard 
            isPaywall={false}
            onAuthTrigger={user ? onGetStarted : () => {
              setShowAuth(true);
              setIsSignUp(true);
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-purple-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 CiteMe. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => {
                  handleLegalPageNavigation('privacy');
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => {
                  handleLegalPageNavigation('terms');
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}