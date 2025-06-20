// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Image from 'next/image'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline } from 'react-icons/md'
import { toast } from 'sonner'

export interface Testimonial {
    id: string,
    name: string,
    rating: string,
    message: string,
    image: string,
}

interface TestimonialTableProps {
    searchTerm?: string;
}

const TestimonialTable = ({ searchTerm = '' }: TestimonialTableProps) => {
    const [allTestimonial, setAllTestimonial] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredTestimonial, setFilteredTestimonial] = useState<Testimonial[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allTestimonial.filter(testimonial => {
                const searchLower = searchTerm.toLowerCase();
                const name = testimonial.name.toLowerCase();
                const rating = testimonial.rating.toLowerCase() || '';
                const message = testimonial.message.toLowerCase() || '';

                return (
                    name.includes(searchLower) ||
                    rating.includes(searchLower) ||
                    message.includes(searchLower)
                );
            });
            setFilteredTestimonial(filtered);
        } else {
            setFilteredTestimonial(allTestimonial);
        }
    }, [searchTerm, allTestimonial]);

    const handleDeleteTestimonial = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) {
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
                `https://pineleaflaravel.sunmence.com.ng/public/api/testimonials/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (response.data.success) {
                setAllTestimonial(prevTestimonials =>
                    prevTestimonials.filter(testimonial => testimonial.id !== id)
                );
                toast.success(response.data.message || 'Testimonial deleted successfully');
            } else {
                throw new Error(response.data.message || 'Failed to delete testimonial');
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
                    toast.error('Failed to delete testimonial. Please try again.');
                }
            } else if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/testimonials',
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
                    setAllTestimonial(response.data.data.data)
                    setTotalPages(response.data.data.last_page)
                    // console.log(response.data.data.data);
                } else {
                    throw new Error('Invalid data structure received from API')
                }
            }
            catch (err) {
                console.error('Error fetching properties:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTestimonial()
    }, [currentPage, router])
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const renderStars = (rating: string) => {
        const numRating = parseInt(rating)
        return '★'.repeat(numRating) + '☆'.repeat(5 - numRating)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
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
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredTestimonial.map((testimonial) => {
                                return (
                                    <tr key={testimonial.id}>
                                        <td>{testimonial.id}</td>
                                        <td>{testimonial.name}</td>
                                        <td>
                                            <div className="flex items-center">
                                                <span className="text-[#2F5318] mr-1">
                                                    {renderStars(testimonial.rating)}
                                                </span>
                                                ({testimonial.rating})
                                            </div>
                                        </td>
                                        <td>{testimonial.message}</td>
                                        <td className='text-[#2F5318] font-bold'>
                                            <Image src={`https://pineleaflaravel.sunmence.com.ng/public${testimonial.image}`} width={50} height={50} className='size-[50px] object-cover' alt={testimonial.image} />
                                        </td>
                                        <td>
                                            <div className="flex items-center md:gap-4 gap-2 text-[#2F5318]">
                                                {/* <Link href={`/create-testimonials/edit/${testimonial.id}`}><MdOutlineModeEditOutline size={20} /></Link> */}
                                                <button
                                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
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

                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
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

                    {totalPages > 3 && (
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

export default TestimonialTable
