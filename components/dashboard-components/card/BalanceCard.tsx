import React from 'react'
import { MdOutlineAllInbox, MdOutlineAssessment, MdOutlineCached, MdOutlineWarehouse } from 'react-icons/md'

const balance = [
    {
        id: 1,
        title: 'Total number of Lands',
        icon: <MdOutlineWarehouse size={18} />,
        amount: '5,000',
        color: '#2F5318',
    },
    {
        id: 2,
        title: 'Total Land Sold',
        icon: <MdOutlineAllInbox size={18} />,
        amount: 'N600M',
        color: '#FBBF00',
    },
    {
        id: 3,
        title: 'Total Commission Paid',
        icon: <MdOutlineAssessment size={18} />,
        amount: 'N100M',
        color: '#2F5318',
    },
    {
        id: 4,
        title: 'Pending Commission ',
        icon: <MdOutlineCached size={18} />,
        amount: 'N0.00',
        color: '#CD2B2E',
    },
]
const BalanceCard = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {
                balance.map(bal => (
                    <div key={bal.id} className='w-full flex flex-col gap-4 md:p-4 px-3 py-4 bg-white rounded-[10px]'>
                        <div className="w-full flex justify-between items-center">
                            <small className='md:text-base text-xs font-normal text-[#000000]/80'>{bal.title}</small>
                            <span className={`md:size-[30px] size-[15px] flex items-center justify-center rounded-full bg-[${bal.color}]/20 text-[${bal.color}]`}>{bal.icon}</span>
                        </div>
                        <h2 className='text-[#2F5318] font-bold md:text-[32px] text-xl'>{bal.amount}</h2>
                    </div>
                ))
            }
        </div>
    )
}

export default BalanceCard
