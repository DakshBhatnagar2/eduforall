'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled to true when scrolling past 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isHomePage && !isScrolled ? 'bg-transparent' : 'bg-black'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo/logo.png"
                  alt="TheEducationForAll Logo"
                  fill
                  sizes="40px"
                  className="rounded-full object-contain"
                  priority
                />
              </div>
              <span className="text-white text-xl font-bold">TheEducationForAll</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link href="/programs" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Programs
            </Link>
            <Link href="/impact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Our Impact
            </Link>
            <Link href="/gallery" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Gallery
            </Link>
            <Link
              href="/donate"
              className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md text-sm font-medium"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              About Us
            </Link>
            <Link href="/programs" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              Programs
            </Link>
            <Link href="/impact" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              Our Impact
            </Link>
            <Link href="/gallery" className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              Gallery
            </Link>
            <Link
              href="/donate"
              className="bg-white hover:bg-gray-100 text-black block px-4 py-2 rounded-md text-base font-medium"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 