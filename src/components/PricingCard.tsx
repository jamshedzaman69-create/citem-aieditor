import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

interface Props {
  email?: string;
  isPaywall?: boolean;
  onAuthTrigger?: () => void;
}

export default function PricingCard({ email = '', isPaywall = false, onAuthTrigger }: Props) {
  const { t } = useTranslation();
  const [isMonthly, setIsMonthly] = useState(true);

  const weeklyPrice = 2.49;
  const monthlyPrice = 7.99;
  
  const weeklyStripeUrl = 'https://buy.stripe.com/bJe7sMdk0gdQ5m4d83fAc04';
  const monthlyStripeUrl = 'https://buy.stripe.com/3cIeVe6VC3r45m46JFfAc03';

  const currentPrice = isMonthly ? monthlyPrice : weeklyPrice;
  const billingPeriod = isMonthly ? 'month' : 'week';
  const currentStripeUrl = isMonthly ? monthlyStripeUrl : weeklyStripeUrl;
  const encodedEmail = encodeURIComponent(email);
  const paymentUrl = email ? `${currentStripeUrl}?prefilled_email=${encodedEmail}` : currentStripeUrl;

  const features = [
    t('pricing.rapidFinder'),
    t('pricing.autoFormatted'),
    t('pricing.undetectable'),
    t('pricing.nuancedRequests'),
    t('pricing.accessAnywhere'),
    t('pricing.saveHours')
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-800 p-1 rounded-lg border border-gray-700">
          <div className="flex">
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isMonthly
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('pricing.weekly')}
            </button>
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isMonthly
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('pricing.monthly')}
              <span className="absolute -top-3 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {t('pricing.save')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl" />
        
        <div className="relative z-10">
          {/* Best Value Badge */}
          {isMonthly && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {t('pricing.bestValue')}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="text-center mb-8 mt-4">
            <div className="flex items-baseline justify-center">
              <span className="text-5xl font-bold text-white transition-all duration-300">
                ${currentPrice}
              </span>
              <span className="text-xl text-gray-400 ml-2">
                /{billingPeriod}
              </span>
            </div>
            {isMonthly && (
              <p className="text-green-400 text-sm mt-2 font-medium">
                {t('pricing.saveVsWeekly')}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            {isPaywall ? (
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Subscribe
              </a>
            ) : (
              <button
                onClick={onAuthTrigger}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('pricing.getStarted')}
              </button>
            )}
            <p className="text-gray-400 text-sm mt-3 mb-4">{t('pricing.securePayment')}</p>
          </div>

          {/* Terms */}
          <p className="text-center text-gray-300 text-sm font-medium">
            {t('pricing.cancelAnytime')}
          </p>
          </div>
      </div>
    </div>
  );
}