import Properties from '@/components/realtor/Properties'
import Header from '@/components/realtor/Header'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col">
                    <Properties isAllPropertiesPage={true} />
                </div>
            </div>
        </div>

    )
}

export default page
