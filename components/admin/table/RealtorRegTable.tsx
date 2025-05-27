// import Image from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'

const RealtorRegTable = () => {
    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Total <br />Transaction</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-base text-[#000000]/80'>
                            {/* row 1 */}
                            <tr>
                                <td>001</td>
                                <td>vincent okagbue</td>
                                <td>vincentokagbue@gmail.com</td>
                                <td>
                                    <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                </td>
                                <td>N3,000,000</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>001</td>
                                <td>vincent okagbue</td>
                                <td>vincentokagbue@gmail.com</td>
                                <td>
                                    <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                </td>
                                <td>N3,000,000</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="join mt-3 w-full justify-center">
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

export default RealtorRegTable
