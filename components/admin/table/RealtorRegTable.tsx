// import Image from 'next/image'
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
// import { Users } from './UsersTable'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getToken } from '@/lib/auth'
import { toast } from 'sonner'

interface Realtors {
    id: number,
    name: string,
    email: string,
    created_at: string
}
const RealtorRegTable = () => {
    const [allRealtor, setAllRealtor] = useState<Realtors[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const router = useRouter()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/realtor-stars',
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
                // setAllRealtor(response.data.data.data)
                // setTotalPages(response.data.data.last_page)

                if (response.data?.data && Array.isArray(response.data.data)) {
                    setAllRealtor(response.data.data)
                    setTotalPages(response.data.last_page || 1)
                } else {
                    throw new Error('Invalid data structure received from API')
                }
            } catch (err) {
                console.error('Error fetching properties:', err)
                setAllRealtor([])
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        router.push('/login');
                        toast.error('Session expired. Please login again.');
                    } else if (err.response?.data?.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('Failed to delete realtor. Please try again.');
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
        fetchUsers()
    }, [currentPage, router])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
            </div>
        )
    }
    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Total <br />Transaction</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {allRealtor.map((realtor) => (
                                <tr key={realtor.id}>
                                    <td>{realtor.id}</td>
                                    <td>{realtor.name}</td>
                                    <td>
                                        <span>{realtor.email.split('@')[0]}</span>
                                        <br />
                                        <span>@{realtor.email.split('@')[1]}</span>
                                    </td>
                                    <td>
                                        <Image src='/images/dashboard/profile.png' width={27} height={27} alt='logo' objectFit='cover' objectPosition='center' className='size-[27px] rounded-full border border-[#2F5318]' />
                                    </td>
                                    <td>N3,000,000</td>
                                    <td>
                                        <div className="flex items-center gap-5 text-[#2F5318]">
                                            <Link href={`/realtor-reg/view/${realtor.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                            <Link href={`/realtor-reg/delete/${realtor.id}`}><MdDeleteOutline size={20} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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

export default RealtorRegTable
