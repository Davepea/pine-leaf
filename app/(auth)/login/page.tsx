import LoginForm from '@/components/LoginForm'
import React from 'react'

const page = () => {
  return (
     <>
       <section>
         <div className="bg-[url('/img/pine-1.png')] bg-cover bg-no-repeat md:p-[5.4vw] flex items-center justify-center text-white ">
           <div className='text-center flex flex-col gap-[1.2vw] items-center'>
             <h1 className=' md:text-[56px] font-lato'>
             Welcome back
             </h1>
             <div className='flex items-center gap-[14px]'>
                <p>
                Home
                </p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </div>
                <p>
                Register
                </p>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </div>
                <p>
                Login
                </p>
             </div>
           </div>
         </div>
         <div>
           <LoginForm/>
         </div>
       </section>
       </>
  )
}

export default page