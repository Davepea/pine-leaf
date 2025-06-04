// app/property/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/realtor/Header';
import { Property } from '@/types/property';
import { fetchEachProperty } from '@/utils/axiosInstance';
import { useParams, useRouter } from 'next/navigation';
import BuyPropertyModal from '@/components/modals/BuyPropertyModal';

export default function PropertyPage() {
	const params = useParams();
	// const router = useRouter();
	const [property, setProperty] = useState<Property | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProperty = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setError('Authentication token not found');
				return;
			}

			try {
				const res = await fetchEachProperty(params?.id as string, token);
				console.log(res.data.data)
				setProperty(res.data.data);
			} catch (err) {
				console.error('Error fetching property:', err);
				setError('Property not found');
			}
		};

		if (params?.id) {
			fetchProperty();
		}
	}, [params?.id]);

	if (error) {
		return (
			<div className="h-screen flex items-center justify-center text-red-600">
				<p>{error}</p>
			</div>
		);
	}

	if (!property) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p>Loading property...</p>
			</div>
		);
	}

	return (
		<div className="md:px-10 px-6 w-full h-screen overflow-y-scroll">
			<Header />
			<div className="py-5 flex flex-col">
				<div className="container mx-auto px-[6.2vw] py-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Property Images */}
						<div className="md:col-span-1 flex flex-col gap-[25px]">
							{[1, 2, 2].map((idx, i) => (
								<div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
									<Image
										// src={property?.images[idx] || property?.images[0] || ''}
										src={''}
										alt={property?.name}
										width={600}
										height={500}
										className="w-full h-auto"
									/>
								</div>
							))}
						</div>

						{/* Property Details */}
						<div className="md:col-span-2">
							<div className="bg-white rounded-lg p-6 flex flex-col gap-[30px]">
								<div>
									<h2 className="text-2xl font-semibold text-[#2F5318]">{property?.name}</h2>
									<h3 className="text-xl font-medium mt-1">{property?.estate}</h3>
								</div>

								<p className="mt-4 text-grey-600">{property?.description}</p>

								{/* Landmarks */}
								<div className="mt-6">
									<h4 className="text-lg font-semibold mb-3">Landmarks</h4>
									<div className="space-y-2">
										<div className="flex items-start space-x-2">
											<span className="text-green-600 mt-1">
												<LocationIcon />
											</span>
											<span>
												<strong>Location:</strong> {property?.landmarks?.location}
											</span>
										</div>
										{property?.landmarks?.map((proximity, index) => (
											<div key={index} className="flex items-start space-x-2">
												<span className="text-green-600 mt-1">
													<LocationIcon />
												</span>
												<span>{proximity}</span>
											</div>
										))}
									</div>
								</div>

								{/* Overview */}
								<div className="mt-6">
									<h4 className="text-lg font-semibold mb-3">Property Overview</h4>
									<div className="border-t border-gray-200 pt-2">
										{[
											['Size', property?.overview?.size],
											['Land Condition', property?.overview?.landCondition],
											['Title Document', property?.overview?.titleDocument],
										]?.map(([label, value], i) => (
											<div key={i} className="flex py-2 border-b border-gray-100">
												<span className="font-medium w-40">{label}:</span>
												<span className="text-[#2F5318]">{value}</span>
											</div>
										))}
									</div>
								</div>

								{/* Features */}
								<div className="mt-6">
									<h4 className="text-lg font-semibold mb-3">Property Features</h4>
									<div className="space-y-2">
										{property?.features?.map((feature, index) => (
											<div key={index} className="flex items-start space-x-2">
												<span className="text-green-600 mt-1">
													<CheckIcon />
												</span>
												<span>{feature?.name}</span>
											</div>
										))}
									</div>
								</div>

								{/* CTA Buttons */}
								{/* <div className="mt-8 flex flex-wrap gap-4">
									{['Book Site Inspection', 'Request More Info', 'Download Flyer'].map(
										(label, i) => (
											<button
												key={i}
												className="inline-flex items-center px-4 py-2 border border-[#2F5318] text-[#2F5318] bg-white rounded hover:bg-green-50 transition"
											>
												{label}
											</button>
										)
									)}
								</div> */}

									<BuyPropertyModal property_purchased_id={property?.id} propertyAmount={property?.price} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Icons
function LocationIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fillRule="evenodd"
				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
