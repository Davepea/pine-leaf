'use client';

import Link from 'next/link';
import Image from 'next/image';
import NewsletterSubscription from '@/components/NewsLetter';

export default function Footer() {
  return (
    <footer className="bg-[#2F5318] px-[] text-white px-[6.2vw]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 sm:text-center gap-8 md:text-start text-center">
        {/* Left Section */}
        <div className=' md:col-span-2 '>
          <div className='flex md:justify-start justify-center'>
          <Image src="/img/logo.png" alt="Logo" width={185} height={185} />

          </div>
          <p className="mt-2 text-sm pb-[40px]">...Land Banking is a Must</p>
          <div className='md:max-w-[244px] pb-[20px] md:text-start text-center'>
            <p className=" text-sm">
            <span className="font-bold text-[#A5D6A7]">Head Office:</span> Suit F17 Garbs Mega Plaza <br/>
            39 Awka Road Onitsha, Anambra State
          </p>
          </div>
          <p className="mt-2 text-sm text-[#A5D6A7]">info@pineleafestates.com</p>
        </div>

        <div className=' md:col-span-3 pt-16'>
          <div className='max-w-[450px]'>
            <NewsletterSubscription/>
          <h3 className="text-lg font-bold mt-8 mb-2">Follow Us</h3>
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
        </div>

        {/* Right Section */}
        <div className=' md:col-span-1 pt-16'>
          <h3 className="text-lg font-bold mb-5">Quick Links</h3>
          <ul className="flex md:flex-col flex-row md:justify-start justify-center gap-[12px] text-sm font-roboto font-light ">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/service">Services</Link></li>
            <li><Link href="/property">Properties</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#FFFFFF33] mt-10 py-10 grid md:grid-cols-3 grid-cols-1 text-center">
        <div className=' col-span-2 flex md:justify-between md:flex-row flex-col items-center justify-center md:order-1 order-2'>
          <p>Pineleafestate©2025 All rights Reserved</p>
        <Link href="https://sunmence.com.ng/">
          <p>Built by sunmence</p>
        </Link>
        </div>
        <Link href="/privacy-policy" className="font-bold md:order-2 order-1 md:text-end text-center">Privacy Policy</Link>
      </div>
    </footer>
  );
}
