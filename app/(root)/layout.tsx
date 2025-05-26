
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const layout = async ({ children }: { children: ReactNode}) => {

  return <main className='root-container'>
    <div className=' mx-auto '>

        <Navbar/>
        <div className=''>
            {children}

        </div>
        <Footer/>

    </div>
  </main>
}

export default layout