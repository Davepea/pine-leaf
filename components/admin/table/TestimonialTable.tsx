// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'

export interface Testimonial {
    id: number,
    name: string,
    rating: string,
    message: string,
    image: string,
}
const TestimonialTable = () => {
    const [allTestimonial, setAllTestimonial] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const router = useRouter()
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
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                <p>Loading users...</p>
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
                            {allTestimonial.map((testimonial) => {
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
                                                <Link href={`/create-testimonials/edit/${testimonial.id}`}><MdOutlineModeEditOutline size={20} /></Link>
                                                <Link href={`/create-testimonials/delete/${testimonial.id}`}><MdDeleteOutline size={20} /></Link>
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
