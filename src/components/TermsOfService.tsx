import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: Props) {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Last updated: 6th May 2025
        </p>
      </div>

      <div className="w-full max-w-4xl space-y-8">
        <div className="bg-gray-800 rounded-lg p-8 border border-purple-900/20">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                  By accessing or using CiteMe ("Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
                </p>
                <p>
                  The Service is owned and operated by Atrus Ltd, a company based in the United Kingdom.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Use of the Service</h2>
                <p className="mb-2">You agree to:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Use the Service for lawful purposes only</li>
                  <li>Not attempt to access or interfere with the Service's systems, data, or security</li>
                  <li>Not reverse-engineer, copy, or resell the Service or any part of it</li>
                  <li>Not misuse the Service in any way that could damage its performance or availability</li>
                </ul>
                <p>We may suspend or terminate your access if you violate these terms.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Accounts</h2>
                <p className="mb-2">You are responsible for:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Maintaining the confidentiality of your login credentials</li>
                  <li>Any activity that occurs under your account</li>
                </ul>
                <p>You must notify us immediately if you believe your account is compromised.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Subscriptions & Payments</h2>
                <p className="mb-2">CiteMe operates on a monthly rolling subscription basis.</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Subscriptions renew automatically each month.</li>
                  <li>You may cancel at any time, and your access will continue until the end of the current billing period.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Payment processing</h3>
                <p>All payments are handled securely by Stripe, which manages and stores card information. We do not store your card details.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Money-Back Guarantee</h2>
                <p className="mb-2">You are entitled to a 100% money-back guarantee on your first subscription payment only if:</p>
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  <li>You cancel your subscription within the first month, and</li>
                  <li>You email us to request the refund.</li>
                </ol>
                <p className="mb-4">We will refund your first payment, no questions asked.</p>
                <p>This guarantee does not apply to any subsequent payments.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                <p className="mb-4">
                  All content, features, software, and functionality of CiteMe are the property of Atrus Ltd and are protected by applicable copyright and intellectual property laws.
                </p>
                <p>
                  You are granted a limited, revocable, non-exclusive licence to use the Service for personal or business use in compliance with these terms.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Services</h2>
                <p className="mb-2">The Service uses:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Stripe for payment processing</li>
                  <li>A secure third-party database provider for hosting account data</li>
                </ul>
                <p>Your use of these services may be subject to their respective terms and policies.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Service Availability</h2>
                <p className="mb-4">
                  We strive to keep the Service available but do not guarantee uninterrupted access. We may update, pause, or discontinue parts of the Service at any time.
                </p>
                <p>We are not liable for any downtime, data loss, or disruptions.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                <p className="mb-2">To the fullest extent permitted by law, Atrus Ltd is not liable for:</p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Loss of profits</li>
                  <li>Business interruption</li>
                  <li>Loss of data</li>
                  <li>Damages arising from your use or inability to use the Service</li>
                </ul>
                <p>Your use of CiteMe is at your own risk.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Termination</h2>
                <p>
                  We may suspend or terminate access to your account at our discretion for violations of these Terms. You may terminate your subscription at any time by cancelling via your account settings.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
                <p className="mb-2">These Terms are governed by the laws of England and Wales.</p>
                <p>Any disputes shall be resolved exclusively in the courts of England and Wales.</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                <p className="mb-2">If you have any questions about these Terms, contact us at:</p>
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