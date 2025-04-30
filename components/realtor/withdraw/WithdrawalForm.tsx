import React from 'react'

const WithrawalForm = () => {
    return (
        <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
            <h3 className='font-bold text-2xl'>Withdraw Request</h3>
            <form action="" className='grid grid-cols-2 gap-x-9 gap-y-5'>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Bank Name
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="text" name="bankName" id="bankName" placeholder='Your Bank Name' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>Okofo Daniel</span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Account Number
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="number" name="accountNumber" id="accountNumber" placeholder='Your Account Number' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>201929292</span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Type Of Withdraw
                    <div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
                        <input type="text" name="withdrawType" id="withdrawType" placeholder='Select your choice' className='placeholder:text-black text-sm font-normal outline-none w-full' required />
                        <span className='w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]'>
                            <select name="" id="">
                                <option className='px-[10px] outline-none' value=''>Account Balance</option>
                                <option className='px-[10px] outline-none' value=''>Referral Balance</option>
                            </select>
                        </span>
                    </div>
                </label>
                <label htmlFor="" className='font-normal text-lg flex flex-col gap-1'>Amount
                    <input type="number" name="amount" id="amount" placeholder='' className='placeholder:text-black text-sm font-normal outline-none px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]' required />
                </label>
                <button className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'>Withdraw Request</button>
            </form>
        </div>
    )
}

export default WithrawalForm
