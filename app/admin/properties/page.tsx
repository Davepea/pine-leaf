'use client'

import Header from '@/components/admin/Header'
import PropertiesTable from '@/components/admin/table/PropertiesTable'
import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'
const PropertiesPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll flex flex-col gap-5">
                <Header />
                <div className="flex flex-wrap gap-[22px] items-center">
                    <form className='h-[40px] max-w-[386px] w-full'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder='Search property'
                                className='h-[40px] w-full outline-none border-none placeholder:text-[#000000]/80'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch size={22} />
                        </label>
                    </form>
                    <div className="flex items-center gap-[22px] md:w-fit w-full">
                        <select
                            name="state"
                            id="state"
                            className='max-w-[229px] w-full h-[40px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'
                        >
                            <option>All states</option>
                            <option>Enugu</option>
                            <option>Lagos</option>
                            <option>Abuja</option>
                        </select>
                        <select
                            name="date"
                            id="date"
                            className='max-w-[178px] w-full h-[40px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'
                        >
                            <option>Any date</option>
                            <option>This week</option>
                            <option>This month</option>
                            <option>This year</option>
                        </select>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-5">
                    <PropertiesTable searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    )
}

export default PropertiesPage