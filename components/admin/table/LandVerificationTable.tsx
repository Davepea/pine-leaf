// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { toast } from 'sonner'

export interface LandVerification {
    id: number,
    name: string,
    email: string,
    document_path: string,
}

interface LandVerificationTableProps {
    searchTerm?: string;
}
const LandVerificationTable = ({ searchTerm = '' }: LandVerificationTableProps) => {
    const [allLandVerification, setAllLandVerification] = useState<LandVerification[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredLandVerification, setFilteredLandVerification] = useState<LandVerification[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allLandVerification.filter(inspect => {
                const searchLower = searchTerm.toLowerCase();
                const name = inspect.name?.toLowerCase() || '';
                const email = inspect.email?.toLowerCase();

                return (
                    name.includes(searchLower) ||
                    email.includes(searchLower)
                );
            });
            setFilteredLandVerification(filtered);
        } else {
            setFilteredLandVerification(allLandVerification);
        }
    }, [searchTerm, allLandVerification]);

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/allland',
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
                if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
                    setAllLandVerification(response.data.data.data)
                    setTotalPages(response.data.data.last_page)
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
        fetchVerification()
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
                                <th>Email</th>
                                <th>Document</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredLandVerification.length > 0 ? (
                                filteredLandVerification.map((land) => {
                                    return (
                                        <tr key={land.id}>
                                            <td>{land.id}</td>
                                            <td>{land.name}</td>
                                            <td>{land.email}</td>
                                            <td>
                                                <Image
                                                    src={land.document_path.startsWith('/storage') ?
                                                        `https://pineleaflaravel.sunmence.com.ng/public${land.document_path}` :
                                                        land.document_path}
                                                    alt="Property flyer"
                                                    width={100}
                                                    height={100}
                                                    className='object-cover size-[100px]'
                                                />
                                            </td>
                                        </tr>
                                    )
                                })) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        No land found
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

export default LandVerificationTable
