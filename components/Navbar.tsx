'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4  absolute right-0 left-0 md:px-29 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/img/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center">
        <Link href="/" className="text-green-900 font-bold hover:underline">
          Home
        </Link>
      </div>

      {/* Register/Login */}
      <div className="flex items-center gap-2 bg-[#000000CC]">
        <Link href="/login" className="text-white font-medium">
          Register/Login
        </Link>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10.97 10.97 0 0112 15c2.485 0 4.779.815 6.879 2.17M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </nav>
  );
}
