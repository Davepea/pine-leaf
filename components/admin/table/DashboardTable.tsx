'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/auth'

interface User {
    id: number
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
    const [pagination, setPagination] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken()

                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get<ApiResponse>(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/allusers',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        },
                        timeout: 10000
                    }
                )

                if (!response.data.success) {
                    throw new Error('API request was not successful')
                }

                const { data } = response.data
                setUsers(data.data)
                setPagination({
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    links: data.links,
                    nextPageUrl: data.next_page_url,
                    prevPageUrl: data.prev_page_url
                })
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
    }, [router])

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
                <p className='text-yellow-600'>No users found</p>
            </div>
        )
    }
    return (
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full relative z-0">
                <div className="overflow-x-auto w-full mytable py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
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
                        <tbody className='text-base text-[#000000]/80'>
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
                                        <Link
                                            className="font-bold text-[#2F5318]"
                                            href={`/users/edit/${user.id}`}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="join mt-5 w-full justify-center">
                    {pagination.prevPageUrl ? (
                        <Link href={pagination.prevPageUrl} className="size-[35px] flex items-center justify-center text-black/80 hover:bg-gray-100 rounded">
                            <MdArrowBackIos size={16} />
                        </Link>
                    ) : (
                        <div className="size-[35px] flex items-center justify-center text-black/30 rounded">
                            <MdArrowBackIos size={16} />
                        </div>
                    )}

                    {pagination.links.slice(1, -1).map((link, index) => (
                        link.url ? (
                            <Link
                                key={index}
                                href={link.url}
                                className={`join-item btn items-end border-none shadow shadow-white text-lg font-normal rounded-[10px] size-[35px] ${link.active
                                    ? 'bg-[#2F5318] text-white'
                                    : 'bg-transparent text-black/80 hover:bg-gray-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ) : null
                    ))}

                    {pagination.nextPageUrl ? (
                        <Link href={pagination.nextPageUrl} className="size-[35px] flex items-center justify-center text-black/80 hover:bg-gray-100 rounded">
                            <MdArrowForwardIos size={16} />
                        </Link>
                    ) : (
                        <div className="size-[35px] flex items-center justify-center text-black/30 rounded">
                            <MdArrowForwardIos size={16} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardTable