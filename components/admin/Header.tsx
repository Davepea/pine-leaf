'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { LiaHomeSolid } from 'react-icons/lia'
import { MdNotificationsNone, MdOutlineAccountBalanceWallet, MdOutlineAllInbox, MdOutlineConnectWithoutContact, MdOutlineDashboard, MdOutlineGroupWork, MdOutlinePayments, MdOutlinePeopleAlt, MdSearch } from 'react-icons/md'
// import { VscListFlat } from 'react-icons/vsc'

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
        url: '/admin/dashboard'
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
        url: '/admin/properties'
    },
    {
        id: 3,
        name: 'Users',
        icon: <MdOutlinePeopleAlt size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_839_1100)">
                    <path d="M15.2793 12.0359C16.5351 12.8884 17.4151 14.0434 17.4151 15.5834V18.3334H21.0818V15.5834C21.0818 13.5851 17.8093 12.4026 15.2793 12.0359Z" fill="white" />
                    <path d="M13.7485 11.0001C15.7743 11.0001 17.4151 9.35925 17.4151 7.33341C17.4151 5.30758 15.7743 3.66675 13.7485 3.66675C13.3176 3.66675 12.9143 3.75841 12.5293 3.88675C13.2901 4.83091 13.7485 6.03175 13.7485 7.33341C13.7485 8.63508 13.2901 9.83592 12.5293 10.7801C12.9143 10.9084 13.3176 11.0001 13.7485 11.0001Z" fill="white" />
                    <path d="M8.2487 11.0001C10.2745 11.0001 11.9154 9.35925 11.9154 7.33341C11.9154 5.30758 10.2745 3.66675 8.2487 3.66675C6.22286 3.66675 4.58203 5.30758 4.58203 7.33341C4.58203 9.35925 6.22286 11.0001 8.2487 11.0001ZM8.2487 5.50008C9.25703 5.50008 10.082 6.32508 10.082 7.33341C10.082 8.34175 9.25703 9.16675 8.2487 9.16675C7.24036 9.16675 6.41536 8.34175 6.41536 7.33341C6.41536 6.32508 7.24036 5.50008 8.2487 5.50008Z" fill="white" />
                    <path d="M8.24935 11.9167C5.80185 11.9167 0.916016 13.1451 0.916016 15.5834V18.3334H15.5827V15.5834C15.5827 13.1451 10.6968 11.9167 8.24935 11.9167ZM13.7493 16.5001H2.74935V15.5926C2.93268 14.9326 5.77435 13.7501 8.24935 13.7501C10.7243 13.7501 13.566 14.9326 13.7493 15.5834V16.5001Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_839_1100">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/admin/users'
    },
    {
        id: 4,
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
        url: '/admin/transactions'
    },
    {
        id: 5,
        name: 'Upload',
        icon: <FiUpload size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_815_876)">
                    <path d="M16.4993 13.7501V16.5001H5.49935V13.7501H3.66602V16.5001C3.66602 17.5084 4.49102 18.3334 5.49935 18.3334H16.4993C17.5077 18.3334 18.3327 17.5084 18.3327 16.5001V13.7501H16.4993ZM6.41602 8.25008L7.70852 9.54258L10.0827 7.17758V14.6667H11.916V7.17758L14.2902 9.54258L15.5827 8.25008L10.9993 3.66675L6.41602 8.25008Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_876">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/admin/upload'
    },
    {
        id: 6,
        name: 'Proofs',
        icon: <MdOutlineAllInbox size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_815_883)">
                    <path d="M17.4167 2.75H4.58333C3.575 2.75 2.75 3.575 2.75 4.58333V11C2.75 12.0083 3.575 12.8333 4.58333 12.8333H17.4167C18.425 12.8333 19.25 12.0083 19.25 11V4.58333C19.25 3.575 18.425 2.75 17.4167 2.75ZM4.58333 9.16667H7.4525C7.645 9.88167 8.06667 10.5142 8.61667 11H4.58333V9.16667ZM17.4167 11H13.3833C13.9333 10.5142 14.355 9.88167 14.5475 9.16667H17.4167V11ZM17.4167 7.33333H12.8333V8.25C12.8333 9.23083 11.9808 10.0833 11 10.0833C10.0192 10.0833 9.16667 9.23083 9.16667 8.25V7.33333H4.58333V4.58333H17.4167V7.33333ZM15.5833 13.75H12.8333V14.6667C12.8333 15.0975 12.6592 15.4917 12.3933 15.8125C12.0542 16.225 11.55 16.5 11 16.5C10.45 16.5 9.94583 16.225 9.60667 15.8125C9.34083 15.4917 9.16667 15.0975 9.16667 14.6667V13.75H2.75V17.4167C2.75 18.425 3.575 19.25 4.58333 19.25H17.4167C18.425 19.25 19.25 18.425 19.25 17.4167V13.75H15.5833ZM4.58333 15.5833H7.4525C7.47083 15.6658 7.5075 15.7392 7.535 15.8125C7.755 16.4358 8.13083 16.9858 8.61667 17.4167H4.58333V15.5833ZM17.4167 17.4167H13.3833C13.8783 16.9858 14.2542 16.4358 14.465 15.8125C14.4925 15.7392 14.5292 15.6658 14.5475 15.5833H17.4167V17.4167Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_883">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/admin/proofs'
    },
    {
        id: 7,
        name: 'Referral Earnings',
        icon: <MdOutlineConnectWithoutContact size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_845_1585)">
                    <path d="M10.084 12.8333H8.25065C8.25065 8.27742 11.9448 4.58325 16.5007 4.58325V6.41659C12.9532 6.41659 10.084 9.28575 10.084 12.8333ZM16.5007 10.0833V8.24992C13.9707 8.24992 11.9173 10.3033 11.9173 12.8333H13.7507C13.7507 11.3116 14.979 10.0833 16.5007 10.0833ZM6.41732 3.66659C6.41732 2.64909 5.60148 1.83325 4.58398 1.83325C3.56648 1.83325 2.75065 2.64909 2.75065 3.66659C2.75065 4.68409 3.56648 5.49992 4.58398 5.49992C5.60148 5.49992 6.41732 4.68409 6.41732 3.66659ZM10.4965 4.12492H8.66315C8.44315 5.42659 7.32482 6.41659 5.95898 6.41659H3.20898C2.44815 6.41659 1.83398 7.03075 1.83398 7.79159V10.0833H7.33398V8.01159C9.03898 7.47075 10.3132 5.96742 10.4965 4.12492ZM17.4173 15.5833C18.4348 15.5833 19.2507 14.7674 19.2507 13.7499C19.2507 12.7324 18.4348 11.9166 17.4173 11.9166C16.3998 11.9166 15.584 12.7324 15.584 13.7499C15.584 14.7674 16.3998 15.5833 17.4173 15.5833ZM18.7923 16.4999H16.0423C14.6765 16.4999 13.5582 15.5099 13.3382 14.2083H11.5048C11.6882 16.0508 12.9623 17.5541 14.6673 18.0949V20.1666H20.1673V17.8749C20.1673 17.1141 19.5532 16.4999 18.7923 16.4999Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_845_1585">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/admin/referral-earnings'
    },
    {
        id: 8,
        name: 'Realtors Reg',
        icon: <MdOutlineGroupWork size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_845_1562)">
                    <path d="M11.0007 1.83325C5.94065 1.83325 1.83398 5.93992 1.83398 10.9999C1.83398 16.0599 5.94065 20.1666 11.0007 20.1666C16.0607 20.1666 20.1673 16.0599 20.1673 10.9999C20.1673 5.93992 16.0607 1.83325 11.0007 1.83325ZM11.0007 18.3333C6.95815 18.3333 3.66732 15.0424 3.66732 10.9999C3.66732 6.95742 6.95815 3.66659 11.0007 3.66659C15.0432 3.66659 18.334 6.95742 18.334 10.9999C18.334 15.0424 15.0432 18.3333 11.0007 18.3333Z" fill="white" />
                    <path d="M7.33333 14.6667C8.34586 14.6667 9.16667 13.8459 9.16667 12.8333C9.16667 11.8208 8.34586 11 7.33333 11C6.32081 11 5.5 11.8208 5.5 12.8333C5.5 13.8459 6.32081 14.6667 7.33333 14.6667Z" fill="white" />
                    <path d="M10.9993 9.16667C12.0119 9.16667 12.8327 8.34586 12.8327 7.33333C12.8327 6.32081 12.0119 5.5 10.9993 5.5C9.98683 5.5 9.16602 6.32081 9.16602 7.33333C9.16602 8.34586 9.98683 9.16667 10.9993 9.16667Z" fill="white" />
                    <path d="M14.6673 14.6667C15.6798 14.6667 16.5007 13.8459 16.5007 12.8333C16.5007 11.8208 15.6798 11 14.6673 11C13.6548 11 12.834 11.8208 12.834 12.8333C12.834 13.8459 13.6548 14.6667 14.6673 14.6667Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_845_1562">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/admin/realtors-reg'
    },
    {
        id: 9,
        name: 'Salary Log',
        icon: <MdOutlinePayments size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.416 12.8334V5.50008C17.416 4.49175 16.591 3.66675 15.5827 3.66675H2.74935C1.74102 3.66675 0.916016 4.49175 0.916016 5.50008V12.8334C0.916016 13.8417 1.74102 14.6667 2.74935 14.6667H15.5827C16.591 14.6667 17.416 13.8417 17.416 12.8334ZM15.5827 12.8334H2.74935V5.50008H15.5827V12.8334ZM9.16602 6.41675C7.64435 6.41675 6.41602 7.64508 6.41602 9.16675C6.41602 10.6884 7.64435 11.9167 9.16602 11.9167C10.6877 11.9167 11.916 10.6884 11.916 9.16675C11.916 7.64508 10.6877 6.41675 9.16602 6.41675ZM21.0827 6.41675V16.5001C21.0827 17.5084 20.2577 18.3334 19.2493 18.3334H3.66602V16.5001H19.2493V6.41675H21.0827Z" fill="white" />
            </svg>

        ),
        url: '/admin/salary-log'
    },
]


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
    const [sideBar, setSidebar] = useState(false);

    const showSideBar = () => {
        setSidebar(!sideBar)
    }
    const hideSideBar = () => {
        setSidebar(false)
    }
    const getPageTitle = () => {
        return pageTitles[pathname] || 'Overview'
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
                onChange={() => { }} // Empty onChange to suppress warnings
            />
            <div className="drawer-content">
                <div className="w-full flex justify-between items-center text-[#000000]/80 py-6 backdrop-blur-2xl">
                    <div className="flex items-center gap-2">
                        <div className="md:hidden block">
                            <FaBars onClick={showSideBar} size={24} className='p-2 size-[40px] border border-[#2F5318] rounded-[5px] text-[#2F5318] flex justify-center items-center' />
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
                                    <ul tabIndex={0} className="dropdown-content menu rounded-[10px] z-1 w-max py-2 shadow-sm bg-[#ffffff]">
                                        <li className='hover:bg-[#2F5318F6] hover:text-white rounded-[5px] border-b'>
                                            <Link href={'/'} className='flex items-center gap-2 text-base px-2'>
                                                <svg className='w-[24px] h-[20px] flex items-center' width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.4839 8.33324H15.4703C15.3324 8.33099 15.1992 8.29559 15.09 8.23224C14.9809 8.16889 14.9016 8.08092 14.8639 7.98125L12.8194 2.60718L11.571 5.109C11.525 5.20142 11.4427 5.2811 11.3349 5.33741C11.2271 5.39372 11.099 5.42398 10.9677 5.42415H8.3871V4.45446H10.5206L12.2994 0.890336C12.347 0.794773 12.4335 0.712939 12.5466 0.656486C12.6597 0.600034 12.7937 0.571842 12.9293 0.575925C13.065 0.580008 13.1955 0.616157 13.3023 0.679226C13.409 0.742294 13.4866 0.829066 13.5239 0.927184L15.531 6.20815L16.8077 3.33155C16.8505 3.23504 16.9326 3.15109 17.0424 3.09157C17.1521 3.03205 17.284 2.99999 17.4194 2.99991H20V3.96961H17.8839L16.0955 8.00161C16.0527 8.09811 15.9706 8.18207 15.8609 8.24158C15.7511 8.3011 15.6192 8.33317 15.4839 8.33324ZM9.03226 11.7272H7.74194V8.33324C7.74142 7.94759 7.53734 7.57785 7.17448 7.30515C6.81162 7.03245 6.31962 6.87908 5.80645 6.8787H3.22581C2.71264 6.87908 2.22064 7.03245 1.85778 7.30515C1.49492 7.57785 1.29083 7.94759 1.29032 8.33324V11.7272H0V8.33324C0.00102442 7.69053 0.341214 7.07436 0.945948 6.6199C1.55068 6.16543 2.37058 5.90977 3.22581 5.909H5.80645C6.66167 5.90977 7.48158 6.16543 8.08631 6.6199C8.69104 7.07436 9.03123 7.69053 9.03226 8.33324V11.7272ZM4.51613 1.06052C4.89893 1.06052 5.27314 1.14583 5.59143 1.30565C5.90971 1.46548 6.15779 1.69265 6.30428 1.95843C6.45078 2.22422 6.4891 2.51668 6.41442 2.79883C6.33974 3.08098 6.15541 3.34016 5.88472 3.54358C5.61404 3.747 5.26917 3.88554 4.89372 3.94166C4.51828 3.99778 4.12911 3.96898 3.77545 3.85889C3.42179 3.7488 3.11951 3.56236 2.90683 3.32317C2.69416 3.08397 2.58065 2.80274 2.58065 2.51506C2.58065 2.12929 2.78456 1.75932 3.14754 1.48654C3.51051 1.21376 4.00281 1.06052 4.51613 1.06052ZM4.51613 0.0908203C3.87812 0.0908203 3.25445 0.233 2.72397 0.499379C2.19349 0.765758 1.78003 1.14437 1.53587 1.58735C1.29172 2.03032 1.22784 2.51775 1.35231 2.98801C1.47677 3.45827 1.784 3.89022 2.23514 4.22926C2.68628 4.5683 3.26106 4.79918 3.88681 4.89272C4.51255 4.98626 5.16115 4.93826 5.75059 4.75477C6.34003 4.57129 6.84383 4.26056 7.19829 3.8619C7.55274 3.46324 7.74194 2.99453 7.74194 2.51506C7.74194 1.87211 7.40207 1.2555 6.79712 0.800865C6.19216 0.346231 5.37167 0.0908203 4.51613 0.0908203Z" fill="black" fillOpacity="0.8" />
                                                </svg>
                                                <span>Activities</span>
                                            </Link>
                                        </li>
                                        <li className='hover:bg-[#2F5318F6] hover:text-white rounded-[5px]'>
                                            <Link href={'/'} className='flex items-center gap-2 text-base px-2'>
                                                <svg className='w-[24px] h-[20px] flex items-center' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.75 4L9.6925 5.0575L10.8775 6.25H4.75V7.75H10.8775L9.6925 8.935L10.75 10L13.75 7L10.75 4ZM1.75 1.75H7V0.25H1.75C0.925 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.925 13.75 1.75 13.75H7V12.25H1.75V1.75Z" fill="black" fillOpacity="0.8" />
                                                </svg>
                                                <span>Logout</span>
                                            </Link>
                                        </li>
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
                        <div className="w-[300px] h-screen flex flex-col justify-between bg-[#2F5318] text-white py-5 sticky top-0 left-0">
                            <div className="absolute top-0 right-0 text-white size-[50px] flex items-center justify-center" onClick={hideSideBar}><FaXmark size={24} /></div>
                            <div className="flex items-center gap-3 px-[30px] p-5 pb-10">
                                <Image src='/images/logo-icon.png' width={78} height={78} alt='logo' className='size-[78px]' />
                                <div className="flex flex-col gap-0 text-white">
                                    <h2 className='font-bold text-[32px] leading-9'>PINELEAF</h2>
                                    <h3 className='font-normal text-2xl leading-6'>ESTATE</h3>
                                </div>
                            </div>
                            <ul className='flex flex-col gap-1 h-full overflow-y-auto px-[30px] py-2'>
                                {contents.map(content => (
                                    <li key={content.id}>
                                        <Link
                                            href={content.url}
                                            className={`w-full rounded-[10px] px-5 h-[50px] flex items-center gap-3 font-medium text-xl ${isActive(content.url)
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

        </div >
    )
}

export default Header
