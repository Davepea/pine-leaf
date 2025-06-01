"use client"
import React from 'react'
import { useFormik } from 'formik'

const WithdrawForm = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    const formik = useFormik({
        initialValues: {
            bankName: user.bank_name || '',
            accountNumber: '',
            withdrawType: '',
            amount: '',
        },
        onSubmit: (values) => {
            console.log('Form submitted with:', values)
        },
    })
    
    return (
        <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
            <h3 className='font-bold text-2xl'>Withdraw Request</h3>
            <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-x-9 gap-y-5'>

                {/* Bank Name */}
                <label className='font-normal text-lg flex flex-col gap-1'>Bank Name
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input
                            type="text"
                            name="bankName"
                            placeholder='Your Bank Name'
                            className='placeholder:text-black text-sm font-normal outline-none w-full'
                            onChange={formik.handleChange}
                            value={formik.values.bankName}
                            required
                        />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>
                            {user.fullName}
                        </span>
                    </div>
                </label>

                {/* Account Number */}
                <label className='font-normal text-lg flex flex-col gap-1'>Account Number
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input
                            type="number"
                            name="accountNumber"
                            placeholder='Your Account Number'
                            className='placeholder:text-black text-sm font-normal outline-none w-full'
                            onChange={formik.handleChange}
                            value={formik.values.accountNumber}
                            required
                        />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>
                            201929292
                        </span>
                    </div>
                </label>

                {/* Withdraw Type */}
                <label className='font-normal text-lg flex flex-col gap-1'>Type Of Withdraw
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <select
                            name="withdrawType"
                            className='text-sm font-normal outline-none w-full bg-transparent'
                            onChange={formik.handleChange}
                            value={formik.values.withdrawType}
                            required
                        >
                            <option value="" disabled>Select your choice</option>
                            <option value="Account Balance">Account Balance</option>
                            <option value="Referral Balance">Referral Balance</option>
                        </select>
                    </div>
                </label>

                {/* Amount */}
                <label className='font-normal text-lg flex flex-col gap-1'>Amount
                    <input
                        type="number"
                        name="amount"
                        placeholder='Enter Amount'
                        className='placeholder:text-black text-sm font-normal outline-none px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]'
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        required
                    />
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'
                >
                    Withdraw Request
                </button>
            </form>
        </div>
    )
}

export default WithdrawForm
