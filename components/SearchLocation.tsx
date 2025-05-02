import React from 'react'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

const SearchLocation = () => {
  return (
    <>
    <div className=' bg-white max-w-[647px]  p-[12px] rounded-xl h-full overflow-hidden'>
      
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center'>
          <div className=' md:col-span-3'>
          <input type="search" placeholder='Enter Location or City'  className='w-full md:border-0 md:border-r-2 border-b-2  border-[#0000002B] !h-[44px]'/>

          </div>
          <div className='md:col-span-2 flex gap-4 items-center justify-between'>
              <div className=' flex md:flex-col items-center gap-2 '>
                  <span>Budget Range</span>
                  <div className='flex items-center'>
                    <small>
                    ₦0.00 - ₦0.00
                    </small>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                 
                  </div>
              </div>
              <div className='flex justify-center items-center h-full'>
                <Button  className='text-white bg-[#2F5318]  h-full w-full md:!px-[20px] md:py-[15px]'>
                  <SearchIcon/>
                </Button>
              </div>
          </div>
        </div>
    
       
    </div>
    </>
  )
}

export default SearchLocation