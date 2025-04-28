'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2F5318] px-[] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 sm:text-center gap-8 md:text-start text-center">
        {/* Left Section */}
        <div>
          <div className='flex md:justify-start justify-center'>
          <Image src="/img/logo.png" alt="Logo" width={80} height={80} />

          </div>
          <p className="mt-2 text-sm">...Land Banking is a Must</p>
          <p className="mt-4 text-sm">
            <span className="font-bold">Head Office:</span> Suit F17 Garbs Mega Plaza<br/>
            39 Awka Road Onitsha, Anambra State
          </p>
          <p className="mt-2 text-sm">info@pineleafestates.com</p>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Our Newsletter</h3>
          <p className="text-sm mb-4">Your Gateway to a World of Real Estate: Explore, Engage, and Empower with our Exclusive Newsletter Subscription!</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 flex-1 rounded-l-md text-black"
            />
            <button className="bg-white text-green-900 font-bold px-4 rounded-r-md">
              Subscribe
            </button>
          </div>

          <h3 className="text-lg font-bold mt-6 mb-2">Follow Us</h3>
          <div className="flex gap-4 md:justify-start justify-center">
            <Link href="#" className="text-white">
              <Image src="/img/facebook.svg.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="#" className="text-white">
              <Image src="/img/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="#" className="text-white">
              <Image src="/img/whatsapp.png" alt="WhatsApp" width={24} height={24} />
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm ">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/properties">Properties</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white mt-10 pt-6 flex justify-between text-xs">
        <p>Pineleafestate©2025 All rights Reserved</p>
        <Link href="/privacy-policy" className="font-bold">Privacy Policy</Link>
      </div>
    </footer>
  );
}
