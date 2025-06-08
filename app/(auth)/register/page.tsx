import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm'
import { LiaArrowLeftSolid } from 'react-icons/lia';


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
      <div className="relative">
        <div className="w-full h-[320px] relative">
          <Image
            src="/img/pine-1.png"
            alt="Pineleaf team"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white\ bg-opacity-30">
            <h1 className="text-4xl font-bold mb-6 large-header !text-white">Get Started with Pineleaf</h1>
             <div className="flex justify-center items-center gap-[14px]">
              <Link href="/" className="hover:underline para-3 text-white">Home
              </Link>

              <LiaArrowLeftSolid strokeWidth={1.5} size={24} className='text-white' />
              
              <Link href="/register" className="hover:underline para-3 text-[#FBBF00] !font-[700]">Register
              </Link>
               <LiaArrowLeftSolid strokeWidth={1.5} size={24} className='text-white' />

              <Link href="/login" className="hover:underline para-3 text-white">Login
              </Link>
            </div>
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