
import BalanceCard from '@/components/realtor/dashboard/BalanceCard'
import Properties from '@/components/realtor/Properties'
import Header from '@/components/realtor/Header'
import DashboardTable from '@/components/realtor/table/DashboardTable'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col gap-10">
                    <BalanceCard />
                    <div className="flex flex-col gap-4">
                        <h3 className='text-[#000000]/80 text-xl font-bold'>Transactions</h3>
                        <DashboardTable />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className='text-[#000000]/80 text-xl font-bold'>Find your best land</h3>
                        <Properties />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page
