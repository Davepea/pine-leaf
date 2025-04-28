// import Image from 'next/image'
import Link from 'next/link'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from 'react-icons/md'

const PropertiesTable = () => {
    return (
        <div className='bg-white rounded-[10px] py-6'>
            <div className="w-full">
                <div className="overflow-x-auto w-full mytable">
                    <table className="table">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
                            <tr>
                                <th></th>
                                <th>Property title</th>
                                <th>Location</th>
                                <th>Total Plots</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th>Promo?</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-base text-[#000000]/80'>
                            {/* row 1 */}
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                    </label>
                                </th>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>1000</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Available</button>
                                </td>
                                <td className='text-[#2F5318] font-bold'>Jan 2025</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdOutlineModeEditOutline size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                    </label>
                                </th>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>1000</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20 h-[35px] px-[18px] rounded-[10px]'>Sold out</button>
                                </td>
                                <td className='text-[#2F5318] font-bold'>Jan 2025</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdOutlineModeEditOutline size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                    </label>
                                </th>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>1000</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]'>Available</button>
                                </td>
                                <td className='text-[#2F5318] font-bold'>Yes</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdOutlineModeEditOutline size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                    </label>
                                </th>
                                <td>Platinum Estate</td>
                                <td>Awka</td>
                                <td>1000</td>
                                <td>N3,000,000</td>
                                <td>
                                    <button className='border border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20 h-[35px] px-[18px] rounded-[10px]'>Sold out</button>
                                </td>
                                <td className='text-[#2F5318] font-bold'>Jan 2025</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdOutlineModeEditOutline size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
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

export default PropertiesTable
