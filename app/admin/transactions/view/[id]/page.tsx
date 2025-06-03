'use client'
import Header from '@/components/admin/Header'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Transaction {
    id: string
    user_id: string
    amount: string
    transaction_type: string
    ref_no: string
    property_purchased_id: string | null
    proof_of_payment: string | null
    units: string | null
    status: string
    meta: any
    created_at: string
    updated_at: string
}

interface User {
    id: number
    email: string
    fullName: string
}

const TransactionPage = () => {
    const [transaction, setTransaction] = useState<Transaction | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [initialLoad, setInitialLoad] = useState(true)
    const router = useRouter()
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setInitialLoad(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                // Fetch transaction
                const transactionResponse = await axios.get(
                    `https://pineleaflaravel.sunmence.com.ng/public/api/admin/transactions/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )

                const transactionData = transactionResponse.data
                setTransaction(transactionData)

                // Fetch user data if user_id exists
                if (transactionData.user_id) {
                    const userResponse = await axios.get(
                        `https://pineleaflaravel.sunmence.com.ng/public/api/admin/users/${transactionData.user_id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Accept': 'application/json'
                            }
                        }
                    )
                    setUser(userResponse.data.user)
                }
            } catch (error) {
                console.error('Error fetching transaction:', error)
                toast.error('Failed to load transaction data')
            } finally {
                setInitialLoad(false)
            }
        }

        if (id) {
            fetchTransaction()
        }
    }, [id, router])

    const fields = [
        { name: "id", label: "Transaction ID" },
        { name: "ref_no", label: "Reference Number" },
        { name: "user_email", label: "User Email", value: user?.email || "N/A" },
        { name: "user_name", label: "User Name", value: user?.fullName || "N/A" },
        { name: "amount", label: "Amount", value: `₦${transaction?.amount}` },
        { name: "transaction_type", label: "Transaction Type" },
        { name: "status", label: "Status" },
        { name: "units", label: "Units", value: transaction?.units || "N/A" },
        { name: "created_at", label: "Date Created" },
        { name: "updated_at", label: "Last Updated" }
    ]

    if (initialLoad) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
            </div>
        )
    }

    if (!transaction) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                Transaction not found
            </div>
        )
    }

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
                    <div className='flex justify-between items-center'>
                        <h3 className='font-bold text-2xl'>Transaction ({id}) Details</h3>
                        <div className={`px-4 py-2 rounded-lg ${transaction.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {transaction.status.toUpperCase()}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-5'>
                        {fields.map(({ name, label, value }) => (
                            <label key={name} className='font-normal text-base flex items-center justify-between w-full border border-[#2F5318]/80 rounded-[10px] p-1'>
                                <span className='w-full pl-2'>{label}</span>
                                <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/20 rounded-[10px] bg-gray-50">
                                    <span className='flex items-center gap-4 px-[10px] h-[40px] w-full border border-[#2F5318]/80 rounded-[8px]'>
                                        {value || transaction[name as keyof Transaction] || "----------"}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionPage