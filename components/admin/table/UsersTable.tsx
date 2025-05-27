// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos, MdDeleteOutline, MdOutlineModeEditOutline, MdOutlineRemoveRedEye } from 'react-icons/md'

interface Users {
    id: number,
    fullName: string,
    email: string,
    balance: number,
    referral_bonus: number,
    proof: string,
    enabled: number,
    created_at: string
}
const UsersTable = () => {
    const [allUsers, setAllUsers] = useState<Users[]>([])
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
                console.error('Error fetching properties:', err)
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
    return (
        <div className='bg-white rounded-[10px] py-6 w-full overflow-x-auto'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-lg text-[#000000]/80 font-medium'>
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
                        <tbody className='text-base text-[#000000]/80'>
                            {allUsers.map((user) => {
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
                                        <td>{user.email}</td>
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
                                        <td className='text-[#2F5318] font-bold'>{user.created_at}</td>
                                        <td>
                                            <div className="flex items-center gap-5 text-[#2F5318]">
                                                <Link href={`/users/view/${user.id}`}><MdOutlineRemoveRedEye size={20} /></Link>
                                                <Link href={`/users/edit/${user.id}`}><MdOutlineModeEditOutline size={20} /></Link>
                                                <Link href={`/users/delete/${user.id}`}><MdDeleteOutline size={20} /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {/* <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="size-[15px] border bg-white text-white border-[#000000]/80 flex items-center" />
                                    </label>
                                </th>
                                <td>002</td>
                                <td>Cynthia <br />Jideofor</td>
                                <td>cythina005 <br />@gmail.com</td>
                                <td>N0.00</td>
                                <td>N0.00</td>
                                <td className='text-[#2F5318] font-bold'>Uploaded <br />Receipt</td>
                                <td>
                                    <button className='border border-[#CD2B2E]/15 text-[#CD2B2E] bg-[#CD2B2E]/20 h-[35px] px-[18px] rounded-[10px]'>Pending</button>
                                </td>
                                <td className='text-[#2F5318] font-bold'>19/04/25 <br />10:40:15 pm</td>
                                <td>
                                    <div className="flex items-center gap-5 text-[#2F5318]">
                                        <Link href={''}><MdOutlineRemoveRedEye size={20} /></Link>
                                        <Link href={''}><MdOutlineModeEditOutline size={20} /></Link>
                                        <Link href={''}><MdDeleteOutline size={20} /></Link>
                                    </div>
                                </td>
                            </tr> */}

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

export default UsersTable
