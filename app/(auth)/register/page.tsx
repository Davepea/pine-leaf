import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm'


const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Get Started with Pineleaf</title>
        <meta name="description" content="Register as a Realtor or Investor with Pineleaf" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <div className="relative bg-pineleaf-green text-white">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/img/pine-1.png" 
              alt="Pineleaf background" 
              layout="fill"
              objectFit="cover"
            
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Get Started with Pineleaf</h1>
            <p className="text-xl mb-8">Choose how you&apos;d like to join us</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/" className="hover:underline">Home
              </Link>
              <span>→</span>
              <Link href="/register" className="hover:underline">Register
              </Link>
              <span>→</span>
              <Link href="/login" className="hover:underline">Login
              </Link>
            </div>
          </div>
        </div>

        {/* Registration Options and Form */}
        <div className="container mx-auto px-4 py-12 pb-[100px]">
          <div className="flex flex-col md:flex-row justify-center mb-8">
            <a href="#" className="text-xl md:text-2xl px-6 py-2 text-gray-500 hover:text-gray-700 border-b-2 border-transparent text-center">
              Register as a Realtor
            </a>
            <a href="#" className="text-xl md:text-2xl px-6 py-2 text-pineleaf-green border-b-2 border-pineleaf-green text-center">
              Register as an Investor
            </a>
          </div>
          
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            free – for those interested in investing or buying property. Gain access to high-potential lands across South-South & South-East Nigeria. 
            We&apos;ll guide you every step of the way.
          </p>
          
          <RegisterForm />
        </div>
      </main>

    
    </div>
  );
};

export default Home;