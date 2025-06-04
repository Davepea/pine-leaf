// import Image from 'next/image'
'use client'

import { getToken } from '@/lib/auth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import { toast } from 'sonner'

interface Transaction {
    id: string
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

interface TransactionsTableProps {
    searchTerm?: string;
}

const TransactionsTable = ({ searchTerm = '' }: TransactionsTableProps) => {
    const [allTransaction, setAllTransaction] = useState<Transaction[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allTransaction.filter(transaction => {
                const searchLower = searchTerm.toLowerCase();
                const email = getUserEmail(transaction.user_id).toLowerCase();
                const amount = transaction.amount.toLowerCase();
                const accountNumber = transaction.account_number?.toLowerCase() || '';
                const transactionType = transaction.transaction_type?.toLowerCase() || '';
                const bankName = transaction.bank_name?.toLowerCase() || '';
                const status = transaction.status.toLowerCase();
                const date = transaction.created_at.toLowerCase();

                return (
                    email.includes(searchLower) ||
                    amount.includes(searchLower) ||
                    accountNumber.includes(searchLower) ||
                    transactionType.includes(searchLower) ||
                    bankName.includes(searchLower) ||
                    status.includes(searchLower) ||
                    date.includes(searchLower) ||
                    transaction.id.toString().includes(searchLower)
                );
            });
            setFilteredTransactions(filtered);
        } else {
            setFilteredTransactions(allTransaction);
        }
    }, [searchTerm, allTransaction, users]);


    const handleDeleteTransaction = async (id: string) => {
        if (!confirm('Are you sure you want to delete this transaction?')) {
            return;
        }

        try {
            const token = getToken();
            if (!token) {
                router.push('/login'); // Redirect to login if no token
                return;
            }

            const response = await axios.delete(
                `https://pineleaflaravel.sunmence.com.ng/public/api/admin/transactions/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (response.data.success) {
                setAllTransaction(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
                toast.success('Transaction deleted successfully');
            } else {
                // throw new Error(response.data.message || 'Failed to delete user');
            }
        } catch (err: any) {
            console.error('Delete error:', err);
            toast.error(
                'Failed to delete transaction'
            );

            if (err.response?.status === 401) {
                router.push('/login');
            }
        }
    };

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
                            {filteredTransactions.map((transaction) => {
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
                                                <Link href={`/admin/transactions/view/${transaction.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <button
                                                    onClick={() => handleDeleteTransaction(transaction.id)}
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

export default TransactionsTable