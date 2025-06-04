// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { toast } from 'sonner'

export interface Inspection {
    id: string,
    fullname: string,
    email: string,
    phone: string,
    property_id: string,
    inspection_date: string,
    inspection_time: string,
    notes: string,
    no_attendees: string,
    status: string,
    created_at: string,
    updated_at: string,
}

interface InspectionTableProps {
    searchTerm?: string;
}
const InspectionTable = ({ searchTerm = '' }: InspectionTableProps) => {
    const [allInspection, setAllInspection] = useState<Inspection[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredInspection, setFilteredInspection] = useState<Inspection[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allInspection.filter(inspect => {
                const searchLower = searchTerm.toLowerCase();
                const fullname = inspect.fullname?.toLowerCase() || '';
                const property_id = inspect.property_id?.toLowerCase() || '';
                const phone = inspect.phone?.toLowerCase() || '';
                const inspection_date = inspect.inspection_date?.toLowerCase() || '';
                const inspection_time = inspect.inspection_time?.toLowerCase() || '';
                const notes = inspect.notes?.toLowerCase() || '';
                const no_attendees = inspect.no_attendees?.toLowerCase() || '';
                const status = inspect.status?.toLowerCase() || '';
                const date = inspect.created_at?.toLowerCase();

                return (
                    fullname.includes(searchLower) ||
                    property_id.includes(searchLower) ||
                    inspection_date.includes(searchLower) ||
                    inspection_time.includes(searchLower) ||
                    notes.includes(searchLower) ||
                    no_attendees.includes(searchLower) ||
                    status.includes(searchLower) ||
                    phone.includes(searchLower) ||
                    date.includes(searchLower)
                );
            });
            setFilteredInspection(filtered);
        } else {
            setFilteredInspection(allInspection);
        }
    }, [searchTerm, allInspection]);

    useEffect(() => {
        const fetchInspection = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/inspections',
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
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setAllInspection(response.data.data)
                    setTotalPages(response.data.last_page)
                    // console.log(response.data.data.data);
                } else {
                    throw new Error('Invalid data structure received from API')
                }
            }
            catch (err) {
                console.error('Error fetching properties:', err)
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        router.push('/login');
                        toast.error('Session expired. Please login again.');
                    } else if (err.response?.data?.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('Failed to delete testimonial. Please try again.');
                    }
                } else if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('An unexpected error occurred');
                }
            } finally {
                setLoading(false)
            }
        }
        fetchInspection()
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
                                {[...Array(4)].map((_, i) => (
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
    return (
        <div className='bg-white rounded-[10px] py-6 w-full'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone <br />Number</th>
                                <th>Preferred <br />Property</th>
                                <th>Preferred <br />Date</th>
                                <th>Preferred <br />Time Slot</th>
                                <th>Additional <br />Notes</th>
                                <th>Numbers of <br />People Attending</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredInspection.length > 0 ? (
                                filteredInspection.map((inspection) => {
                                    const propertyType = inspection.property_id == "1"
                                    return (
                                        <tr key={inspection.id}>
                                            <td>{inspection.id || "----------"}</td>
                                            <td>{inspection.fullname || "----------"}</td>
                                            <td>{inspection.phone || "----------"}</td>
                                            <td>{propertyType ? "Land" : "House"}</td>
                                            <td>{inspection.inspection_date || "----------"}</td>
                                            <td>{inspection.inspection_time || "----------"}</td>
                                            <td>{inspection.notes || "----------"}</td>
                                            <td>{inspection.no_attendees || "----------"}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-4">
                                        No inspection users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="join mt-5 w-full justify-center">
                        <button
                            className="size-[35px] flex items-center justify-center text-black/80 disabled:text-black/30"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            <MdArrowBackIos size={16} />
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
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
                            );
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
                )}
            </div>
        </div>
    )
}

export default InspectionTable
