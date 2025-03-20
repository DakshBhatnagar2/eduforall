'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AcademicCapIcon, UserGroupIcon, GlobeAltIcon, HeartIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Quality Education',
    description: 'Providing access to high-quality education for underprivileged children worldwide.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Community Support',
    description: 'Building strong community networks to support educational initiatives.',
    icon: UserGroupIcon,
  },
  {
    name: 'Global Reach',
    description: 'Extending our impact across borders to reach children in need.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Volunteer Programs',
    description: 'Engaging volunteers to make a difference in children\'s lives.',
    icon: HeartIcon,
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          src="/images/hero/hero.jpg"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Empowering Education Worldwide
            </h1>
            <p className="mt-6 text-xl text-gray-100">
              Join us in our mission to provide quality education to every child, regardless of their circumstances.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Donate Now
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent hover:bg-white/10 border-2 border-white rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-24 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              We believe that education is the key to breaking the cycle of poverty and creating a better future.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="bg-blue-800 rounded-lg p-6 h-full">
                  <feature.icon className="h-12 w-12 text-blue-300" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-medium text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-blue-100">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 sm:text-4xl">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;re dedicated to making a difference in children&apos;s lives through education.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">10,000+</div>
              <div className="mt-2 text-lg text-gray-600">Children Educated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">50+</div>
              <div className="mt-2 text-lg text-gray-600">Communities Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900">95%</div>
              <div className="mt-2 text-lg text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-blue-200">Join our mission today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
