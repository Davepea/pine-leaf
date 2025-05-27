'use client'
import Header from '@/components/admin/Header'
import { getToken } from '@/lib/auth'
import { createProperty } from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import React, { useState, useRef } from 'react'
import { MdOutlineImage, MdAdd, MdClose } from 'react-icons/md'
import { useFormik } from 'formik'
import Image from 'next/image'

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([])
    const fileInputRef = useRef(null)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: "",
            estate_name: "",
            description: "",
            location: "",
            size: "",
            land_condition: "",
            document_title: "",
            property_features: [""],
            type: "land",
            purpose: "residential",
            price: "",
            total_units: "",
            images: [], // Initialize as empty array
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

                Object.keys(values).forEach(key => {
                    if (key === 'property_features') {
                        const nonEmptyFeatures = values[key].filter(f => f.trim() !== "")
                        formData.append(key, JSON.stringify(nonEmptyFeatures))
                    } else if (key !== 'images') {
                        formData.append(key, values[key])
                    }
                })

                values.images.forEach((image) => {
                    formData.append('images[]', image)
                })

                const response = await createProperty(formData)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
    })

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        // Calculate remaining slots (max 3 images total)
        const remainingSlots = 3 - formik.values.images.length
        if (remainingSlots <= 0) {
            alert('Maximum of 3 images allowed')
            return
        }

        // Take only up to remaining slots
        const filesToAdd = files.slice(0, remainingSlots)

        // Add new files to existing images
        const updatedImages = [...formik.values.images, ...filesToAdd]
        formik.setFieldValue('images', updatedImages)

        // Create previews for new files
        const newPreviews = filesToAdd.map(file => URL.createObjectURL(file))
        setImagePreviews([...imagePreviews, ...newPreviews])

        // Reset file input to allow selecting same files again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const removeImage = (index) => {
        // Remove from previews
        const newPreviews = [...imagePreviews]
        URL.revokeObjectURL(newPreviews[index]) // Clean up memory
        newPreviews.splice(index, 1)
        setImagePreviews(newPreviews)

        // Remove from form values
        const newImages = [...formik.values.images]
        newImages.splice(index, 1)
        formik.setFieldValue('images', newImages)
    }

    const addFeature = () => {
        formik.setFieldValue('property_features', [...formik.values.property_features, ""])
    }

    const removeFeature = (index) => {
        const newFeatures = [...formik.values.property_features]
        newFeatures.splice(index, 1)
        formik.setFieldValue('property_features', newFeatures)
    }

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formik.values.property_features]
        newFeatures[index] = value
        formik.setFieldValue('property_features', newFeatures)
    }

    const fields = [
        { label: 'Property Name', name: 'name', type: 'text' },
        { label: 'Location', name: 'location', type: 'text' },
        { label: 'Price', name: 'price', type: 'number' },
        { label: 'Total Plots', name: 'total_units', type: 'number' },
        { label: 'Driving duration', name: 'duration', type: 'text' },
        // { label: 'Plot Size', name: 'size', type: 'text' },
        { label: 'Land Condition', name: 'land_condition', type: 'text' },
        { label: 'Title Document', name: 'document_title', type: 'text' },
    ]

    if (loading) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
            <Header />
            <div className="py-5 flex flex-col gap-5">
                <div className="bg-white p-[30px] w-full">
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-5">
                        <div className="grid md:grid-cols-2 gap-8 rounded-[10px]">
                            <div className="flex flex-col gap-8">
                                <h3 className='text-2xl text-black/80 font-bold'>Property Details</h3>
                                <div className='flex flex-col gap-[15px]'>
                                    {fields.slice(0, 4).map(({ label, name, type }) => (
                                        <label key={name} className='text-lg text-black/80 font-normal flex flex-col gap-1'>
                                            {label}
                                            <input
                                                type={type}
                                                name={name}
                                                onChange={formik.handleChange}
                                                value={formik.values[name]}
                                                className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                                required
                                            />
                                        </label>
                                    ))}

                                    <label className='text-lg text-black/80 font-normal flex flex-col gap-1'>
                                        Type
                                        <select
                                            name="type"
                                            onChange={formik.handleChange}
                                            value={formik.values.type}
                                            className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                            required
                                        >
                                            <option value="land">Land</option>
                                            <option value="house">House</option>
                                        </select>
                                    </label>

                                    <label className='text-lg text-black/80 font-normal flex flex-col gap-1'>
                                        Purpose
                                        <select
                                            name="purpose"
                                            onChange={formik.handleChange}
                                            value={formik.values.purpose}
                                            className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                            required
                                        >
                                            <option value="residential">Residential</option>
                                            <option value="commercial">Commercial</option>
                                        </select>
                                    </label>

                                    {fields.slice(4).map(({ label, name, type }) => (
                                        <label key={name} className='text-lg text-black/80 font-normal flex flex-col gap-1'>
                                            {label}
                                            <input
                                                type={type}
                                                name={name}
                                                onChange={formik.handleChange}
                                                value={formik.values[name]}
                                                className='w-full h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                                required
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <label className='flex flex-col gap-[10px] h-full text-2xl text-black/80 font-bold'>
                                    Description
                                    <textarea
                                        name="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        className='w-full md:h-[200px] h-[172px] p-4 border border-[#2F5318]/80 rounded-[10px] outline-none resize-none'
                                        required
                                    />
                                </label>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex justify-between items-center'>
                                        <h4 className='text-lg text-black/80 font-bold'>Property Features</h4>
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className='flex items-center gap-1 text-[#2F5318] text-sm font-medium'
                                        >
                                            <MdAdd size={20} />
                                            Add Feature
                                        </button>
                                    </div>

                                    {formik.values.property_features.map((feature, index) => (
                                        <div key={index} className='flex gap-2 items-center'>
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className='flex-1 h-[50px] px-4 border border-[#2F5318]/80 rounded-[10px] outline-none'
                                                placeholder={`Feature ${index + 1}`}
                                            />
                                            {formik.values.property_features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className='p-2 text-red-500'
                                                >
                                                    <MdClose size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <label className='text-lg text-black/80 font-normal flex flex-col gap-[10px] h-full'>
                                    Images (Max. 3)
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-center md:h-[150px] h-[200px] w-full border border-dashed border-[#2F5318]/80 rounded-[10px] outline-none">
                                            <div className="flex flex-col justify-center items-center text-center gap-5 px-4">
                                                <MdOutlineImage size={80} className='text-[#2F5318]/75' />
                                                <input
                                                    type="file"
                                                    name="images"
                                                    id="images"
                                                    onChange={handleImageChange}
                                                    multiple
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    className='w-fit h-full px-4 outline-none border-0 text-black/80 border-input bg-white text-sm file:border file:border-[#2F5318]/20 file:rounded-[10px] file:text-black/80 file:text-sm file:p-2 file:font-medium'
                                                />
                                                <p className="text-sm text-gray-500">
                                                    {formik.values.images.length > 0
                                                        ? `${formik.values.images.length} image(s) selected`
                                                        : "Click to select images"}
                                                </p>
                                            </div>
                                        </div>
                                        {imagePreviews.length > 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {imagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative">
                                                        <Image
                                                            width={80}
                                                            height={80}
                                                            src={preview}
                                                            alt="Preview"
                                                            className="w-20 h-20 object-cover rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                        >
                                                            <MdClose size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='text-white text-xl font-bold bg-[#2F5318] border-none outline-none rounded-[10px] h-[50px] px-[30px] w-max mx-auto disabled:opacity-50'
                        >
                            {loading ? 'Uploading...' : 'Upload Property'}
                        </button>
                    </form>
                </div >
            </div >
        </div >
    )
}

export default Page