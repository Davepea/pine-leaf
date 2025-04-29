import Balance from '@/components/dashboard-components/Balance'
import Header from '@/components/dashboard-components/Header'
import SalesReport from '@/components/dashboard-components/SalesReport'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col gap-5">
                    <Balance />
                    <SalesReport />
                </div>
            </div>
        </div>

    )
}

export default page
