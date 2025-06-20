'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { IoDownloadOutline } from 'react-icons/io5'
import { LiaHomeSolid, LiaIdCardSolid } from 'react-icons/lia'
import { MdNotificationsNone, MdOutlineAccountBalanceWallet, MdOutlineDashboard, MdSearch } from 'react-icons/md'


const contents = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <MdOutlineDashboard size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_815_849)">
                    <path d="M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_849">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/dashboard'
    },
    {
        id: 2,
        name: 'Properties',
        icon: <LiaHomeSolid size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_815_854)">
                    <path d="M11.0007 5.21583L15.584 9.34083V16.5H13.7507V11H8.25065V16.5H6.41732V9.34083L11.0007 5.21583ZM11.0007 2.75L1.83398 11H4.58398V18.3333H10.084V12.8333H11.9173V18.3333H17.4173V11H20.1673L11.0007 2.75Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_854">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        ),
        url: '/properties'
    },
    {
        id: 3,
        name: 'Transactions',
        icon: <MdOutlineAccountBalanceWallet size={20} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_839_1111)">
                    <path d="M19.25 6.67333V4.58333C19.25 3.575 18.425 2.75 17.4167 2.75H4.58333C3.56583 2.75 2.75 3.575 2.75 4.58333V17.4167C2.75 18.425 3.56583 19.25 4.58333 19.25H17.4167C18.425 19.25 19.25 18.425 19.25 17.4167V15.3267C19.7908 15.0058 20.1667 14.4283 20.1667 13.75V8.25C20.1667 7.57167 19.7908 6.99417 19.25 6.67333ZM18.3333 8.25V13.75H11.9167V8.25H18.3333ZM4.58333 17.4167V4.58333H17.4167V6.41667H11.9167C10.9083 6.41667 10.0833 7.24167 10.0833 8.25V13.75C10.0833 14.7583 10.9083 15.5833 11.9167 15.5833H17.4167V17.4167H4.58333Z" fill="white" />
                    <path d="M14.666 12.375C15.4254 12.375 16.041 11.7594 16.041 11C16.041 10.2406 15.4254 9.625 14.666 9.625C13.9066 9.625 13.291 10.2406 13.291 11C13.291 11.7594 13.9066 12.375 14.666 12.375Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_839_1111">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/transactions'
    },
    {
        id: 4,
        name: 'Installment',
        icon: <IoDownloadOutline size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1470_1123)">
                    <path d="M18.8943 4.88867H16.2237C16.0616 4.88867 15.9062 4.95306 15.7916 5.06766C15.677 5.18227 15.6126 5.33771 15.6126 5.49978C15.6126 5.66186 15.677 5.8173 15.7916 5.93191C15.9062 6.04651 16.0616 6.1109 16.2237 6.1109H18.9431V18.3331H3.05425V6.1109H5.73092C5.893 6.1109 6.04844 6.04651 6.16304 5.93191C6.27765 5.8173 6.34203 5.66186 6.34203 5.49978C6.34203 5.33771 6.27765 5.18227 6.16304 5.06766C6.04844 4.95306 5.893 4.88867 5.73092 4.88867H3.10314C2.93857 4.88209 2.77437 4.90883 2.62039 4.96729C2.46641 5.02576 2.32584 5.11474 2.20712 5.2289C2.0884 5.34306 1.99397 5.48003 1.92952 5.6316C1.86506 5.78316 1.8319 5.94619 1.83203 6.1109V18.3331C1.8319 18.4978 1.86506 18.6609 1.92952 18.8124C1.99397 18.964 2.0884 19.101 2.20712 19.2151C2.32584 19.3293 2.46641 19.4183 2.62039 19.4767C2.77437 19.5352 2.93857 19.5619 3.10314 19.5553H18.8943C19.0588 19.5619 19.223 19.5352 19.377 19.4767C19.531 19.4183 19.6716 19.3293 19.7903 19.2151C19.909 19.101 20.0034 18.964 20.0679 18.8124C20.1323 18.6609 20.1655 18.4978 20.1654 18.3331V6.1109C20.1655 5.94619 20.1323 5.78316 20.0679 5.6316C20.0034 5.48003 19.909 5.34306 19.7903 5.2289C19.6716 5.11474 19.531 5.02576 19.377 4.96729C19.223 4.90883 19.0588 4.88209 18.8943 4.88867Z" fill="white" />
                    <path d="M6.29308 11.5318L10.5709 15.7424C10.6851 15.8544 10.8387 15.9171 10.9986 15.9171C11.1586 15.9171 11.3122 15.8544 11.4264 15.7424L15.7042 11.5318C15.8201 11.4184 15.8861 11.2635 15.8879 11.1014C15.8896 10.9392 15.8268 10.783 15.7134 10.6671C15.5999 10.5512 15.4451 10.4852 15.2829 10.4834C15.1207 10.4817 14.9645 10.5445 14.8486 10.6579L11.6097 13.8418V2.44461C11.6097 2.28253 11.5454 2.12709 11.4308 2.01249C11.3162 1.89788 11.1607 1.8335 10.9986 1.8335C10.8366 1.8335 10.6811 1.89788 10.5665 2.01249C10.4519 2.12709 10.3875 2.28253 10.3875 2.44461V13.8418L7.14864 10.6579C7.03275 10.5445 6.87655 10.4817 6.71438 10.4834C6.55221 10.4852 6.39737 10.5512 6.28392 10.6671C6.17046 10.783 6.10769 10.9392 6.10941 11.1014C6.11113 11.2635 6.1772 11.4184 6.29308 11.5318Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_1470_1123">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/installment'
    },
    {
        id: 5,
        name: 'Withdraw',
        icon: <LiaIdCardSolid size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3346 1.8335H9.16797C8.43862 1.8335 7.73915 2.12323 7.22342 2.63895C6.7077 3.15468 6.41797 3.85415 6.41797 4.5835V11.0002C6.41797 11.7295 6.7077 12.429 7.22342 12.9447C7.73915 13.4604 8.43862 13.7502 9.16797 13.7502H18.3346C19.064 13.7502 19.7635 13.4604 20.2792 12.9447C20.7949 12.429 21.0846 11.7295 21.0846 11.0002V4.5835C21.0846 3.85415 20.7949 3.15468 20.2792 2.63895C19.7635 2.12323 19.064 1.8335 18.3346 1.8335ZM19.2513 11.0002C19.2513 11.2433 19.1547 11.4764 18.9828 11.6483C18.8109 11.8203 18.5777 11.9168 18.3346 11.9168H9.16797C8.92485 11.9168 8.6917 11.8203 8.51979 11.6483C8.34788 11.4764 8.2513 11.2433 8.2513 11.0002V4.5835C8.2513 4.34038 8.34788 4.10722 8.51979 3.93532C8.6917 3.76341 8.92485 3.66683 9.16797 3.66683H18.3346C18.5777 3.66683 18.8109 3.76341 18.9828 3.93532C19.1547 4.10722 19.2513 4.34038 19.2513 4.5835V11.0002ZM16.043 7.3335C15.7038 7.33552 15.3773 7.46284 15.1263 7.691C14.9292 7.51183 14.6843 7.39378 14.4213 7.35119C14.1584 7.3086 13.8887 7.34329 13.6452 7.45106C13.4016 7.55884 13.1945 7.73504 13.0492 7.95827C12.9038 8.18149 12.8265 8.44213 12.8265 8.7085C12.8265 8.97487 12.9038 9.2355 13.0492 9.45873C13.1945 9.68195 13.4016 9.85816 13.6452 9.96593C13.8887 10.0737 14.1584 10.1084 14.4213 10.0658C14.6843 10.0232 14.9292 9.90516 15.1263 9.726C15.2918 9.87645 15.4916 9.98424 15.7082 10.04C15.9248 10.0958 16.1518 10.0979 16.3694 10.0461C16.587 9.99434 16.7887 9.89025 16.957 9.74288C17.1253 9.59551 17.2551 9.4093 17.3351 9.20042C17.4151 8.99154 17.443 8.76628 17.4163 8.54419C17.3895 8.3221 17.309 8.10989 17.1817 7.92596C17.0544 7.74202 16.8842 7.59193 16.6857 7.48868C16.4873 7.38544 16.2667 7.33217 16.043 7.3335ZM14.668 15.5835C14.4249 15.5835 14.1917 15.6801 14.0198 15.852C13.8479 16.0239 13.7513 16.257 13.7513 16.5002V17.4168C13.7513 17.6599 13.6547 17.8931 13.4828 18.065C13.3109 18.2369 13.0778 18.3335 12.8346 18.3335H3.66797C3.42485 18.3335 3.1917 18.2369 3.01979 18.065C2.84788 17.8931 2.7513 17.6599 2.7513 17.4168V13.7502H3.66797C3.91108 13.7502 4.14424 13.6536 4.31615 13.4817C4.48806 13.3098 4.58464 13.0766 4.58464 12.8335C4.58464 12.5904 4.48806 12.3572 4.31615 12.1853C4.14424 12.0134 3.91108 11.9168 3.66797 11.9168H2.7513V11.0002C2.7513 10.757 2.84788 10.5239 3.01979 10.352C3.1917 10.1801 3.42485 10.0835 3.66797 10.0835C3.91108 10.0835 4.14424 9.98692 4.31615 9.81501C4.48806 9.6431 4.58464 9.40994 4.58464 9.16683C4.58464 8.92371 4.48806 8.69056 4.31615 8.51865C4.14424 8.34674 3.91108 8.25016 3.66797 8.25016C2.93862 8.25016 2.23915 8.53989 1.72343 9.05562C1.2077 9.57134 0.917969 10.2708 0.917969 11.0002V17.4168C0.917969 18.1462 1.2077 18.8456 1.72343 19.3614C2.23915 19.8771 2.93862 20.1668 3.66797 20.1668H12.8346C13.564 20.1668 14.2635 19.8771 14.7792 19.3614C15.2949 18.8456 15.5846 18.1462 15.5846 17.4168V16.5002C15.5846 16.257 15.4881 16.0239 15.3161 15.852C15.1442 15.6801 14.9111 15.5835 14.668 15.5835ZM5.5013 16.5002H6.41797C6.66108 16.5002 6.89424 16.4036 7.06615 16.2317C7.23806 16.0598 7.33464 15.8266 7.33464 15.5835C7.33464 15.3404 7.23806 15.1072 7.06615 14.9353C6.89424 14.7634 6.66108 14.6668 6.41797 14.6668H5.5013C5.25819 14.6668 5.02503 14.7634 4.85312 14.9353C4.68121 15.1072 4.58464 15.3404 4.58464 15.5835C4.58464 15.8266 4.68121 16.0598 4.85312 16.2317C5.02503 16.4036 5.25819 16.5002 5.5013 16.5002Z" fill="white" />
            </svg>
        ),
        url: '/withdraw'
    },
    {
        id: 6,
        name: 'Profile',
        icon: <CiUser size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.66797 16.5021C3.66797 15.5297 4.05428 14.597 4.74191 13.9094C5.42954 13.2218 6.36217 12.8354 7.33464 12.8354H14.668C15.6404 12.8354 16.5731 13.2218 17.2607 13.9094C17.9483 14.597 18.3346 15.5297 18.3346 16.5021C18.3346 16.9883 18.1415 17.4547 17.7977 17.7985C17.4538 18.1423 16.9875 18.3354 16.5013 18.3354H5.5013C5.01507 18.3354 4.54876 18.1423 4.20494 17.7985C3.86112 17.4547 3.66797 16.9883 3.66797 16.5021Z" stroke="white" strokeWidth="3.75" strokeLinejoin="round" />
                <path d="M11 9.16895C12.5188 9.16895 13.75 7.93773 13.75 6.41895C13.75 4.90016 12.5188 3.66895 11 3.66895C9.48122 3.66895 8.25 4.90016 8.25 6.41895C8.25 7.93773 9.48122 9.16895 11 9.16895Z" stroke="white" strokeWidth="3.75" />
            </svg>
        ),
        url: '/profile'
    },
]

