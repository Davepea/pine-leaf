'use client'
import Header from '@/components/admin/Header'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { MdOutlineFilterAlt, MdOutlineFormatListBulleted, MdOutlineImage, MdSearch } from 'react-icons/md'

interface FormValues {
    type: string;
    images: File[];
}

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [previews, setPreviews] = useState<string[]>([])
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const formik = useFormik<FormValues>({
        initialValues: {
            type: "land",
            images: [],
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
                formData.append('type', values.type)

                // Append each image file
                values.images.forEach((image) => {
                    formData.append('images[]', image)
                })

                const response = await axios.post(
                    'https://pineleaflaravel.sunmence.com.ng/public/api/gallery',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )

                console.log('Success:', response.data)
                alert('Images uploaded successfully!')
                formik.resetForm()
                setPreviews([])
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
            }
            catch (err) {
                console.error("Error:", err)
                alert('Error uploading images')
            }
            finally {
                setLoading(false)
            }
        }
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            const filesArray = Array.from(event.currentTarget.files)
            formik.setFieldValue('images', [...formik.values.images, ...filesArray])

            // Create previews
            const newPreviews = filesArray.map(file => URL.createObjectURL(file))
            setPreviews([...previews, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        const newImages = [...formik.values.images]
        newImages.splice(index, 1)
        formik.setFieldValue('images', newImages)

        const newPreviews = [...previews]
        URL.revokeObjectURL(newPreviews[index])
        newPreviews.splice(index, 1)
        setPreviews(newPreviews)
    }

    if (loading) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className="flex justify-between items-center">
                    <form className='h-[40px] md:w-[386px] w-[185px]'>
                        <label htmlFor="search" className='md:px-5 px-3 border border-[#2F5318]/20 h-full w-full rounded-[10px] flex items-center text-[#000000]/40'>
                            <input type="text" name="search" id="search" placeholder='Search gallery' className='h-[40px] w-full outline-none border-none placeholder:text-[#000000]/80' />
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
                        <h2 className='text-2xl font-bold'>Upload Gallery Images</h2>
                        <label className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-1'>
                            Type
                            <select
                                name="type"
                                id="type"
                                onChange={formik.handleChange}
                                value={formik.values.type}
                                className='w-full select bg-transparent h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                required
                            >
                                <option value="land">Land</option>
                                <option value="house">House</option>
                            </select>
                        </label>

                        <label className='md:text-base text-sm text-black/80 font-normal flex flex-col gap-[10px] h-full'>
                            Images
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center md:h-[150px] h-[100px] w-full border border-dashed border-[#2F5318]/80 rounded-[10px] outline-none">
                                    <div className="flex flex-col justify-center items-center text-center gap-5 px-4">
                                        <MdOutlineImage size={35} className='text-[#2F5318]/75' />
                                        <input
                                            type="file"
                                            name="images"
                                            id="images"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            multiple
                                            className='w-fit h-full px-4 outline-none border-0 text-black/80 border-input bg-white text-sm file:border file:border-[#2F5318]/20 file:rounded-[10px] file:text-black/80 file:text-sm file:p-2 file:font-medium'
                                        />
                                    </div>
                                </div>

                                {/* Image previews */}
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index}`}
                                                    className="w-full h-24 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={loading || formik.values.images.length === 0}
                            className='bg-[#2F5318] text-white rounded-[10px] h-[50px] mt-4 disabled:opacity-50 w-fit px-10 self-end'
                        >
                            {loading ? 'Uploading...' : 'Upload Images'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page