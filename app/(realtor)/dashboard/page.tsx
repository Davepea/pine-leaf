
// "use client"
// import BalanceCard from '@/components/realtor/dashboard/BalanceCard'
// import Properties from '@/components/realtor/Properties'
// import Header from '@/components/realtor/Header'
// import DashboardTable from '@/components/realtor/table/DashboardTable'
// import React, { useEffect } from 'react'
// import { fetchEachUser } from '@/utils/axiosInstance'
// import { useRouter } from 'next/navigation'

// const RealtorDashboard = () => {
//     const [user, setUser] = React.useState(null)
//     const router = useRouter()
//     useEffect(()=>{
//         const fetchUserData = async () => {
//             try{
//                 const response = await fetchEachUser()
//                 // console.log('====================================');
//                 // console.log('User data fetched successfully:', response.data);
//                 // console.log('====================================');
//                 if (response.status === 200) {
//                     localStorage.setItem('user', JSON.stringify(response.data))
//                     setUser(response.data.data)
//                 } else {
//                     console.error('Failed to fetch user data:', response.data.message)
//                 }
//             } catch (error: any) {
//                 if(error.status.toString() === '401') {
//                     localStorage.removeItem('user')
//                     router.push('/login')
//                 }
//                 console.error('Error fetching user data:', error)
//             }
//         }
//         fetchUserData()
//     },[router])
//     return (
//         <div>
//             <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
//                 <Header />
//                 <div className="py-5 flex flex-col gap-10">
//                     <BalanceCard />
//                     <div className="flex flex-col gap-4">
//                         <h3 className='text-[#000000]/80 text-xl font-bold'>Transactions</h3>
//                         <DashboardTable />
//                     </div>
//                     <div className="flex flex-col gap-4">
//                         <h3 className='text-[#000000]/80 text-xl font-bold'>Find your best land</h3>
//                         <Properties />
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default RealtorDashboard
