import React, { Suspense } from 'react'
import PropertiesSortPage from './PropertySortPage'
import Loader from '@/components/Loader'

const page = () => {
  return (
    <Suspense fallback={<Loader/>} >
      <PropertiesSortPage />
    </Suspense>
  )
}

export default page
