import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Last updated: 7th May 2025
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        <div className="bg-gray-800 rounded-lg p-8 border border-purple-900/20">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="mb-4">
                  CiteMe ("we", "us", "our") is owned and operated by Atrus Ltd, a company based in the United Kingdom. We value your privacy and are committed to protecting your personal information.
                </p>
                <p className="mb-4">
                  This Privacy Policy explains how we collect, use, store, and safeguard your information when you use the CiteMe web app ("Service").
                </p>
                <p>
                  By using the Service, you agree to the practices described in this Privacy Policy.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Information you provide to us</h3>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Account information: When you create an account, we collect your email address and login credentials.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Automatically collected information</h3>
                <p className="mb-2">We may collect limited technical information such as:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Basic usage logs</li>
                  <li>Device and browser information</li>
                  <li>App interaction statistics</li>
                </ul>
                <p>This information is used solely to operate, maintain, and improve the Service.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="mb-2">We use your information to:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Provide and maintain the Service</li>
                  <li>Manage your account</li>
                  <li>Process subscription payments</li>
                  <li>Improve functionality and user experience</li>
                  <li>Respond to support requests</li>
                </ul>
                <p>We do not sell your information to third parties.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">4. How Your Information Is Stored</h2>
                <p className="mb-4">
                  Your account information is stored in a secure third-party database provider. Access to this data is restricted exclusively to Atrus Ltd. No other party can access it.
                </p>
                <p>
                  Payment information (such as card details) is not stored by us. All payments are securely processed by Stripe, which handles and stores card data in accordance with its own privacy policies and PCI-compliant standards.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Sharing of Information</h2>
                <p className="mb-4">
                  We do not share any personally identifiable information with third parties.
                </p>
                <p className="mb-2">The only third parties involved in data processing are:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Stripe, solely for payment processing</li>
                  <li>Our secure hosting/database provider, solely for storing your account data</li>
                </ul>
                <p>These parties only process information as required to provide their respective services.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
                <p>
                  We take reasonable administrative, technical, and physical measures to protect your information. Despite this, no online service can guarantee absolute security.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
                <p className="mb-2">Depending on where you live (including the UK and EU), you may have rights regarding your personal data, including:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Access</li>
                  <li>Correction</li>
                  <li>Deletion</li>
                  <li>Restriction</li>
                  <li>Portability</li>
                </ul>
                <p>To exercise any rights, email us at [insert email].</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
                <p>
                  We retain your data only for as long as your account is active or as needed to provide the Service. You may request account deletion at any time.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
                <p>
                  CiteMe is not intended for individuals under 16. We do not knowingly collect data from children.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
                <p className="mb-2">If you have questions about this Privacy Policy, contact us at:</p>
                <p className="mb-1">Atrus Ltd</p>
                <p>Email: help@atrus.uk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}