'use client'

import React, { useEffect, useState } from 'react'
import { MdOutlineAllInbox, MdOutlineAssessment, MdOutlineCached, MdOutlineWarehouse } from 'react-icons/md'
import axios from 'axios'
import { getToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface Property {
    id: number
    total_units: number
    unit_sold: number
    price: string
}

const BalanceCard = () => {
    const router = useRouter()
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalUnits: 0,
        unitsSold: 0,
        totalValueSold: 0,
        pendingUnits: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/properties',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )

                const properties: Property[] = response.data.data.data

                // Calculate statistics
                const calculatedStats = properties.reduce((acc, property) => {
                    const price = parseFloat(property.price) || 0
                    return {
                        totalProperties: acc.totalProperties + 1,
                        totalUnits: acc.totalUnits + property.total_units,
                        unitsSold: acc.unitsSold + property.unit_sold,
                        totalValueSold: acc.totalValueSold + (price * property.unit_sold),
                        pendingUnits: acc.pendingUnits + (property.total_units - property.unit_sold)
                    }
                }, {
                    totalProperties: 0,
                    totalUnits: 0,
                    unitsSold: 0,
                    totalValueSold: 0,
                    pendingUnits: 0
                })

                setStats(calculatedStats)
            } catch (err) {
                console.error('Error fetching properties:', err)
                setError('Failed to load property data')
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [router])

    // Calculate commission (assuming 10% commission rate)
    const commissionRate = 0.1
    const totalCommissionPaid = stats.totalValueSold * commissionRate
    // For pending commission, we'll assume same rate on pending units' average price
    // const averagePrice = stats.totalValueSold / (stats.unitsSold || 1)
    // const pendingCommission = stats.pendingUnits * averagePrice * commissionRate

    const balance = [
        {
            id: 1,
            title: 'Total Properties',
            icon: <MdOutlineWarehouse size={18} />,
            amount: stats.totalProperties.toLocaleString(),
            color: '#2F5318',
        },
        {
            id: 2,
            title: 'Total Units Sold',
            icon: <MdOutlineAllInbox size={18} />,
            amount: stats.unitsSold.toLocaleString(),
            color: '#FBBF00',
        },
        {
            id: 3,
            title: 'Total Value Sold',
            icon: <MdOutlineAssessment size={18} />,
            amount: `₦${stats.totalValueSold.toLocaleString()}`,
            color: '#2F5318',
        },
        {
            id: 4,
            title: 'Total Commission',
            icon: <MdOutlineCached size={18} />,
            amount: `₦${totalCommissionPaid.toLocaleString()}`,
            color: '#CD2B2E',
        },
    ]

    if (loading) {
        return (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {Array(4).fill(0).map((_, i) => (
                    <div key={i} className='w-full flex flex-col gap-4 md:p-4 px-3 py-4 bg-white rounded-[10px] animate-pulse'>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg-white rounded-[10px] p-4 text-center text-red-500'>
                {error}
                <button
                    onClick={() => window.location.reload()}
                    className='mt-2 px-4 py-2 bg-[#2F5318] text-white rounded hover:bg-[#1e3a0f]'
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {balance.map(bal => (
                <div key={bal.id} className='w-full flex flex-col gap-4 md:p-4 px-3 py-4 bg-white rounded-[10px]'>
                    <div className="w-full flex justify-between items-center">
                        <small className='md:text-base text-xs font-normal text-[#000000]/80'>{bal.title}</small>
                        <span
                            className={`md:size-[30px] size-[15px] flex items-center justify-center rounded-full`}
                            style={{
                                backgroundColor: `${bal.color}20`,
                                color: bal.color
                            }}
                        >
                            {bal.icon}
                        </span>
                    </div>
                    <h2 className='text-[#2F5318] font-bold md:text-[32px] text-xl'>{bal.amount}</h2>
                </div>
            ))}
        </div>
    )
}

export default BalanceCard