// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline } from 'react-icons/md'
import { toast } from 'sonner'

export interface Subscriber {
    id: string,
    email: string,
    created_at: string,
}

interface SubscriberTableProps {
    searchTerm?: string;
}
const NewsSubscriberTable = ({ searchTerm = '' }: SubscriberTableProps) => {
    const [allSubscriber, setAllSubscriber] = useState<Subscriber[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredSubscriber, setFilteredSubscriber] = useState<Subscriber[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allSubscriber.filter(subscriber => {
                const searchLower = searchTerm.toLowerCase();
                const email = subscriber.email.toLowerCase();
                const date = subscriber.created_at.toLowerCase() || '';

                return (
                    email.includes(searchLower) ||
                    date.includes(searchLower)
                );
            });
            setFilteredSubscriber(filtered);
        } else {
            setFilteredSubscriber(allSubscriber);
        }
    }, [searchTerm, allSubscriber]);

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm('Are you sure you want to delete this subscriber?')) {
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.delete<{
                success: boolean;
                message: string;
            }>(
                `https://pineleaflaravel.sunmence.com.ng/public/api/subscribers/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (response.data.success) {
                setAllSubscriber(prevSubscriber =>
                    prevSubscriber.filter(subscriber => subscriber.id !== id)
                );
                toast.success(response.data.message || 'subscriber deleted successfully');
            } else {
                throw new Error(response.data.message || 'Failed to delete subscriber');
            }
        } catch (err: unknown) {
            console.error('Delete error:', err);

            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    router.push('/login');
                    toast.error('Session expired. Please login again.');
                } else if (err.response?.data?.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error('Failed to delete subscriber. Please try again.');
                }
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    useEffect(() => {
        const fetchSubscriber = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/subscribers',
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
                if (response.data?.data && Array.isArray(response.data.data.data)) {
                    setAllSubscriber(response.data.data.data)
                    setTotalPages(response.data.data.last_page)
                    // console.log(response.data.data.data);
                } else {
                    throw new Error('Invalid data structure received from API')
                }
            }
            catch (err) {
                console.error('Error fetching properties:', err)
                if (err.response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setLoading(false)
            }
        }
        fetchSubscriber()
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

    return (
        <div className='bg-white rounded-[10px] py-6 w-full'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredSubscriber.map((subscriber) => {
                                return (
                                    <tr key={subscriber.id}>
                                        <td>{subscriber.id}</td>
                                        <td>{subscriber.email}</td>
                                        <td>{subscriber.created_at.split('.')[0]}</td>
                                        <td>
                                            <div className="flex items-center md:gap-4 gap-2 text-[#2F5318]">
                                                {/* <Link href={`/news-subscribers/edit/${subscriber.id}`}><MdOutlineModeEditOutline size={20} /></Link> */}
                                                <button
                                                    onClick={() => handleDeleteTestimonial(subscriber.id)}
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

export default NewsSubscriberTable
