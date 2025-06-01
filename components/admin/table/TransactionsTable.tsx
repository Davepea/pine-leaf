// import Image from 'next/image'
'use client'

import { getToken } from '@/lib/auth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'

interface Transaction {
    id: number
    user_id: string
    transaction_type: string
    bank_name: string
    account_number: string
    amount: string
    balance: number
    status: string
    created_at: string
}

interface User {
    id: number
    email: string
}

const TransactionsTable = () => {
    const [allTransaction, setAllTransaction] = useState<Transaction[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const router = useRouter()

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const allUsers = await fetchAllUsers(token);
                setUsers(allUsers);

                // Fetch users first
                const transactionsResponse = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/transactions',
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

                setAllTransaction(transactionsResponse.data.data);
                setTotalPages(transactionsResponse.data.last_page);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, router]);

    // Function to get email by user_id
    const getUserEmail = (userId: string) => {
        const userIdNum = parseInt(userId, 10);
        const user = users.find(user => user.id == userIdNum);
        return user ? user.email : userIdNum;
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (loading) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className='bg-white rounded-[10px] py-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Account <br />Type</th>
                                <th>Bank <br />Name</th>
                                <th>Account <br />Number</th>
                                <th>Amount <br />Paid</th>
                                <th>status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {allTransaction.map((transaction) => {
                                const isWithdrawal = transaction.transaction_type == 'withdraw';
                                const isSuccessful = transaction.status == 'success';
                                return (
                                    <tr key={transaction.id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                            </label>
                                        </th>
                                        <td>{transaction.id}</td>
                                        <td>
                                            <span>{getUserEmail(transaction.user_id).split('@')[0]}</span>
                                            <br />
                                            <span>@{getUserEmail(transaction.user_id).split('@')[1]}</span>
                                        </td>
                                        <td className='capitalize'>{transaction.transaction_type}</td>
                                        <td>{isWithdrawal ? (transaction.bank_name || "Bank") : "----------"}</td>
                                        <td>{isWithdrawal ? (transaction.account_number || "12345678") : "----------"}</td>
                                        <td>N{transaction.amount}</td>
                                        <td>
                                            <button className={`border h-[35px] px-[18px] rounded-[10px] ${isSuccessful
                                                ? 'border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80'
                                                : 'border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20'
                                                }`}>
                                                {isSuccessful ? 'Successful' : 'Pending'}
                                            </button>
                                        </td>
                                        <td className='text-[#2F5318] font-bold'>{transaction.created_at.split('.')[0]}</td>
                                        <td>
                                            <div className="flex items-center md:gap-4 gap-2 text-[#2F5318]">
                                                <Link href={`/transaction/view/${transaction.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <Link href={`/transaction/delete/${transaction.id}`}><MdDeleteOutline size={20} /></Link>
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

export default TransactionsTable