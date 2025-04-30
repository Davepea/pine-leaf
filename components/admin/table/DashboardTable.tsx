import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

const DashboardTable = () => {
    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full">
                <div className="overflow-x-auto w-full mytable py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
                            <tr>
                                <th>Sales by</th>
                                <th>Property name</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-base text-[#000000]/80'>
                            {/* row 1 */}
                            <tr>
                                <td>
                                    <div className="flex items-center gap-[10px]">
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                        Chidimma Orakwue
                                    </div>
                                </td>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Paid</button>
                                </td>
                                <td>
                                    <Link className="font-bold text-[#2F5318]" href={''}>Edit</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-[10px]">
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                        Joseph Mbakwe
                                    </div>
                                </td>
                                <td>Stunner Homes</td>
                                <td>Okpanam</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20 h-[35px] px-[18px] rounded-[10px]'>Pending</button>
                                </td>
                                <td>
                                    <Link className="font-bold text-[#2F5318]" href={''}>Edit</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-[10px]">
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                        Chidimma Orakwue
                                    </div>
                                </td>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Paid</button>
                                </td>
                                <td>
                                    <Link className="font-bold text-[#2F5318]" href={''}>Edit</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-[10px]">
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                        Joseph Mbakwe
                                    </div>
                                </td>
                                <td>Stunner Homes</td>
                                <td>Okpanam</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20 h-[35px] px-[18px] rounded-[10px]'>Pending</button>
                                </td>
                                <td>
                                    <Link className="font-bold text-[#2F5318]" href={''}>Edit</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-[10px]">
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                        Chidimma Orakwue
                                    </div>
                                </td>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Paid</button>
                                </td>
                                <td>
                                    <Link className="font-bold text-[#2F5318]" href={''}>Edit</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="join mt-5 w-full justify-center">
                    <div className="size-[35px] flex items-center justify-center text-black/80">
                        <MdArrowBackIos size={16} />
                    </div>
                    <input
                        className="join-item btn items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]"
                        type="radio"
                        name="options"
                        aria-label="1"
                        defaultChecked />
                    <input className="join-item btn items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]" type="radio" name="options" aria-label="2" />
                    <input className="join-item btn items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]" type="radio" name="options" aria-label="3" />
                    <input className="join-item btn items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]" type="radio" name="options" aria-label="4" />
                    <input className="join-item btn btn-disabled items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]" type="radio" name="options" aria-label="..." />
                    <div className="size-[35px] flex items-center justify-center text-black/80">
                        <MdArrowForwardIos size={16} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTable
