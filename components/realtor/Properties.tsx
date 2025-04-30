'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'

const properties = [
    {
        id: 1,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 2,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 3,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 4,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 5,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 6,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 7,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 8,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'best land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
    {
        id: 9,
        name: 'Platinum Estate Awka',
        image: '/images/property.jpg',
        price: '3,000,000',
        location: 'Umuawulu Awka South',
        attribute: 'new land',
        paymentType: [
            {
                type: 'installment',
                paymentNo: 1,
                totalNo: 3,
                duration: '3 months',
                status: 'Ongoing'
            }
        ]
    },
]

interface PropertiesProps {
    isAllPropertiesPage?: boolean;
    maxItems?: number;
}

const Properties = ({ isAllPropertiesPage = false, maxItems = 6 }: PropertiesProps) => {
    const [seeMore, setSeeMore] = useState(false)

    const handleSeeMore = () => {
        setSeeMore(true);
    }
    const handleSeeLess = () => {
        setSeeMore(false);
    }

    // const otherDetails = 

    // Determine how many properties to show
    const propertiesToShow = isAllPropertiesPage
        ? properties
        : seeMore
            ? properties
            : properties.slice(0, maxItems)

    return (
        <div className='flex flex-col gap-10 bg-white rounded-[10px] p-[30px] pb-[52px]'>
            <div className="grid grid-cols-3 gap-[54px]">
                {propertiesToShow.map((property) => (
                    <div key={property.id} className="flex flex-col bg-white border border-[#2F5318]/20 rounded-[10px]">
                        <Image src={property.image} width={298} height={233} objectFit='cover' className='rounded-t-[10px] w-full h-[233px] object-cover' alt='property' />
                        <div className="py-[14px] px-[10px] flex flex-col gap-[7px]">
                            <div className="flex items-center gap-1">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1263_396)">
                                        <path d="M7.0013 1.1665C4.7438 1.1665 2.91797 2.99234 2.91797 5.24984C2.91797 8.31234 7.0013 12.8332 7.0013 12.8332C7.0013 12.8332 11.0846 8.31234 11.0846 5.24984C11.0846 2.99234 9.2588 1.1665 7.0013 1.1665ZM4.08464 5.24984C4.08464 3.63984 5.3913 2.33317 7.0013 2.33317C8.6113 2.33317 9.91797 3.63984 9.91797 5.24984C9.91797 6.92984 8.23797 9.444 7.0013 11.0132C5.78797 9.45567 4.08464 6.91234 4.08464 5.24984Z" fill="#2F5318" />
                                        <path d="M7.0013 6.70817C7.80672 6.70817 8.45964 6.05525 8.45964 5.24984C8.45964 4.44442 7.80672 3.7915 7.0013 3.7915C6.19589 3.7915 5.54297 4.44442 5.54297 5.24984C5.54297 6.05525 6.19589 6.70817 7.0013 6.70817Z" fill="#2F5318" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1263_396)">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className='text-[#000000]/80 text-sm font-normal'>{property.location}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#000000]/80 font-bold text-sm">
                                <h3>{property.name}</h3>
                                <h3>N{property.price}</h3>
                            </div>
                            <div className="border-b border-[#2F5318]/20 pb-2 grid grid-cols-2 gap-2 text-sm text-black/80">
                                <span>No of Payment: {property.paymentType.paymentNo}/{property.paymentType.totalNo}</span>
                                <span>Duration: {property.paymentType.duration}</span>
                                <span>Duration: {property.paymentType.status}</span>
                            </div>
                            <div className="border-y border-[#2F5318]/20 py-1 mt-[2px]">
                                <div className="flex items-center text-[#000000]/80 text-[13px] font-normal">
                                    <span className='translate-0'>464SQM</span>
                                    <div className="vr h-[20px] mx-[2px] w-[1px] bg-[#000000]/20"></div>
                                    <span className='translate-0'>100% Dry Land</span>
                                    <div className="vr h-[20px] mx-[2px] w-[1px] bg-[#000000]/20"></div>
                                    <span className='translate-0'>Instant Location</span>
                                    <div className="vr h-[20px] mx-[2px] w-[1px] bg-[#000000]/20"></div>
                                    <span className='translate-0'>Buy & Build</span>
                                </div>
                            </div>
                            <Link href={'/'} className='flex gap-1 items-center w-max mx-auto text-[#2F5318] text-sm font-bold mt-2'>More Details <MdOutlineArrowOutward size={12} /></Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Only show See More/Less buttons if not on all properties page */}
            {!isAllPropertiesPage && (
                <>
                    {!seeMore && properties.length > maxItems && (
                        <button onClick={handleSeeMore} className='flex gap-1 items-center w-max mx-auto text-[#2F5318] text-base font-bold'>
                            See more <MdOutlineArrowOutward size={12} />
                        </button>
                    )}
                    {seeMore && (
                        <button onClick={handleSeeLess} className='flex gap-1 items-center w-max mx-auto text-[#2F5318] text-base font-bold'>
                            See less <MdOutlineArrowOutward className='rotate-90' size={12} />
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default Properties