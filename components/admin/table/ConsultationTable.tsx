'use client'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

export interface Consultation {
    id: string,
    fullname: string,
    phone: string,
    email: string,
    mode: string,
    no_attendees: string,
    notes: string,
    consultation_date: string,
    consultation_time: string,
}

interface ConsultationTableProps {
    searchTerm?: string;
}

const ConsultationTable = ({ searchTerm = '' }: ConsultationTableProps) => {
    const [allConsultation, setAllConsultation] = useState<Consultation[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredConsultation, setFilteredConsultation] = useState<Consultation[]>([]);

    const router = useRouter()

    useEffect(() => {
        if (searchTerm) {
            const filtered = allConsultation.filter(consultation => {
                const searchLower = searchTerm.toLowerCase();
                // Add null checks for all fields
                const fullname = consultation.fullname?.toLowerCase() || '';
                const phone = consultation.phone?.toLowerCase() || '';
                const email = consultation.email?.toLowerCase() || '';
                const mode = consultation.mode?.toLowerCase() || '';
                const no_attendees = consultation.no_attendees?.toLowerCase() || '';
                const notes = consultation.notes?.toLowerCase() || '';
                const consultation_date = consultation.consultation_date?.toLowerCase() || '';
                const consultation_time = consultation.consultation_time?.toLowerCase() || '';

                return (
                    fullname.includes(searchLower) ||
                    phone.includes(searchLower) ||
                    email.includes(searchLower) ||
                    mode.includes(searchLower) ||
                    no_attendees.includes(searchLower) ||
                    notes.includes(searchLower) ||
                    consultation_date.includes(searchLower) ||
                    consultation_time.includes(searchLower)
                );
            });
            setFilteredConsultation(filtered);
        } else {
            setFilteredConsultation(allConsultation);
        }
    }, [searchTerm, allConsultation]);

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/consultations',
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

                if (response.data?.data && Array.isArray(response.data.data)) {
                    setAllConsultation(response.data.data)
                    setTotalPages(response.data.last_page || 1)
                } else {
                    console.error('Invalid data structure:', response.data)
                    setAllConsultation([])
                    setTotalPages(1)
                }
            }
            catch (err) {
                console.error('Error fetching consultations:', err)
                setAllConsultation([])
                setTotalPages(1)
            } finally {
                setLoading(false)
            }
        }
        fetchConsultation()
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
                        <thead className='text-sm text-[#000000]/80 font-medium'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone <br />Number</th>
                                <th>Email</th>
                                <th>Mode of <br />Consultation</th>
                                <th>Number</th>
                                <th>Additional <br />Notes</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-[#000000]/80'>
                            {filteredConsultation.length > 0 ? (
                                filteredConsultation.map((consultation) => (
                                    <tr key={consultation.id}>
                                        <td>{consultation.id}</td>
                                        <td>{consultation.fullname || '-'}</td>
                                        <td>{consultation.phone || '-'}</td>
                                        <td>{consultation.email || '-'}</td>
                                        <td>{consultation.mode || '-'}</td>
                                        <td>{consultation.no_attendees || '-'}</td>
                                        <td>{consultation.notes || '-'}</td>
                                        <td>{consultation.consultation_date || '-'}</td>
                                        <td>{consultation.consultation_time || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4">
                                        No consultations found
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

export default ConsultationTable