const pageTitles: Record<string, string> = {
    '/dashboard': 'Welcome',
    '/properties': 'Properties',
    '/transactions': 'Transactions',
    '/installment': 'installment',
    '/withdraw': 'Withdraw',
    '/profile': 'Profile',
}

const showSearchPaths = [
    '/dashboard',
    '/properties',
    '/installment'
]
const hideProfilePaths = [
    '/upload'
]
const Header = () => {
    const pathname = usePathname()
    const [sideBar, setSidebar] = useState(false);

    const showSideBar = () => {
        setSidebar(!sideBar)
    }
    const hideSideBar = () => {
        setSidebar(false)
    }

    const getPageTitle = () => {
        return pageTitles[pathname] || 'Welcome'
    }

    const isActive = (path: string) => {
        return pathname.startsWith(path)
    }
    const shouldShowSearch = showSearchPaths.includes(pathname)
    const shouldHideProfile = hideProfilePaths.includes(pathname)
    return (
        <div className='drawer sticky top-0 left-0 bg-[#E6FFF6F6] z-10'>
            <input
                id="sidebar-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={sideBar}
                onChange={() => { }}
            />
            <div className="drawer-content">
                <div className="w-full flex justify-between items-center text-[#000000]/80 py-3 backdrop-blur-2xl">
                    <div className="flex items-center gap-2">
                        <div className="md:hidden block">
                            <FaBars onClick={showSideBar} size={20} className='p-1 size-[30px] border-2 border-[#2F5318] rounded-[5px] text-[#2F5318] flex justify-center items-center' />
                        </div>
                        <h2 className='md:text-[32px] text-2xl font-bold capitalize leading-6'>{getPageTitle()}</h2>
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
                                        <div>Admin</div>
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

            {setSidebar && (
                <div className="drawer-side">
                    <label
                        htmlFor="sidebar-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                        onClick={hideSideBar}
                    ></label>
                    <div className='md:hidden block'>
                        <div className="w-[250px] h-screen flex flex-col gap-10 justify-between bg-[#2F5318] text-white pt-5 sticky top-0 left-0">
                            <div className="absolute top-0 right-0 text-white size-[50px] flex items-center justify-center" onClick={hideSideBar}><FaXmark size={24} /></div>
                            <div className="flex items-center gap-3 px-5 p-5 pb-10">
                                <Image src='/images/logo-icon.png' width={78} height={78} alt='logo' className='size-[78px]' />
                                <div className="flex flex-col gap-0 text-white">
                                    <h2 className='font-bold text-2xl leading-9'>PINELEAF</h2>
                                    <h3 className='font-normal text-xl leading-6'>ESTATE</h3>
                                </div>
                            </div>
                            <ul className='flex flex-col gap-1 h-full overflow-y-auto px-5 py-2'>
                                {contents.map(content => (
                                    <li key={content.id}>
                                        <Link
                                            href={content.url}
                                            className={`w-full rounded-[10px] px-5 h-[50px] flex items-center gap-3 font-medium text-base ${isActive(content.url)
                                                ? 'bg-[#DFF7EE] text-[#000000]/80 fill-[#000000]/80'
                                                : 'text-white hover:bg-[#DFF7EE] hover:text-[#000000]/80 hover:bg-opacity-10 fill-[#000000]/80'
                                                }`}
                                        >
                                            <span className={`size-[22px] flex items-center justify-center ${isActive(content.url) ? 'text-[#000000]/80' : ''}`}>{content.icon}</span>
                                            {content.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* <Link
                            href={'/'}
                            className='w-full rounded-[10px] px-5 h-[50px] flex items-center gap-3 text-white font-medium text-xl hover:bg-white hover:text-[#2F5318] hover:bg-opacity-10'
                        >
                            <span className='size-[22px] flex items-center justify-center'><MdLogout size={22} /></span>
                            Logout
                        </Link> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
