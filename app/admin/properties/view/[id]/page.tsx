'use client'
import Header from '@/components/admin/Header'
import { getToken } from '@/lib/auth'
import axios from 'axios'
import { useFormik } from 'formik'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export interface Property {
    id: number,
    name: string,
    estate_name: string,
    description: string,
    images: string[],
    location: string,
    landmark: string[],
    size: string,
    land_condition: string,
    document_title: string,
    property_features: string[],
    type: string,
    purpose: string,
    price: string,
    total_units: number,
    unit_sold: number,
    flyer: string,
    created_at: string,
    updated_at: string
}

const PropertyPage = () => {
    const [loading, setLoading] = useState(false)
    const [property, setProperty] = useState<Property | null>(null)
    const [initialLoad, setInitialLoad] = useState(true)
    const router = useRouter()
    const params = useParams()
    const id = params.id

    // Helper function to parse stringified arrays
    const parseArrayField = (field: string | string[]) => {
        if (Array.isArray(field)) return field;
        try {
            return JSON.parse(field) || [];
        } catch {
            return [];
        }
    }

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setInitialLoad(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                const response = await axios.get(
                    `https://pineleaflaravel.sunmence.com.ng/public/api/properties/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )

                const propertyData = response.data.data
                setProperty(propertyData)

                // Parse stringified arrays
                // const images = parseArrayField(propertyData.images)
                const landmarks = parseArrayField(propertyData.landmark)
                const features = parseArrayField(propertyData.property_features)

                // Set formik initial values with the fetched property data
                formik.setValues({
                    name: propertyData.name,
                    estate_name: propertyData.estate_name,
                    description: propertyData.description,
                    location: propertyData.location,
                    size: propertyData.size,
                    land_condition: propertyData.land_condition,
                    document_title: propertyData.document_title,
                    type: propertyData.type,
                    purpose: propertyData.purpose,
                    price: propertyData.price,
                    total_units: propertyData.total_units,
                    unit_sold: propertyData.unit_sold,
                    landmark: landmarks.join(', '),
                    property_features: features.join(', ')
                })
            } catch (error) {
                console.error('Error fetching property:', error)
                toast.error('Failed to load property data')
            } finally {
                setInitialLoad(false)
            }
        }

        if (id) {
            fetchProperty()
        }
    }, [id, router])

    const formik = useFormik({
        initialValues: {
            name: "",
            estate_name: "",
            description: "",
            location: "",
            size: "",
            land_condition: "",
            document_title: "",
            type: "",
            purpose: "",
            price: "",
            total_units: 0,
            unit_sold: 0,
            landmark: "",
            property_features: ""
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const token = getToken()
                if (!token) {
                    router.push('/login')
                    return
                }

                // Convert comma-separated strings back to arrays
                const payload = {
                    ...values,
                    landmark: values.landmark.split(',').map(item => item.trim()),
                    property_features: values.property_features.split(',').map(item => item.trim()),
                    property_id: id
                }

                const response = await axios.put(
                    `https://pineleaflaravel.sunmence.com.ng/public/api/properties/${id}`,
                    payload,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    }
                )
                console.log('Success:', response.data)
                toast.success('Property updated successfully!')
            } catch (error) {
                console.error('Full error:', error)
                if (axios.isAxiosError(error) && error.response) {
                    const errorMessage = error.response.data.message || 'Server error occurred'
                    toast.error(`Error: ${errorMessage}`)
                } else {
                    toast.error('Network error occurred. Please try again.')
                }
            } finally {
                setLoading(false)
            }
        }
    })

    const fields = [
        { name: "name", type: "text", label: "Property Name" },
        { name: "estate_name", type: "text", label: "Estate Name" },
        { name: "description", type: "text", label: "Description" },
        { name: "location", type: "text", label: "Location" },
        { name: "size", type: "text", label: "Plot Size" },
        { name: "land_condition", type: "text", label: "Land Condition" },
        { name: "document_title", type: "text", label: "Document Title" },
        { name: "type", type: "text", label: "Property Type" },
        { name: "purpose", type: "text", label: "Purpose" },
        { name: "price", type: "number", label: "Price" },
        { name: "total_units", type: "number", label: "Total Units" },
        { name: "unit_sold", type: "number", label: "Units Sold" },
        { name: "landmark", type: "text", label: "Landmarks (comma separated)" },
        { name: "property_features", type: "text", label: "Features (comma separated)" },
    ]

    if (initialLoad) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2F5318]"></div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className='bg-white rounded-[10px] p-6 w-full text-center'>
                Property not found
            </div>
        )
    }

    // Parse images and other array fields
    // const images = parseArrayField(property.images)
    // const landmarks = parseArrayField(property.landmark)
    // const features = parseArrayField(property.property_features)

    return (
        <div>
            <div className="md:px-10 px-6 w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col gap-5">
                <Header />
                <div className='bg-white flex flex-col gap-7 p-[30px] rounded-[10px] text-black/80'>
                    <h3 className='font-bold text-2xl'>Property ({id}) Details</h3>

                    {/* Image Gallery - View Only */}
                    {/* <div className='mb-6'>
                        <h4 className='font-semibold text-lg mb-3'>Property Images</h4>
                        <div className='grid grid-cols-3 gap-4'>
                            {images.map((image, index) => (
                                <div key={index} className='relative h-48 rounded-lg overflow-hidden'>
                                    <Image
                                        width={50} height={50}
                                        src={image.startsWith('/storage') ?
                                            `https://pineleaflaravel.sunmence.com.ng/${image}` :
                                            image}
                                        alt={`Property image ${image}`}
                                        fill
                                        className='object-cover'
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Flyer Image */}
                    {/* {property.flyer && (
                        <div className='mb-6'>
                            <h4 className='font-semibold text-lg mb-3'>Property Flyer</h4>
                            <div className='relative h-96 w-full rounded-lg overflow-hidden'>
                                <Image
                                    src={property.flyer.startsWith('/storage') ?
                                        `https://pineleaflaravel.sunmence.com.ng/${property.flyer}` :
                                        property.flyer}
                                    alt="Property flyer"
                                    fill
                                    className='object-contain'
                                    sizes="100vw"
                                />
                            </div>
                        </div>
                    )} */}

                    {/* Editable Form Fields */}
                    <form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-x-9 gap-y-5'>
                        {fields.map(({ name, type, label }) => (
                            <label key={name} className='font-normal text-base flex items-center justify-between w-full border border-[#2F5318]/80 rounded-[10px] p-1'>
                                <span className="w-full pl-2">{label}</span>
                                <div className="flex items-center gap-4 px-[10px] h-[40px] w-full border border-[#2F5318]/80 rounded-[8px]">
                                    <input
                                        type={type}
                                        name={name}
                                        id={name}
                                        value={formik.values[name]}
                                        onChange={formik.handleChange}
                                        className='placeholder:text-black text-sm font-normal outline-none w-full'
                                        required
                                    />
                                </div>
                            </label>
                        ))}
                        <button
                            type='submit'
                            className='text-white text-xl font-bold h-[50px] w-max px-[30px] rounded-[10px] bg-[#2F5318]/60 mb-5'
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Property'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage