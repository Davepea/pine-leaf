'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'

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

    const handleDeleteUser = async (userId: number) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return
        }

        try {
            const token = getToken()
            if (!token) {
                router.push('/dashboard')
                return
            }

            await axios.delete(
                `https://pineleaflaravel.sunmence.com.ng/public/api/admin/deleteuser/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    timeout: 10000
                }
            )

            // Refresh the user list after deletion
            setUsers(users.filter(user => user.id !== userId))

        } catch (err: any) {
            console.error('Error deleting user:', err)
            alert(err.response?.data?.message || 'Failed to delete user')

            if (err.response?.status === 401) {
                router.push('/login')
            }
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken()

                if (!token) {
                    router.push('/dashboard')
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

                // If unauthorized, redirect to login
                if (err.response?.status === 401) {
                    router.push('/login')
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
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                <p>Loading users...</p>
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
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="border-none bg-transparent"
                                        >
                                            Delete
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