import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

const DashboardTable = () => {
    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full">
                <div className="overflow-x-auto w-full mytable py-2">
                    <table className="table border-b border-[#0000001A]">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Property <br />Name</th>
                                <th>No. of <br />Plots</th>
                                <th>Payment <br />Type</th>
                                <th>Proof of <br />Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className='text-base text-[#000000]/80'>
                            {/* row 1 */}
                            <tr>
                                <td>001</td>
                                <td>vincentokagbue <br />@gmail.com</td>
                                <td>KD Pineleaf Estate Olloh</td>
                                <td>1</td>
                                <td>Full Payment <br />N5,000,000</td>
                                <td className="font-bold text-[#2F5318]">Paid Online</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Confirmed</button>
                                </td>
                                <td className="font-bold text-[#2F5318]">21/04/25 <br />07:39:20 am</td>
                            </tr>
                            <tr>
                                <td>001</td>
                                <td>vincentokagbue <br />@gmail.com</td>
                                <td>KD Pineleaf Estate Olloh</td>
                                <td>1</td>
                                <td>Full Payment <br />N5,000,000</td>
                                <td className="font-bold text-[#2F5318]">Uploaded Receipt</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Confirmed</button>
                                </td>
                                <td className="font-bold text-[#2F5318]">21/04/25 <br />07:39:20 am</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="mt-5 w-full justify-center">
                    <Link href={'/'} className='flex gap-1 items-center w-max mx-auto text-[#2F5318] text-base font-bold'>See all <MdOutlineArrowOutward size={12} /></Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardTable
