
"use client"
import BalanceCard from '@/components/realtor/dashboard/BalanceCard'
import Properties from '@/components/realtor/Properties'
import Header from '@/components/realtor/Header'
import DashboardTable from '@/components/realtor/table/DashboardTable'
import React, { useEffect, useState } from 'react'
import { fetchEachUser } from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { MdSearch } from 'react-icons/md'

const RealtorDashboard = () => {
    // const [user, setUser] = React.useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const {setProfile} = useAuth()
    const router = useRouter()
    useEffect(()=>{
        const fetchUserData = async () => {
            try{
                const response = await fetchEachUser()
                if (response.status === 200) {
                    setProfile(response.data?.data.user)
                } else {
                    console.error('Failed to fetch user data:', response.data.message)
                }
            } catch (error: any) {
                if(error.status.toString() === '401') {
                    router.push('/login')
                }
                console.error('Error fetching user data:', error)
            }
        }
        fetchUserData()
    },[router])
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="md:py-5 py-[10px] flex flex-col gap-[36px] ">
                         <form onSubmit={(e) => e.preventDefault()} className='h-[50px] md:w-full w-full md:hidden block' >
                                            <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                                                <input type="text" name="search" id="search" placeholder='Search transactions' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='h-[45px] w-full outline-none border-none placeholder:text-[#000000]/80' />
                                                <MdSearch size={22} />
                                            </label>
                        </form>
                    <BalanceCard />
                    <div className="flex flex-col gap-4">
                        <h3 className='text-[#000000]/80 text-xl font-bold'>Transactions</h3>
                        <DashboardTable />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className='text-[#000000]/80 text-xl font-bold'>Find your best land</h3>
                        <Properties />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RealtorDashboard
