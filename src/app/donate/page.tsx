'use client';

import { useState } from 'react';

const donationOptions = [
  { amount: 25, description: 'Provide school supplies for one child' },
  { amount: 50, description: 'Support a child\'s education for one month' },
  { amount: 100, description: 'Help establish a community learning center' },
  { amount: 250, description: 'Sponsor a child\'s education for one year' },
  { amount: 500, description: 'Support teacher training programs' },
  { amount: 1000, description: 'Help build a new school' },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleDonation = () => {
    // Here you would typically integrate with a payment processor
    alert('Thank you for your donation! This is a demo - in a real implementation, this would connect to a payment processor.');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Support Our Mission</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Make a Difference Through Education
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Your donation helps us provide quality education to children in need. Every contribution makes a difference.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {donationOptions.map((option) => (
              <div
                key={option.amount}
                className={`relative flex flex-col rounded-2xl border p-6 cursor-pointer ${
                  selectedAmount === option.amount
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-600'
                }`}
                onClick={() => setSelectedAmount(option.amount)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    ${option.amount}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or donate a custom amount</span>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="custom-amount" className="sr-only">
                Custom amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="custom-amount"
                  id="custom-amount"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleDonation}
              className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Donate Now
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Your donation is tax-deductible. TheEducationForAll is a registered 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 