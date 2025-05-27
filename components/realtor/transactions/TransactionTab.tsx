'use client'
import React, { useState } from 'react'
import HistoryTabTable from './HistoryTabTable';
import CommissionTabTable from './CommissionTabTable';

const TransactionTab = () => {
    const [activeTab, setActiveTab] = useState("History");

    return (
        <div className='flex flex-col gap-8'>
            <div className="flex items-center gap-5">
                <button
                    className={`h-[50px] text-3xl bg-transparent border-none w-max ${activeTab == 'History' ? 'text-[#2F5318] font-bold border-b border-b-[#2F5318]' : 'font-normal text-black/20'}`}
                    onClick={() => setActiveTab('History')}
                >
                    History
                </button>
                <button
                    className={`h-[50px] text-3xl bg-transparent border-none w-max ${activeTab == 'Commission' ? 'text-[#2F5318] font-bold border-b border-b-[#2F5318]' : 'font-normal text-black/20'}`}
                    onClick={() => setActiveTab('Commission')}
                >
                    Referral Commission
                </button>
            </div>


            {activeTab == 'History' &&
                <div>
                    <HistoryTabTable />
                </div>
            }
            {activeTab == 'Commission' &&
                <div>
                    <CommissionTabTable />
                </div>
            }
        </div>
    )
}

export default TransactionTab
