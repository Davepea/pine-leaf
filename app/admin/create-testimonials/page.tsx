'use client'
import Header from '@/components/admin/Header'
import TestimonialTable from '@/components/admin/table/TestimonialTable'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { MdOutlineFilterAlt, MdOutlineFormatListBulleted, MdOutlineImage, MdSearch } from 'react-icons/md'
import { toast } from 'sonner'

interface FormValues {
    name: string;
    position: string;
    rating: string;
    message: string;
    image: File | null;
}

const Page = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            position: "",
            rating: "5",
            message: "",
            image: null,
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const formData = new FormData()
                formData.append('name', values.name)
                formData.append('position', values.position)
                formData.append('rating', values.rating)
                formData.append('message', values.message)
                if (values.image) {
                    formData.append('image', values.image)
                }

                const response = await axios.post(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/testimonials',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                console.log('Success:', response.data.data)
                toast.success('Testimonial added successfully!')
                window.location.reload()
                formik.resetForm()
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
            }
            catch (err) {
                console.error("Error:", err)
                alert('Error adding testimonial')
            }
            finally {
                setLoading(false)
            }
        }
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            formik.setFieldValue('image', event.currentTarget.files[0])
        }
    }

    const fields = [
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Position', name: 'position', type: 'text' },
    ]

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-full">
    //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
    //         </div>
    //     )
    // }

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className="flex justify-between items-center">
                    <form className='h-[40px] md:w-[386px] w-[185px]'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input type="text" name="search" id="search" placeholder='Search Testimonials' className='h-[40px] w-full outline-none border-none placeholder:text-[#000000]/80' />
                            <MdSearch size={20} />
                        </label>
                    </form>
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center gap-2 border border-[#2F5318]/20 md:px-[15px] px-2 h-[40px] rounded-[10px] text-[#2F531833]">
                            <MdOutlineFilterAlt size={20} className='text-[#2F5318]' />
                            <span className='text-[#000000]/80 md:text-base text-sm'>Filter</span>
                        </div>
                        <div className="flex items-center gap-2 border border-[#2F5318]/20 md:px-[15px] px-2 h-[40px] rounded-[10px] text-[#2F531833]">
                            <MdOutlineFormatListBulleted size={20} className='text-[#2F5318]' />
                        </div>
                    </div>
                </div>
                <div className="py-5 gap-5">
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4 md:p-10 p-5 bg-white rounded-3xl">
                        <h2 className='text-2xl font-bold'>Create Testimonials</h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4">
                            {fields.map(({ label, name, type }) => (
                                <label key={name} className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-1'>
                                    {label}
                                    <input
                                        type={type}
                                        name={name}
                                        onChange={formik.handleChange}
                                        value={formik.values[name as keyof FormValues]}
                                        className='input bg-transparent max-w-full w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                        required
                                    />
                                </label>
                            ))}
                        </div>
                        <label className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-1'>
                            Rating
                            <select
                                name="rating"
                                id="rating"
                                onChange={formik.handleChange}
                                value={formik.values.rating}
                                className='w-full select bg-transparent h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num.toString()}>{num}</option>
                                ))}
                            </select>
                        </label>
                        <label className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-1'>
                            Comment
                            <textarea
                                name="message"
                                id="message"
                                onChange={formik.handleChange}
                                value={formik.values.message}
                                className='w-full md:h-[100px] h-[75px] md:text-base text-sm font-normal p-4 border border-[#2F5318]/80 rounded-[10px] outline-none resize-none'
                                required
                            />
                        </label>
                        <label className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-[10px] h-full'>
                            Image
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center md:h-[150px] h-[100px] w-full border border-dashed border-[#2F5318]/80 rounded-[10px] outline-none">
                                    <div className="flex flex-col justify-center items-center text-center gap-5 px-4">
                                        <MdOutlineImage size={35} className='text-[#2F5318]/75' />
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className='w-fit h-full px-4 outline-none border-0 text-black/80 border-input bg-white text-sm file:border file:border-[#2F5318]/20 file:rounded-[10px] file:text-black/80 file:text-sm file:p-2 file:font-medium'
                                        />
                                    </div>
                                </div>
                            </div>
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className='bg-[#2F5318] text-white rounded-[10px] h-[50px] mt-4 disabled:opacity-50 w-fit px-10'
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                    <TestimonialTable />
                </div>
            </div>
        </div>
    )
}

export default Page