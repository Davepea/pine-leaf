import React from 'react'
import DashboardTable from './table/DashboardTable'

const SalesReport = () => {
    return (
        <div className='bg-white rounded-[10px] h-full py-6 flex flex-col gap-6'>
            <h3 className='px-[30px] text-[#000000]/80 text-xl font-bold'>Sales Report</h3>
            <DashboardTable />
        </div>
    )
}

export default SalesReport
