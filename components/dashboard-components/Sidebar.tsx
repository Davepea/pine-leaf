'use client' // Add this at the top to make it a Client Component

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FiUpload } from 'react-icons/fi'
import { LiaHomeSolid } from 'react-icons/lia'
import { MdLogout, MdOutlineAccountBalanceWallet, MdOutlineAllInbox, MdOutlineConnectWithoutContact, MdOutlineDashboard, MdOutlineGroupWork, MdOutlinePayments, MdOutlinePeopleAlt } from 'react-icons/md'

const contents = [
    {
        id: 1,
        name: 'Dashboard',
        icon: <MdOutlineDashboard size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_815_849)">
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
                <g clip-path="url(#clip0_815_854)">
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
        name: 'Users',
        icon: <MdOutlinePeopleAlt size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_839_1100)">
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
        url: '/users'
    },
    {
        id: 4,
        name: 'Transactions',
        icon: <MdOutlineAccountBalanceWallet size={20} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_839_1111)">
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
        id: 5,
        name: 'Upload',
        icon: <FiUpload size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_815_876)">
                    <path d="M16.4993 13.7501V16.5001H5.49935V13.7501H3.66602V16.5001C3.66602 17.5084 4.49102 18.3334 5.49935 18.3334H16.4993C17.5077 18.3334 18.3327 17.5084 18.3327 16.5001V13.7501H16.4993ZM6.41602 8.25008L7.70852 9.54258L10.0827 7.17758V14.6667H11.916V7.17758L14.2902 9.54258L15.5827 8.25008L10.9993 3.66675L6.41602 8.25008Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_876">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/upload'
    },
    {
        id: 6,
        name: 'Proofs',
        icon: <MdOutlineAllInbox size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_815_883)">
                    <path d="M17.4167 2.75H4.58333C3.575 2.75 2.75 3.575 2.75 4.58333V11C2.75 12.0083 3.575 12.8333 4.58333 12.8333H17.4167C18.425 12.8333 19.25 12.0083 19.25 11V4.58333C19.25 3.575 18.425 2.75 17.4167 2.75ZM4.58333 9.16667H7.4525C7.645 9.88167 8.06667 10.5142 8.61667 11H4.58333V9.16667ZM17.4167 11H13.3833C13.9333 10.5142 14.355 9.88167 14.5475 9.16667H17.4167V11ZM17.4167 7.33333H12.8333V8.25C12.8333 9.23083 11.9808 10.0833 11 10.0833C10.0192 10.0833 9.16667 9.23083 9.16667 8.25V7.33333H4.58333V4.58333H17.4167V7.33333ZM15.5833 13.75H12.8333V14.6667C12.8333 15.0975 12.6592 15.4917 12.3933 15.8125C12.0542 16.225 11.55 16.5 11 16.5C10.45 16.5 9.94583 16.225 9.60667 15.8125C9.34083 15.4917 9.16667 15.0975 9.16667 14.6667V13.75H2.75V17.4167C2.75 18.425 3.575 19.25 4.58333 19.25H17.4167C18.425 19.25 19.25 18.425 19.25 17.4167V13.75H15.5833ZM4.58333 15.5833H7.4525C7.47083 15.6658 7.5075 15.7392 7.535 15.8125C7.755 16.4358 8.13083 16.9858 8.61667 17.4167H4.58333V15.5833ZM17.4167 17.4167H13.3833C13.8783 16.9858 14.2542 16.4358 14.465 15.8125C14.4925 15.7392 14.5292 15.6658 14.5475 15.5833H17.4167V17.4167Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_815_883">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/proofs'
    },
    {
        id: 7,
        name: 'Referral Earnings',
        icon: <MdOutlineConnectWithoutContact size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_845_1585)">
                    <path d="M10.084 12.8333H8.25065C8.25065 8.27742 11.9448 4.58325 16.5007 4.58325V6.41659C12.9532 6.41659 10.084 9.28575 10.084 12.8333ZM16.5007 10.0833V8.24992C13.9707 8.24992 11.9173 10.3033 11.9173 12.8333H13.7507C13.7507 11.3116 14.979 10.0833 16.5007 10.0833ZM6.41732 3.66659C6.41732 2.64909 5.60148 1.83325 4.58398 1.83325C3.56648 1.83325 2.75065 2.64909 2.75065 3.66659C2.75065 4.68409 3.56648 5.49992 4.58398 5.49992C5.60148 5.49992 6.41732 4.68409 6.41732 3.66659ZM10.4965 4.12492H8.66315C8.44315 5.42659 7.32482 6.41659 5.95898 6.41659H3.20898C2.44815 6.41659 1.83398 7.03075 1.83398 7.79159V10.0833H7.33398V8.01159C9.03898 7.47075 10.3132 5.96742 10.4965 4.12492ZM17.4173 15.5833C18.4348 15.5833 19.2507 14.7674 19.2507 13.7499C19.2507 12.7324 18.4348 11.9166 17.4173 11.9166C16.3998 11.9166 15.584 12.7324 15.584 13.7499C15.584 14.7674 16.3998 15.5833 17.4173 15.5833ZM18.7923 16.4999H16.0423C14.6765 16.4999 13.5582 15.5099 13.3382 14.2083H11.5048C11.6882 16.0508 12.9623 17.5541 14.6673 18.0949V20.1666H20.1673V17.8749C20.1673 17.1141 19.5532 16.4999 18.7923 16.4999Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_845_1585">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
        url: '/referral-earnings'
    },
    {
        id: 8,
        name: 'Realtors Reg',
        icon: <MdOutlineGroupWork size={22} />,
        svg: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_845_1562)">
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
        url: '/realtors-reg'
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
        url: '/salary-log'
    },
]

const Sidebar = () => {
    const pathname = usePathname()

    // Function to check if a link is active
    const isActive = (path: string) => {
        return pathname.startsWith(path)
    }

    return (
        <div className='md:block hidden'>
            <div className="w-[300px] h-screen flex flex-col justify-between bg-[#2F5318] text-white p-[30px]">
                <div className="flex items-center gap-3">
                    <Image src='/images/logo-icon.png' width={78} height={78} alt='logo' className='size-[78px]' />
                    <div className="flex flex-col gap-0 text-white">
                        <h2 className='font-bold text-[32px] leading-9'>PINELEAF</h2>
                        <h3 className='font-normal text-2xl leading-6'>ESTATE</h3>
                    </div>
                </div>
                <ul className='flex flex-col gap-[10px]'>
                    {contents.map(content => (
                        <li key={content.id}>
                            <Link
                                href={content.url}
                                className={`w-full rounded-[10px] px-5 h-[50px] flex items-center gap-3 font-medium text-xl ${isActive(content.url)
                                    ? 'bg-white text-[#2F5318]'
                                    : 'text-white hover:bg-white hover:text-[#2F5318] hover:bg-opacity-10'
                                    }`}
                            >
                                <span className='size-[22px] flex items-center justify-center'>{content.icon}</span>
                                {content.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link
                    href={'/'}
                    className='w-full rounded-[10px] px-5 h-[50px] flex items-center gap-3 text-white font-medium text-xl hover:bg-white hover:text-[#2F5318] hover:bg-opacity-10'
                >
                    <span className='size-[22px] flex items-center justify-center'><MdLogout size={22} /></span>
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Sidebar