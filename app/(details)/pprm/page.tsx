import StatsMarquee from '@/components/PprmMarque';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaTree, FaChartLine, FaWallet, FaCheck, FaHandshake } from 'react-icons/fa';
import { GoArrowLeft } from "react-icons/go";


const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Pineleaf Realtor Reward Mechanism (PRRM)</title>
        <meta name="description" content="A structured system designed to empower realtors, recognize leadership, and create wealth through both active and passive income opportunities." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
      <div className="relative h-96">
        <div className="absolute inset-0">
          <Image
            src="/img/pprm-hero.png"
            alt="Team of realtors"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 b bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="head-1 text-white ">
            Pineleaf Realtor Reward Mechanism (PRRM)
          </h1>
          <p className="mt-3 max-w-3xl para-2 !leading-[25.2px]  text-white">
            A structured system designed to empower realtors, recognize leadership, and create wealth through both active and passive income opportunities.
          </p>
          <div className="mt-8">
            <nav className="flex items-center gap-[14px]">
              <Link href="/" className="text-white para-4  hover:text-green-100">
                Home
              </Link>
              <GoArrowLeft size={16} className='text-white' />

              <Link href="/pprm" className="text-[#FBBF00] font-[700] para-4 hover:text-green-100">
                PRRM
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* How PRRM Works Section */}
      <section className="section max-w-7xl mx-auto">
        <div className="text-center pb-[68px]">
          <h2 className="head-2 text-gray-800 mb-[12px]">How PRRM Works: The Commission Plan</h2>
          <p className="max-w-3xl mx-auto para-3 text-gray-600">
            Pineleaf&apos;s PRRM is a Unilevel Compensation Plan designed to help every realtor earn more as they grow their network. Whether you&apos;re closing direct deals or mentoring a team, every effort counts.
          </p>
        </div>

        <div className="header">
        <h3 className="head-4 text-gray-800  text-center">Commission Breakdown</h3>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaHandshake className="h-8 w-8 text-[#2F5318]" />
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Direct Sales Commission</h4>
            <p className="text-gray-600">10% on every successful referral</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaUsers className="h-8 w-8 text-[#2F5318]" />
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Level 1 Earnings</h4>
            <p className="text-gray-600">4% from your direct recruits</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaTree className="h-8 w-8 text-[#2F5318]" />
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Level 2 Earnings</h4>
            <p className="text-gray-600">2% from their recruits</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaChartLine className="h-8 w-8 text-[#2F5318]" />
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Level 3 Earnings</h4>
            <p className="text-gray-600">1% from their recruits</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaWallet className="h-8 w-8 text-[#2F5318]" />
              </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">Passive Income</h4>
            <p className="text-gray-600">Earn consistently even when your team sells</p>
          </div>
        </div>
      </section>



    <div className='mt-[100px]'>
<StatsMarquee/>

    </div>
      {/* Ranks & Rewards */}
      <section className="py-16 px-[6.2vw] max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ranks & Rewards</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Recognition, rankings, and rewards await at every milestone. The higher you grow, the more you earn, lead, and influence.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-[#2F5318] text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 bg-[#2F5318] text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-6 py-3 bg-[#2F5318] text-left text-sm font-semibold text-white uppercase tracking-wider">
                  Rewards
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Star Realtor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,000 Team Members OR ₦100 Million in Sales
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1% of Company&apos;s General Sales + Premium Gifts (TV, Laptop, Jewelry)
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Senior Star Realtor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₦100M Personal Sales OR ₦1 Billion Group Sales
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2% of Company Sales Monthly + Brand New Car + Travel Packages
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Executive Star Realtor
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₦2 Billion Team Sales
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  All-Expense Paid International Trip + Fully Furnished Duplex
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Brand Ambassador
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₦5 Billion Team Sales
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Automatic Board Membership + Lifetime Entitlements + Luxury Car
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Join PRRM */}
      <section className="py-16 px-[6.2vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/img/pprm-hero2.png"
              alt="Realtor receiving car reward"
              width={600}
              height={450}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Join PRRM?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>A proven structure for consistent growth</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Real income, real recognition</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Trainings, mentorship, and promos to help you scale</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                <span>Exclusive annual awards and life-changing incentives</span>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready to Earn and Grow?</h3>
              <p className="mb-4">Register now to receive your:</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                  <span>Unique Referral Code</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                  <span>Personal Seller Dashboard</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="mt-1 text-[#2F5318] mr-3 flex-shrink-0" />
                  <span>Access to commission tracking and team management tools</span>
                </li>
              </ul>
              <button className="bg-[#2F5318] hover:bg-[#2f5318ab] text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default Home;