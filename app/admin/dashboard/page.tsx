import Balance from '@/components/admin/Balance'
import Header from '@/components/admin/Header'
import SalesReport from '@/components/admin/SalesReport'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col gap-5 z-[-10]">
                    <Balance />
                    <SalesReport />
                </div>
            </div>
        </div>

    )
}

export default page
