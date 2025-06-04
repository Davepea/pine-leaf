'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

interface Referral {
    id: number
    referee_id: number
    referral_id: number
    transaction_id: number
    level: number
    bonus: string
    created_at: string
}

interface User {
    id: number
    email: string
}

interface ReferralTableProps {
    searchTerm?: string;
}

const ReferralTable = ({ searchTerm = '' }: ReferralTableProps) => {
    const [allReferral, setAllReferral] = useState<Referral[]>([])
    const [filteredReferrals, setFilteredReferrals] = useState<Referral[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const router = useRouter()

    // Fetch all users with pagination
    const fetchAllUsers = async (token: string) => {
        let allUsers: User[] = [];
        let currentPage = 1;
        let lastPage = 1;

        do {
            try {
                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/allusers',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        },
                        params: {
                            page: currentPage,
                        },
                    }
                );

                allUsers = [...allUsers, ...response.data.data.data];
                lastPage = response.data.data.last_page;
                currentPage++;
            } catch (err) {
                console.error('Error fetching users:', err);
                break;
            }
        } while (currentPage <= lastPage);

        return allUsers;
    };

    // Search functionality
    useEffect(() => {
        if (searchTerm && allReferral.length > 0 && users.length > 0) {
            const filtered = allReferral.filter(referral => {
                const searchLower = searchTerm.toLowerCase();

                // Get email information
                const refereeEmail = getUserEmail(referral.referee_id.toString());
                const referralEmail = getUserEmail(referral.referral_id.toString());

                // Convert all searchable fields to strings
                const id = referral.id.toString();
                const bonus = referral.bonus;
                const level = `Level ${referral.level}`;
                const generation = referral.level === 1 ? '1st Gen' : '2nd Gen';
                const date = referral.created_at.toLowerCase();

                return (
                    id.includes(searchLower) ||
                    refereeEmail.toLowerCase().includes(searchLower) ||
                    referralEmail.toLowerCase().includes(searchLower) ||
                    bonus.includes(searchLower) ||
                    level.includes(searchLower) ||
                    generation.includes(searchLower) ||
                    date.includes(searchLower)
                );
            });
            setFilteredReferrals(filtered);
        } else {
            setFilteredReferrals(allReferral);
        }
    }, [searchTerm, allReferral, users]);

    // Get user email by ID
    const getUserEmail = (userId: string) => {
        const userIdNum = parseInt(userId, 10);
        const user = users.find(user => user.id == userIdNum);
        return user ? user.email : userIdNum.toString();
    }

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                // Fetch all users first
                const allUsers = await fetchAllUsers(token);
                setUsers(allUsers);

                // Then fetch referrals
                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/referrals',
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
                setAllReferral(response.data.data)
                setFilteredReferrals(response.data.data)
                setTotalPages(response.data.last_page)
            } catch (err) {
                console.error('Error fetching referrals:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
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
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full py-2">
                    <table className="table">
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Referral <br />Email</th>
                                <th>Amount <br />Paid</th>
                                <th>Generation</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredReferrals.length > 0 ? (
                                filteredReferrals.map((referral) => {
                                    const isGeneration = referral.level == 1;
                                    const refereeEmail = getUserEmail(referral.referee_id.toString());
                                    const referralEmail = getUserEmail(referral.referral_id.toString());
                                    const [refereeUser, refereeDomain] = refereeEmail.includes('@') ? refereeEmail.split('@') : ['', refereeEmail];
                                    const [referralUser, referralDomain] = referralEmail.includes('@') ? referralEmail.split('@') : ['', referralEmail];

                                    return (
                                        <tr key={referral.id}>
                                            <td>{referral.id}</td>
                                            <td>
                                                {refereeUser ? (
                                                    <>
                                                        <span>{refereeUser}</span>
                                                        <br />
                                                        <span>@{refereeDomain}</span>
                                                    </>
                                                ) : refereeEmail}
                                            </td>
                                            <td>Level {referral.level}</td>
                                            <td>
                                                {referralUser ? (
                                                    <>
                                                        <span>{referralUser}</span>
                                                        <br />
                                                        <span>@{referralDomain}</span>
                                                    </>
                                                ) : referralEmail}
                                            </td>
                                            <td>N{referral.bonus}</td>
                                            <td className='text-[#2F5318] font-bold'>
                                                {isGeneration ? `1st Gen` : `2nd Gen`}
                                            </td>
                                            <td className='text-[#2F5318] font-bold'>{referral.created_at.split(".")[0]}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4">
                                        No referrals found matching your search
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredReferrals.length > 0 && (
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
                )}
            </div>
        </div>
    )
}

export default ReferralTable