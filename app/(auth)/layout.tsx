
import React, { ReactNode } from 'react';


const layout = async ({ children }: { children: ReactNode}) => {

  return <main className='root-container'>
    <div className=' mx-auto max-w-7xl'>

        
        <div className=''>
            {children}

        </div>
        

    </div>
  </main>
}

export default layout