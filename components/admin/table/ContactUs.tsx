// import Image from 'next/image'
'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

export interface ContactUs {
    id: number,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    subject: string,
}

interface ContactUsTableProps {
    searchTerm?: string;
}

const ContactUsTable = ({ searchTerm = '' }: ContactUsTableProps) => {
    const [allContactUs, setAllContactUs] = useState<ContactUs[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredContactUs, setFilteredContactUs] = useState<ContactUs[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allContactUs.filter(contact => {
                const searchLower = searchTerm.toLowerCase();
                const firstname = contact.firstname.toLowerCase() || '';
                const lastname = contact.lastname.toLowerCase() || '';
                const phone = contact.phone.toLowerCase() || '';
                const email = contact.email.toLowerCase() || '';
                const subject = contact.subject.toLowerCase() || '';

                return (
                    firstname.includes(searchLower) ||
                    lastname.includes(searchLower) ||
                    phone.includes(searchLower) ||
                    email.includes(searchLower) ||
                    subject.includes(searchLower)
                );
            });
            setFilteredContactUs(filtered);
        } else {
            setFilteredContactUs(allContactUs);
        }
    }, [searchTerm, allContactUs]);

    useEffect(() => {
        const fetchContactUs = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/contacts',
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
                if (response.data?.data && Array.isArray(response.data.data.data)) {
                    setAllContactUs(response.data.data.data)
                    setTotalPages(response.data.data.last_page)
                    // console.log(response.data.data.data);
                } else {
                    throw new Error('Invalid data structure received from API')
                }
            }
            catch (err) {
                console.error('Error fetching properties:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchContactUs()
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
        <div className='bg-white rounded-[10px] py-6 w-full'>
            <div className="w-full mytable">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Second Name</th>
                                <th>Phone Number</th>
                                <th>Email Address</th>
                                <th>Subject</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredContactUs.length > 0 ? (
                                filteredContactUs.map((contact) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>{contact.id}</td>
                                            <td>{contact.firstname}</td>
                                            <td>{contact.lastname}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.email}</td>
                                            <td>{contact.subject}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4">
                                        No contact found
                                    </td>
                                </tr>
                            )}
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

export default ContactUsTable
