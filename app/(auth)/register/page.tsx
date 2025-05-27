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
           <h2 className="text-4xl font-bold text-center text-[#2F5318] ">
            Register as a Realtor
            </h2>
          </div>
          
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
           With ₦50,000 one-time payment or upload proof of offline payment, Earn with every sale. Join our growing network
          and access exclusive plots, marketing tools, and commissions.
          </p>
          
          <RegisterForm />
        </div>
      </main>

    
    </div>
  );
};

export default Home;