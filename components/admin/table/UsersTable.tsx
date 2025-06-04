// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import { toast } from 'sonner'

export interface Users {
    id: string,
    fullName: string,
    email: string,
    balance: number,
    referral_bonus: string,
    proof: string,
    enabled: string,
    created_at: string
}

interface UserTableProps {
    searchTerm?: string;
}
const UsersTable = ({ searchTerm = '' }: UserTableProps) => {
    const [allUsers, setAllUsers] = useState<Users[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allUsers.filter(user => {
                const searchLower = searchTerm.toLowerCase();
                const fullName = user.fullName.toLowerCase();
                const email = user.email.toLowerCase();
                const referralBonus = user.referral_bonus || '';
                const proof = user.proof || '';
                const status = user.enabled;
                const date = user.created_at.toLowerCase();

                return (
                    fullName.includes(searchLower) ||
                    email.includes(searchLower) ||
                    referralBonus.includes(searchLower) ||
                    proof.includes(searchLower) ||
                    status.includes(searchLower) ||
                    date.includes(searchLower)
                );
            });
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(allUsers);
        }
    }, [searchTerm, allUsers]);

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/logout'); // Redirect to login if no token
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
                setAllUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                toast.success('User deleted successfully');
            } else {
                // throw new Error(response.data.message || 'Failed to delete user');
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            toast.error(
                'Failed to delete user'
            );

            if (err.response?.status === 401) {
                router.push('/logout');
            }
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/logout')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/allusers',
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
                setAllUsers(response.data.data.data)
                setTotalPages(response.data.data.last_page)
            }
            catch (err) {
                console.error('Error fetching users:', err)
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        router.push('/logout');
                        toast.error('Session expired. Please login again.');
                    } else if (err.response?.data?.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error('Failed to show users. Please try again.');
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
    return (
        <div className='bg-white rounded-[10px] py-6 w-full'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Account <br />Balance</th>
                                <th>Referral <br />Bonus</th>
                                <th>Proof of <br />Payment</th>
                                <th>Payment <br />Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredUsers.map((user) => {
                                const isConfirmed = user.enabled ? 1 : 0
                                return (
                                    <tr key={user.id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                            </label>
                                        </th>
                                        <td>{user.id}</td>
                                        <td>{user.fullName}</td>
                                        <td>
                                            <span>{user.email.split('@')[0]}</span>
                                            <br />
                                            <span>@{user.email.split('@')[1]}</span>
                                        </td>
                                        <td>N{user.balance}</td>
                                        <td>N{user.referral_bonus}</td>
                                        <td className='text-[#2F5318] font-bold'>Paid Online</td>
                                        <td>
                                            <button className={`border h-[35px] px-[18px] rounded-[10px] ${isConfirmed
                                                ? 'border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80'
                                                : 'border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20'
                                                }`}>
                                                {isConfirmed ? 'Confirmed' : 'Pending'}
                                            </button>
                                        </td>
                                        <td className='text-[#2F5318] font-bold'>{user.created_at.split('.')[0]}</td>
                                        <td>
                                            <div className="flex items-center md:gap-4 gap-2 text-[#2F5318]">
                                                <Link href={`/admin/users/view/${user.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <Link href={`/admin/users/view/${user.id}`}><MdOutlineModeEditOutline size={20} /></Link>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
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

export default UsersTable
