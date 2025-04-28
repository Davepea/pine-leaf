
import Sidebar from '@/components/dashboard-components/Sidebar';
import React, { ReactNode } from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';


const layout = async ({ children }: { children: ReactNode }) => {

  return <main className='root-container'>
    <div className='w-full flex'>

      {/* <Navbar/> */}
      <Sidebar />
      <div className='w-full bg-[#E6FFF6F6]'>
        {children}

      </div>
      {/* <Footer/> */}

    </div>
  </main>
}

export default layout