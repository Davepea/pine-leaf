'use client'

import Header from '@/components/admin/Header'
import PropertiesTable from '@/components/admin/table/PropertiesTable'
import React, { useEffect, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import axios from 'axios'
import { getToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface Property {
    id: number
    name: string
    estate_name: string
    location: string
    type: string
    purpose: string
    price: string
    total_units: number
    unit_sold: number
    created_at: string
}

const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [stateFilter, setStateFilter] = useState('All states')
    const [dateFilter, setDateFilter] = useState('Any date')
    const router = useRouter()

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
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

                setProperties(response.data.data.data)
            } catch (err) {
                console.error('Error fetching properties:', err)
                setError('Failed to load properties')
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [router])

    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesState = stateFilter === 'All states' ||
            property.location.includes(stateFilter)

        const matchesDate = dateFilter === 'Any date' ||
            property.created_at.includes(dateFilter)

        return matchesSearch && matchesState && matchesDate
    })

    if (loading) {
        return (
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll flex flex-col gap-5">
                <Header />
                <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                    <div className="h-96 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll flex flex-col gap-5">
                <Header />
                <div className="bg-white rounded-[10px] p-4 text-center text-red-500">
                    {error}
                    <button
                        onClick={() => window.location.reload()}
                        className='mt-2 px-4 py-2 bg-[#2F5318] text-white rounded hover:bg-[#1e3a0f]'
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll flex flex-col gap-5">
                <Header />
                <div className="flex flex-wrap gap-[22px] items-center">
                    <form className='h-[50px] max-w-[386px] w-full'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder='Search property'
                                className='h-[45px] w-full outline-none border-none placeholder:text-[#000000]/80'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch size={22} />
                        </label>
                    </form>
                    <div className="flex items-center gap-[22px] md:w-fit w-full">
                        <select
                            name="state"
                            id="state"
                            className='max-w-[229px] w-full h-[50px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option>All states</option>
                            <option>Enugu</option>
                            <option>Lagos</option>
                            <option>Abuja</option>
                        </select>
                        <select
                            name="date"
                            id="date"
                            className='max-w-[178px] w-full h-[50px] rounded-[10px] bg-transparent outline-none border border-[#2F5318]/20 text-[#000000]/80 px-5'
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            <option>Any date</option>
                            <option>This week</option>
                            <option>This month</option>
                            <option>This year</option>
                        </select>
                    </div>
                </div>
                <div className="py-5 flex flex-col gap-5">
                    <PropertiesTable properties={filteredProperties} />
                </div>
            </div>
        </div>
    )
}

export default PropertiesPage