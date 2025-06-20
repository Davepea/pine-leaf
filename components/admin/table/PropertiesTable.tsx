'use client'

import Link from 'next/link'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Property {
    id: string
    name: string
    estate_name: string
    location: string
    total_units: number
    unit_sold: number
    price: string
    created_at: string
    // Add other properties you need
}

interface PropertyTableProps {
    searchTerm?: string;
}
const PropertiesTable = ({ searchTerm = '' }: PropertyTableProps) => {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = properties.filter(property => {
                const searchLower = searchTerm.toLowerCase();
                const name = property.name?.toLowerCase() || '';
                const estateName = property.estate_name?.toLowerCase() || '';
                const location = property.location?.toLowerCase() || '';
                const totalUnits = property.total_units.toString();
                const unitsSold = property.unit_sold.toString();
                const price = property.price?.toLowerCase() || '';
                const date = property.created_at?.toLowerCase() || '';

                return (
                    name.includes(searchLower) ||
                    estateName.includes(searchLower) ||
                    location.includes(searchLower) ||
                    totalUnits.includes(searchLower) ||
                    unitsSold.includes(searchLower) ||
                    price.includes(searchLower) ||
                    date.includes(searchLower)
                );
            });
            setFilteredProperties(filtered);
        } else {
            setFilteredProperties(properties);
        }
    }, [searchTerm, properties]);

    const handleDeleteProperty = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) {
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.delete(
                `https://pineleaflaravel.sunmence.com.ng/public/api/properties/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (response.data.success) {
                setProperties(prevProperties => prevProperties.filter(property => property.id !== id));
                toast.success('Property deleted successfully!');
            } else {
                // throw new Error(response.data.message || 'Failed to delete property');
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            toast.error(
                'Failed to delete property'
            );

            if (err.response?.status === 401) {
                router.push('/login');
            }
        }
    };
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
                        },
                        params: {
                            page: currentPage
                        }
                    }
                )

                setProperties(response.data.data.data)
                setTotalPages(response.data.data.last_page)
            } catch (err) {
                console.error('Error fetching properties:', err)
                setError('Failed to load properties')
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [currentPage, router])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) {
        return (
            <div className='bg-white rounded-[10px] py-6'>
                <div className="w-full">
                    <div className="overflow-x-auto w-full mytable">
                        <table className="table">
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td><div className="h-4 bg-gray-200 rounded w-4"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                        <td><div className="h-8 bg-gray-200 rounded w-20"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                                        <td><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg-white rounded-[10px] p-6 text-center text-red-500'>
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
        <div className='bg-white rounded-[10px] py-6'>
            <div className="w-full">
                <div className="overflow-x-auto w-full mytable">
                    <table className="table">
                        <thead className='text-sm text-[#000000]/80 font-medium'>
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
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredProperties.map((property) => {
                                const isAvailable = property.total_units > property.unit_sold
                                const promoStatus = property.created_at.includes('2025') ? 'Jan 2025' : 'No'

                                return (
                                    <tr key={property.id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                            </label>
                                        </th>
                                        <td>{property.name || property.estate_name}</td>
                                        <td>{property.location}</td>
                                        <td>{property.total_units}</td>
                                        <td>₦{parseFloat(property.price).toLocaleString()}</td>
                                        <td>
                                            <button className={`border h-[35px] px-[18px] rounded-[10px] ${isAvailable
                                                ? 'border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80'
                                                : 'border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20'
                                                }`}>
                                                {isAvailable ? 'Available' : 'Sold out'}
                                            </button>
                                        </td>
                                        <td className='text-[#2F5318] font-bold'>{promoStatus}</td>
                                        <td>
                                            <div className="flex items-center md:gap-4 gap-2 text-[#2F5318]">
                                                <Link href={`/admin/properties/view/${property.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <Link href={`/admin/properties/view/${property.id}`}><MdOutlineModeEditOutline size={20} /></Link>
                                                <button
                                                    onClick={() => handleDeleteProperty(property.id)}
                                                    className="border-none bg-transparent"
                                                >
                                                    <MdDeleteOutline size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="join mt-5 w-full justify-center">
                    <button
                        className="size-[35px] flex items-center justify-center text-black/80 disabled:text-black/30"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <MdArrowBackIos size={16} />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                            <button
                                key={page}
                                className={`join-item btn items-end border-none shadow shadow-white text-lg font-normal rounded-[10px] size-[35px] ${currentPage === page
                                    ? 'bg-[#2F5318] text-white'
                                    : 'bg-transparent text-black/80 hover:bg-gray-100'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        )
                    })}

                    {totalPages > 5 && (
                        <button className="join-item btn btn-disabled items-end bg-transparent border-none shadow shadow-white text-lg font-normal text-black/80 rounded-[10px] size-[35px]">
                            ...
                        </button>
                    )}

                    <button
                        className="size-[35px] flex items-center justify-center text-black/80 disabled:text-black/30"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <MdArrowForwardIos size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PropertiesTable