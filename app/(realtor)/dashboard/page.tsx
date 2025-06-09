'use client'

import React, { useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import BalanceCard from '@/components/realtor/dashboard/BalanceCard'
import Properties from '@/components/realtor/Properties'
import Header from '@/components/realtor/Header'
import DashboardTable from '@/components/realtor/table/DashboardTable'
import { fetchEachUser } from '@/utils/axiosInstance'

const RealtorDashboard = () => {
  const [user, setUser, removeUser, isClient] = useLocalStorage('user', null)
  const router = useRouter()

  useEffect(() => {
    if (!isClient) return

    const fetchUserData = async () => {
      try {
        const response = await fetchEachUser()

        if (response.status === 200) {
          const userData = response.data.data
          setUser(userData)
        } else {
          console.error('Failed to fetch user data:', response.data.message)
        }
      } catch (error: any) {
        if (error?.status?.toString() === '401') {
          removeUser()
          router.push('/login')
        }
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [router, isClient, setUser, removeUser])

  if (!isClient) {
    return (
      <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
        <div className="flex items-center justify-center h-full">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
      <Header />
      <div className="py-5 flex flex-col gap-10">
        <BalanceCard />
        <div className="flex flex-col gap-4">
          <h3 className="text-[#000000]/80 text-xl font-bold">Transactions</h3>
          <DashboardTable />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[#000000]/80 text-xl font-bold">Find your best land</h3>
          <Properties />
        </div>
      </div>
    </div>
  )
}

export default RealtorDashboard
