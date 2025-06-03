'use client'
import Header from '@/components/admin/Header'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useFormik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface User {
    id: number,
    fullName: string,
    email: string,
    number: string,
    balance: string,
    referral_bonus: string,
    my_referral_code: string,
    enabled: string,
    created_at: string
}

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [initialLoad, setInitialLoad] = useState(true)
    const router = useRouter()
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setInitialLoad(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    `https://pineleaflaravel.sunmence.com.ng/public/api/admin/users/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )

                // Match the API response structure
                const userData = response.data.user
                setUser(userData)

                // Set formik initial values with the fetched user data
                formik.setValues({
                    fullName: userData.fullName,
                    email: userData.email,
                    number: userData.number || "",
                    account_number: "",
                    balance: userData.balance,
                    referral_bonus: userData.referral_bonus,
                    referral_code: userData.my_referral_code || "",
                    enabled: userData.enabled
                })
            } catch (error) {
                console.error('Error fetching user:', error)
                toast.error('Failed to load user data')
            } finally {
                setInitialLoad(false)
            }
        }

        if (id) {
            fetchUser()
        }
    }, [id, router])

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            number: "",
            account_number: "",
            balance: "",
            referral_bonus: "",
            referral_code: "",
            enabled: ""
        },
        onSubmit: async (values) => {
            try {
                setLoading(false)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }
                const payload = {
                    ...values,
                    user_id: id // Add the user ID to the payload
                }
                const response = await axios.post(
                    `https://pineleaflaravel.sunmence.com.ng/public/api/admin/updateUser?${id}`,
                    payload,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )
                console.log('Success:', response.data)
                toast.success('User updated successfully!')
            }
            catch (error) {
                console.error('Full error:', error)
                if (error.response) {
                    const errorMessage = error.response.data.message || 'Server error occurred'
                    toast.error(`Error: ${errorMessage}`)
                } else {
                    toast.error('Network error occurred. Please try again.')
                }
            } finally {
                setLoading(false)
            }
        }
    })

    const fields = [
        {
            name: "fullName", type: "text", label: "Name"
        },
        {
            name: "email", type: "email", label: "Email"
        },
        {
            name: "number", type: "number", label: "Phone number"
        },
        {
            name: "account_number", type: "number", label: "Account number"
        },
        {
            name: "balance", type: "number", label: "Account balance"
        },
        {
            name: "referral_bonus", type: "number", label: "Referral Bonus"
        },
        {
            name: "referral_code", type: "text", label: "Referral Code"
        },
        {
            name: "enabled", type: "text", label: "Payment Status"
        },
    ]

    if (initialLoad) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                User not found
            </div>
        )
    }

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
                    <h3 className='font-bold text-2xl'>Profile</h3>
                    <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-x-9 gap-y-5'>
                        {fields.map(({ name, type, label }) => (
                            <label key={name} className='font-normal text-base flex items-center justify-between w-full border border-[#2F5318]/80 rounded-[10px] p-1'>
                                <span className="w-full pl-2">{label}</span>
                                <div className="flex items-center gap-4 px-[10px] h-[40px] w-full border border-[#2F5318]/80 rounded-[8px]">
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        value={formik.values[name]}
                                        onChange={formik.handleChange}
                                        className='placeholder:text-black text-sm font-normal outline-none w-full'
                                        required
                                    />
                                </div>
                            </label>
                        ))}
                        <button
                            type='submit'
                            className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Page