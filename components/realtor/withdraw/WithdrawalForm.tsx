'use client';
import React from 'react';
import { useFormik } from 'formik';
import { withdraw } from '@/utils/axiosInstance';
import { useAuth } from '@/app/context/AuthContext';

const WithdrawForm = () => {
	const { user } = useAuth()

	const formik = useFormik({
		initialValues: {
			bank_name: user?.bank_name || '',
			account_number: '',
			withdraw_from: '',
			amount: '',
			user_id: user?.id || '',
			email: user?.email || '',
			account_name: user?.fullName || '',
		},
		onSubmit: async (values) => {
			console.log('Formatted payload:', values);
			try {
				const response = await withdraw(values);
				console.log('====================================');
				console.log('Response from withdraw API:', response.data);
				console.log('====================================');
			} catch (error) {
				console.log('====================================');
				console.log('Error during withdraw request:', error);
				console.log('====================================');
			}
		},
	});

	return (
		<div className="bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80">
			<h3 className="font-bold text-2xl">Withdraw Request</h3>
			<form
				onSubmit={formik.handleSubmit}
				className="grid grid-cols-2 gap-x-9 gap-y-5"
			>
				{/* Bank Name */}
				<label className="font-normal text-lg flex flex-col gap-1">
					Bank Name
					<div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
						<input
							type="text"
							name="bank_name"
							placeholder="Your Bank Name"
							className="placeholder:text-black text-sm font-normal outline-none w-full"
							onChange={formik.handleChange}
							value={formik.values.bank_name}
							required
						/>
						<span className="w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]">
							{formik.values.account_name}
						</span>
					</div>
				</label>

				{/* Account Number */}
				<label className="font-normal text-lg flex flex-col gap-1">
					Account Number
					<div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
						<input
							type="text"
							name="account_number"
							placeholder="Your Account Number"
							className="placeholder:text-black text-sm font-normal outline-none w-full"
							onChange={formik.handleChange}
							value={formik.values.account_number}
							required
						/>
						<span className="w-max bg-transparent text-black/80 text-sm font-medium border border-[#2F5318]/20 rounded-[10px] flex items-center px-5 h-[35px]">
							{formik.values.account_number || '0000000000'}
						</span>
					</div>
				</label>

				{/* Withdraw From */}
				<label className="font-normal text-lg flex flex-col gap-1">
					Type Of Withdraw
					<div className="flex items-center gap-4 px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]">
						<select
							name="withdraw_from"
							className="text-sm font-normal outline-none w-full bg-transparent"
							onChange={formik.handleChange}
							value={formik.values.withdraw_from}
							required
						>
							<option value="" disabled>
								Select your choice
							</option>
							<option value="balance">Account Balance</option>
							<option value="referral">Referral Balance</option>
						</select>
					</div>
				</label>

				{/* Amount */}
				<label className="font-normal text-lg flex flex-col gap-1">
					Amount
					<input
						type="number"
						name="amount"
						placeholder="Enter Amount"
						className="placeholder:text-black text-sm font-normal outline-none px-[10px] h-[55px] w-full border border-[#2F5318]/80 rounded-[10px]"
						onChange={formik.handleChange}
						value={formik.values.amount}
						required
					/>
				</label>

				{/* Submit */}
				<button
					type="submit"
					className="text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318] mb-5"
				>
					Withdraw Request
				</button>
			</form>
		</div>
	);
};

export default WithdrawForm;
