'use client'

import Image from 'next/image'
// import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'
import { toast } from 'sonner'

interface User {
    id: string
    fullName: string
    email: string
    role: string
    number: string | null
    balance: number
    referral_bonus: number
    enabled: number
    created_at: string
    updated_at: string
}

interface ApiResponse {
    success: boolean
    data: {
        current_page: number
        data: User[]
        first_page_url: string
        from: number
        last_page: number
        last_page_url: string
        links: {
            url: string | null
            label: string
            active: boolean
        }[]
        next_page_url: string | null
        path: string
        per_page: number
        prev_page_url: string | null
        to: number
        total: number
    }
}

const DashboardTable = () => {
    const [users, setUsers] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/login'); // Redirect to login if no token
                return;
            }

            const response = await axios.delete(
                `https://pineleaflaravel.sunmence.com.ng/public/api/admin/users/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (response.data.success) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                toast.success('User deleted successfully');
                window.location.reload()
            } else {
                // throw new Error(response.data.message || 'Failed to delete user');
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            toast.error(
                err.response?.data?.message ||
                err.message ||
                'Failed to delete user'
            );

            if (err.response?.status === 401) {
                router.push('/login');
            }
        }
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken()

                if (!token) {
                    router.push('login')
                    return
                }

                const response = await axios.get<ApiResponse>(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/allusers',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        },
                        timeout: 10000,
                        params: {
                            page: currentPage
                        }
                    }
                )

                if (!response.data.success) {
                    throw new Error('API request was not successful')
                }

                const { data } = response.data
                setUsers(data.data)
                setTotalPages(data.last_page)
            } catch (err: any) {
                console.error('Error fetching users:', err)
                setError(err.response?.data?.message || 'Failed to load users')
                router.push('/logout')
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        router.push('/login');
                        toast.error('Session expired. Please login again.');
                    } else if (err.response?.data?.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('Error fetching details');
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
            <div className='bg-white rounded-[10px] p-6 w-full'>
                <p className='text-red-500'>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className='mt-2 px-4 py-2 bg-[#2F5318] text-white rounded hover:bg-[#1e3a0f]'
                >
                    Retry
                </button>
            </div>
        )
    }

    if (!users || users.length === 0) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full'>
                <p className='text-[#2F5318]'>No sales report</p>
            </div>
        )
    }

    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full relative z-0">
                <div className="overflow-x-auto w-full mytable py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='md:text-base text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>User</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Balance</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='md:text-base text-sm text-[#000000]/80'>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="flex items-center gap-[10px]">
                                            <Image
                                                src='/images/dashboard/profile.png'
                                                width={27}
                                                height={27}
                                                alt='profile'
                                                className='size-[27px] rounded-full border border-[#2F5318]'
                                            />
                                            {user.fullName.split(' ')[0]}
                                        </div>
                                    </td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.number || 'N/A'}</td>
                                    <td className='capitalize'>{user.role}</td>
                                    <td>₦{user.balance.toLocaleString()}</td>
                                    <td>
                                        <button className={`border h-[35px] px-[18px] rounded-[10px] ${user.enabled
                                            ? 'border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80'
                                            : 'border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20'
                                            }`}>
                                            {user.enabled ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="border-none bg-transparent"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
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

export default DashboardTable