
import Footer from '@/components/Footer';
import React, { ReactNode } from 'react';


const layout = async ({ children }: { children: ReactNode}) => {

  return <main className='root-container'>
    <div className=' mx-auto '>

        
        <div className=''>
            {children}

        </div>
        <Footer/>
        

    </div>
  </main>
}

export default layout