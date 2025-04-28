import React from 'react'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

const SearchLocation = () => {
  return (
    <>
    <div className='flex bg-white max-w-[647px] items-center p-[12px] rounded-xl '>
        <div className='grid grid-cols-5 size-14 grow items-center'>
          <div className=' col-span-4'>
          <input type="search" placeholder='Enter Location or City'  className='w-full'/>

          </div>
          <div className='col-span-1'>
              <div>
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
          </div>
          </div>
          <div >

        </div>
        <div className='size-14 flex-none flex justify-center items-center'>
          <Button  className='text-white  h-full w-full'>
            <SearchIcon/>
          </Button>
        </div>
    </div>
    </>
  )
}

export default SearchLocation