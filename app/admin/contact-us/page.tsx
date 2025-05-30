import Header from '@/components/admin/Header'
import ContactUsTable from '@/components/admin/table/ContactUs'
import React from 'react'
import { MdOutlineFilterAlt, MdOutlineFormatListBulleted, MdSearch } from 'react-icons/md'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className="flex justify-between items-center">
                    <form action="" className='h-[40px] md:w-[386px] w-[185px]'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input type="text" name="search" id="search" placeholder='Search contact' className='h-[40px] w-full outline-none border-none placeholder:text-[#000000]/80' />
                            <MdSearch size={20} />
                        </label>
                    </form>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center gap-2 border border-[#2F5318]/20 md:px-[15px] px-2 h-[40px] rounded-[10px] text-[#2F531833]">
                            <MdOutlineFilterAlt size={20} className='text-[#2F5318]' />
                            <span className='text-[#000000]/80 md:text-base text-sm'>Filter</span>
                        </div>
                        <div className="flex items-center gap-2 border border-[#2F5318]/20 md:px-[15px] px-2 h-[40px] rounded-[10px] text-[#2F531833]">
                            <MdOutlineFormatListBulleted size={20} className='text-[#2F5318]' />
                        </div>
                    </div>
                </div>
                <div className="py-5 gap-5">
                    <ContactUsTable />
                </div>
            </div>

        </div>
    )
}

export default page
