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
    property_purchased_id: string
    proof_of_payment: string
    unit: string
    amount: string
    status: string
    created_at: string
}

interface User {
    id: number
    email: string
}

interface Property {
    id: number
    name: string
}

const ProofTable = () => {
    const [allTransaction, setAllTransaction] = useState<Transaction[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [properties, setProperties] = useState<Property[]>([])
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

    const fetchAllProperties = async (token: string) => {
        let allProperties: Property[] = [];
        let currentPage = 1;
        let lastPage = 1;

        do {
            try {
                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/properties',
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

                allProperties = [...allProperties, ...response.data.data.data];
                lastPage = response.data.data.last_page;
                currentPage++;
            } catch (err) {
                console.error('Error fetching properties:', err);
                break;
            }
        } while (currentPage <= lastPage);

        return allProperties;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                // Fetch all data in parallel
                const [allUsers, allProperties] = await Promise.all([
                    fetchAllUsers(token),
                    fetchAllProperties(token)
                ]);

                setUsers(allUsers);
                setProperties(allProperties);

                // Then fetch transactions
                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/admin/transactions',
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
                setAllTransaction(response.data.data)
                setTotalPages(response.data.last_page)
            } catch (err) {
                console.error('Error fetching data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [currentPage, router])

    // Function to get email by user_id
    const getUserEmail = (userId: string) => {
        const userIdNum = parseInt(userId, 10);
        const user = users.find(user => user.id === userIdNum);
        return user ? user.email : userId;
    }

    // Function to get property name by property_id
    const getPropertyName = (propertyId: string) => {
        const propertyIdNum = parseInt(propertyId, 10);
        const property = properties.find(prop => prop.id === propertyIdNum);
        return property ? property.name : propertyId;
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
        <div className='bg-white rounded-[10px] pb-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full py-2">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Property <br />Name</th>
                                <th>No. of <br />Plots</th>
                                <th>Payment <br />Type</th>
                                <th>Proof of <br />Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80 w-full'>
                            {allTransaction.map((proof) => {
                                const isSuccessful = proof.status == 'success';
                                const email = getUserEmail(proof.user_id);
                                const [username, domain] = email.includes('@') ? email.split('@') : ['', email];
                                const propertyName = getPropertyName(proof.property_purchased_id);
                                const paymentProof = proof.proof_of_payment == null;

                                return (
                                    <tr key={proof.id}>
                                        <td>{proof.id}</td>
                                        <td>
                                            {username && (
                                                <>
                                                    <span>{username}</span>
                                                    <br />
                                                    <span>@{domain}</span>
                                                </>
                                            )}
                                            {!username && <span>{domain}</span>}
                                        </td>
                                        <td>{propertyName || "----------"}</td>
                                        <td>{proof.unit || "----------"}</td>
                                        <td>Full Payment <br />N{proof.amount}</td>
                                        <td className='text-[#2F5318] font-bold'>{paymentProof ? "Paystack" : "Upload Receipt"}</td>
                                        <td>
                                            <button className={`border h-[35px] px-[18px] rounded-[10px] ${isSuccessful
                                                ? 'border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80'
                                                : 'border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20'
                                                }`}>
                                                {isSuccessful ? 'Confirmed' : 'Pending'}
                                            </button>
                                        </td>
                                        <td className='text-[#2F5318] font-bold'>{proof.created_at.split('.')[0]}</td>
                                        <td>
                                            <div className="flex items-center gap-5 text-[#2F5318]">
                                                <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <Link href={''}><MdDeleteOutline size={20} /></Link>
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

export default ProofTable