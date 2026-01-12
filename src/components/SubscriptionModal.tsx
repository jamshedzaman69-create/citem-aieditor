import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import PricingCard from './PricingCard';
import type { SubscriptionStatus } from '../services/subscription';

interface Props {
  status: SubscriptionStatus;
  email: string;
  onClose: () => void;
}

export default function SubscriptionModal({ status, email, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="flex items-start justify-center p-4 pt-20 pb-8 min-h-full">
        <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative border border-purple-900/20">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white z-10 bg-gray-700/50 rounded-full p-1 hover:bg-gray-600/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {status === 'Past Due/Overdue' ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-4 pr-8">{t('subscription.failedPayment')}</h2>
              <p className="text-gray-300 mb-6">
                {t('subscription.failedPaymentDesc')}
              </p>
              <a
                href="https://billing.stripe.com/p/login/aEU5mD3ew2Ugaha9AA"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 text-white rounded-lg px-4 py-2 text-center font-medium hover:bg-purple-700 transition-colors"
              >
                {t('subscription.manageBilling')}
              </a>
            </>
          ) : (
            <>
              <div className="text-center mb-6 pr-8">
                <h2 className="text-2xl font-bold text-white mb-2">{t('subscription.welcomeToCiteMe')}</h2>
                <p className="text-gray-300">
                  {t('subscription.welcomeDesc')}
                </p>
              </div>
              <PricingCard email={email} isPaywall={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}