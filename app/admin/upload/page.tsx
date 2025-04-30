import Header from '@/components/admin/Header'
import React from 'react'
import { MdOutlineImage } from 'react-icons/md'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col gap-5">
                    <div className="bg-white p-[30px] w-full">
                        <div className="flex flex-col gap-5">
                            <div className="grid md:grid-cols-2 gap-8 rounded-[10px]">
                                <div className="flex flex-col gap-8">
                                    <h3 className='text-2xl text-black/80 font-bold'>Property Details</h3>
                                    <form action="" className='flex flex-col gap-[15px]'>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1'>Property Name
                                            <input type="text" name="" id="" className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none' />
                                        </label>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1'>Location
                                            <input type="text" name="" id="" className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none' />
                                        </label>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1'>Price
                                            <input type="text" name="" id="" className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none' />
                                        </label>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1'>Total Plots
                                            <input type="text" name="" id="" className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none' />
                                        </label>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1'>Type
                                            <select name="" id="" className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'>
                                                <option value="land">Land</option>
                                                <option value="house">House</option>
                                            </select>
                                        </label>
                                    </form>
                                </div>
                                <div className="flex flex-col gap-8">
                                    <h3 className='text-2xl text-black/80 font-bold'>Property Description</h3>
                                    <form action="" className='flex flex-col gap-8 h-full'>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-1 h-full'>
                                            <textarea name="" id="" className='w-full md:h-full h-[172px] p-4 border border-[#2F5318]/80 rounded-[10px] outline-none'></textarea>
                                        </label>
                                        <label htmlFor="" className='text-lg text-black/80 font-normal flex flex-col gap-[10px] h-full'>Images
                                            <div className="flex items-center justify-center md:h-full h-[172px] w-full border border-dashed border-[#2F5318]/80 rounded-[10px] outline-none">
                                                <div className="flex flex-col justify-center items-center text-center gap-5 px-4">
                                                    <div className="flex items-center justify-center w-[80px] h-[62px]">
                                                        <MdOutlineImage size={80} className='text-[#2F5318]/75' />
                                                    </div>
                                                    <input type="file" name="" id="" className='w-fit h-full px-4 outline-none border-0 text-black/80 border-input bg-white text-sm file:border file:border-[#2F5318]/20 file:rounded-[10px] file:text-black/80 file:text-sm file:p-2 file:font-medium' />
                                                </div>
                                            </div>
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <button className='text-white text-xl font-bold bg-[#2F5318] border-none outline-none rounded-[10px] h-[50px] px-[30px] w-max mx-auto'>Upload Property</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
