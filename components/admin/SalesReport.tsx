import React from 'react'
import DashboardTable from './table/DashboardTable'

const SalesReport = () => {
    return (
        <div className='bg-white rounded-[10px] h-full md:py-6 py-3 flex flex-col md:gap-6 gap-3'>
            <h3 className='px-[30px] text-[#000000]/80 md:text-xl text-lg font-bold'>Sales Report</h3>
            <DashboardTable />
        </div>
    )
}

export default SalesReport
