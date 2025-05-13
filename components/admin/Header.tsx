'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { MdNotificationsNone, MdSearch } from 'react-icons/md'
import { VscListFlat } from 'react-icons/vsc'


const pageTitles: Record<string, string> = {
    '/admin/dashboard': 'Overview',
    '/admin/properties': 'Properties',
    '/admin/users': 'Users',
    '/admin/transactions': 'Transactions (Outgoing Payments)',
    '/admin/upload': 'Upload Property',
    '/admin/proofs': 'Proofs (Of Property Sold)',
    '/admin/referral-earnings': 'Referral Earnings',
    '/admin/realtors-reg': 'Realtors Registration (First-time paid signups)',
    '/admin/salary-log': 'Salary Logs',
}

const showSearchPaths = [
    '/admin/dashboard'
]
const hideProfilePaths = [
    '/admin/upload'
]
const Header = () => {
    const pathname = usePathname()

    const getPageTitle = () => {
        return pageTitles[pathname] || 'Overview'
    }

    const shouldShowSearch = showSearchPaths.includes(pathname)
    const shouldHideProfile = hideProfilePaths.includes(pathname)
    return (
        <div>
            <div className="w-full flex justify-between items-center text-[#000000]/80 py-6">
                <div className="flex items-center gap-2">
                    <div className="size-[40px] flex justify-center items-center border border-black/20 rounded-[10px] md:hidden">
                        <VscListFlat size={24} />
                    </div>
                    <h2 className='md:text-[32px] text-2xl font-bold capitalize'>{getPageTitle()}</h2>
                </div>
                <div className="flex items-center md:gap-5 gap-3">
                    {shouldShowSearch && (
                        <form action="" className='h-[45px] w-[280px] md:block hidden'>
                            <label htmlFor="search" className='px-[30px] border border-[#2F5318]/50 h-full w-full rounded-full flex items-center text-[#000000]/40'>
                                <input type="text" name="search" id="search" placeholder='Search' className='h-[45px] w-full outline-none border-none placeholder:text-[#000000]/40' />
                                <MdSearch size={22} />
                            </label>
                        </form>

                    )}
                    {!shouldHideProfile && (
                        <div className="flex items-center md:gap-5 gap-3">
                            <div className="size-[30px] flex items-center justify-center text-[#2F5318]">
                                <MdNotificationsNone size={30} />
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="flex items-center gap-[10px] md:text-base text-sm">
                                    <Image src='/images/dashboard/profile.png' width={46} height={46} alt='logo' objectFit='cover' objectPosition='center' className='md:size-[46px] size-[30px] rounded-full border border-[#2F5318]' />
                                    <div className="flex items-center gap-2">
                                        Admin
                                        <IoIosArrowDown size={20} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu rounded-[10px] z-1 w-52 p-2 shadow-sm bg-[#E6FFF6F6] border-2 border-[#2F5318]/80">
                                    <li className='hover:bg-[#2F5318F6] hover:text-white rounded-[5px]'><Link href={''}>Item 1</Link></li>
                                    <li className='hover:bg-[#2F5318F6] hover:text-white rounded-[5px]'><Link href={''}>Item 2</Link></li>
                                </ul>
                            </div>
                        </div>
                    )
                    }

                </div>
            </div>

        </div>
    )
}

export default Header
