import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaTree, FaChartLine, FaWallet, FaCheck } from 'react-icons/fa';

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
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Pineleaf Realtor Reward Mechanism (PRRM)
          </h1>
          <p className="mt-3 max-w-3xl text-xl text-white">
            A structured system designed to empower realtors, recognize leadership, and create wealth through both active and passive income opportunities.
          </p>
          <div className="mt-8">
            <nav className="flex space-x-4">
              <Link href="/" className="text-white font-medium hover:text-green-100">
                Home
              </Link>
              <span className="text-white">&rarr;</span>
              <Link href="/pprm" className="text-white font-medium hover:text-green-100">
                PRRM
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* How PRRM Works Section */}
      <section className="py-16 px-[6.2vw] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How PRRM Works: The Commission Plan</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Pineleaf&apos;s PRRM is a Unilevel Compensation Plan designed to help every realtor earn more as they grow their network. Whether you&apos;re closing direct deals or mentoring a team, every effort counts.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Commission Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <FaWallet className="h-8 w-8 text-[#2F5318]" />
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

    {/* Stats Bar */}
<section className="bg-green-50 py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
    <div className="flex overflow-x-auto scrollbar-hide justify-between" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex-shrink-0 px-6 min-w-[200px]  flex items-center gap-1">
        <p className="small-header font-bold !text-[#2F5318] !text-[18px]">₦2 Billion+</p>
        <p className="text-gray-600">in Realtor Rewards Paid</p>
      </div>
      <div className="flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
        <p className="small-header font-bold !text-[#2F5318] !text-[18px]">1,819+ Properties</p>
        <p className="text-gray-600">Successfully Allocated</p>
      </div>
      <div className="flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
        <p className="small-header font-bold !text-[#2F5318] !text-[18px]">50+</p>
        <p className="text-gray-600">Active Estates Across Nigeria</p>
      </div>
      <div className="flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
        <p className="small-header font-bold !text-[#2F5318] !text-[18px]">1,819+</p>
        <p className="text-gray-600">Happy Landowners</p>
      </div>
    </div>
  </div>
</section>

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