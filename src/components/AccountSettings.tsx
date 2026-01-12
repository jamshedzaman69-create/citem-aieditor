import React from 'react';
import { CreditCard, LogOut } from 'lucide-react';

interface Props {
  email: string;
  onSignOut: () => void;
}

export default function AccountSettings({ email, onSignOut }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Account Settings
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Manage your subscription and account details
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-900/20">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-white">Email</h2>
                <p className="text-gray-400">{email}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 my-4" />

            <div>
              <h2 className="text-lg font-medium text-white mb-4">Subscription Management</h2>
              <div className="bg-gray-900/50 p-4 rounded-lg mb-6 text-gray-300 space-y-3">
                <p>
                  To manage your subscription, you'll be redirected to our secure payment partner, Stripe.
                </p>
                <p>
                  <strong className="text-purple-400">Important:</strong> Use the same email address you signed up with ({email}) to access your billing portal.
                </p>
                <p>From there, you can:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Update your payment information</li>
                  <li>View billing history</li>
                  <li>Cancel your subscription</li>
                </ul>
              </div>
              <a
                href="https://billing.stripe.com/p/login/aEU5mD3ew2Ugaha9AA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full text-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Manage Subscription
              </a>
            </div>

            <div className="border-t border-gray-700 my-4" />

            <div className="flex flex-col items-center space-y-2">
              <p className="text-gray-400">Need assistance with your account?</p>
              <a
                href="mailto:help@abundant.agency?subject=CiteMe%20Help"
                className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Contact Support
              </a>
            </div>

            <div className="border-t border-gray-700 my-4" />

            <button
              onClick={onSignOut}
              className="flex items-center justify-center px-4 py-2 bg-red-600/10 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}