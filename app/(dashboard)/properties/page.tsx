import Header from '@/components/dashboard-components/Header'
import PropertiesTable from '@/components/dashboard-components/table/PropertiesTable'
import React from 'react'
import { MdSearch } from 'react-icons/md'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll flex flex-col gap-5">
                <Header />
                <div className="flex flex-wrap gap-[22px] items-center">
                    <form action="" className='h-[50px] max-w-[386px] w-full'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input type="text" name="search" id="search" placeholder='Search property' className='h-[45px] w-full outline-none border-none placeholder:text-[#000000]/80' />
                            <MdSearch size={22} />
                        </label>
                    </form>
                    <div className="flex items-center gap-[22px] md:w-fit w-full">
                        <select name="" id="" className='max-w-[229px] w-full h-[50px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'>
                            <option>All states</option>
                        </select>
                        <select name="" id="" className='max-w-[178px] w-full h-[50px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'>
                            <option>Any date</option>
                        </select>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-5">
                    <PropertiesTable />
                </div>
            </div>
        </div>
    )
}

export default page
