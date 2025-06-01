"use client"
import React from 'react'

const ProfileForm = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
    return (
        <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
            <h3 className='font-bold text-2xl'>Profile</h3>
            <form action="" className='grid grid-cols-2 gap-x-9 gap-y-5'>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Email
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="email" name="email" id="email" placeholder='Your Email' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>{user.email}</span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Referral Code
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="text" name="referral" id="referral" placeholder='Your Referral Code' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>{user.my_referral_code}</span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Phone Number
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="number" name="number" id="number" placeholder='Your Phone Number' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>{user.number}</span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Bank Name
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="text" name="bankName" id="bankName" placeholder='Your Bank Name' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>{user.fullName}</span>
                    </div>
                </label>
                <button className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'>Edit Profile</button>
            </form>
        </div>
    )
}

export default ProfileForm
