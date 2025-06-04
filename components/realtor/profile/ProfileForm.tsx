"use client"
import React from 'react'
import { useFormik } from 'formik'
import { updateProfile } from '@/utils/axiosInstance'

const ProfileForm = () => {
    const user = typeof window !== 'undefined' && localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : {}

    const formik = useFormik({
        initialValues: {
            email: user.email || '',
            referral: user.my_referral_code || '',
            number: user.number || '',
            bank_name: user.bank_name || '',
            account_name: user.account_name || '',
            account_number: user.account_number || '',
        },
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values)
            try{
                const response = await updateProfile(values)
                console.log('====================================');
                console.log('Response from updateProfile API:', response.data);
                console.log('====================================');
            } catch (error) {
                console.log('====================================');
                console.log('Error during updateProfile request:', error);
                console.log('====================================');
            }
        },
    })

    return (
        <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
            <h3 className='font-bold text-2xl'>Profile</h3>
            <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-x-9 gap-y-5'>

                {/* Email */}
                <label className='font-normal text-lg flex flex-col gap-1'>Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                {/* Referral Code */}
                <label className='font-normal text-lg flex flex-col gap-1'>Referral Code
                    <input
                        type="text"
                        name="referral"
                        placeholder="Your Referral Code"
                        onChange={formik.handleChange}
                        value={formik.values.referral}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                {/* Phone Number */}
                <label className='font-normal text-lg flex flex-col gap-1'>Phone Number
                    <input
                        type="text"
                        name="number"
                        placeholder="Your Phone Number"
                        onChange={formik.handleChange}
                        value={formik.values.number}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                {/* Bank Name */}
                <label className='font-normal text-lg flex flex-col gap-1'>Bank Name
                    <input
                        type="text"
                        name="bank_name"
                        placeholder="Your Bank Name"
                        onChange={formik.handleChange}
                        value={formik.values.bank_name}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                {/* Account Name */}
                <label className='font-normal text-lg flex flex-col gap-1'>Account Name
                    <input
                        type="text"
                        name="account_name"
                        placeholder="Your Account Name"
                        onChange={formik.handleChange}
                        value={formik.values.account_name}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                {/* Account Number */}
                <label className='font-normal text-lg flex flex-col gap-1'>Account Number
                    <input
                        type="text"
                        name="account_number"
                        placeholder="Your Account Number"
                        onChange={formik.handleChange}
                        value={formik.values.account_number}
                        className='px-[10px] h-[55px] border border-[#2F5318]/80 rounded-[10px] placeholder:text-black text-sm font-normal outline-none'
                        required
                    />
                </label>

                <button
                    type="submit"
                    className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'
                >
                    Edit Profile
                </button>
            </form>
        </div>
    )
}

export default ProfileForm
