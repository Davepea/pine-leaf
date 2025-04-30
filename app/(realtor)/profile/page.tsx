import Header from '@/components/realtor/Header'
import ProfileForm from '@/components/realtor/profile/ProfileForm'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
                <Header />
                <div className="py-5 flex flex-col gap-10">
                    <ProfileForm />
                </div>
            </div>
        </div>
    )
}

export default page
