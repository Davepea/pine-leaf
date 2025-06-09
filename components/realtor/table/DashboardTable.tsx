import { useAuth } from '@/app/context/AuthContext';
import { getUser } from '@/lib/auth';
import { fetchNotification } from '@/utils/axiosInstance';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';

const DashboardTable = () => {
	const {user} = useAuth()
	const [notifications, setNotifications] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchNotification(user?.id);
				if (response.status === 200) {
					setNotifications(response.data.logs);
				} else {
					console.error(
						'Failed to fetch notifications:',
						response.data.message
					);
				}
			} catch (error: any) {
				console.error('Error fetching notifications:', error);
			}
		};
		fetchData();
	});
	return (
		<div className="bg-white rounded-[10px] pb-6 w-full overflow-x-auto">
			<div className="w-full">
				<div className="overflow-x-auto w-full mytable py-2">
					<table className="table border-b border-[#0000001A]">
						{/* head */}
						<thead className="text-lg text-[#000000]/80 font-medium">
							<tr>
								<th>ID</th>
								<th>Email</th>
								<th>
									Property <br />
									Name
								</th>
								<th>
									No. of <br />
									Plots
								</th>
								<th>
									Payment <br />
									Type
								</th>
								<th>
									Proof of <br />
									Payment
								</th>
								<th>Status</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody className="text-base text-[#000000]/80">
							{/* row 1 */}
							{notifications.map((notification: any, index: number) => (
								<tr key={index}>
									<td>{notification.id}</td>
									<td>{notification.email}</td>
									<td>{notification.property_name}</td>
									<td>{notification.no_of_plots}</td>
									<td>{notification.payment_type}</td>
									<td className="font-bold text-[#2F5318]">
										{notification.proof_of_payment}
									</td>
									<td>
										<button className="border border-[#2F5318]/15 text-[#2F5318] bg-[#DFF7EE]/80 h-[35px] px-[18px] rounded-[10px]">
											{notification.status}
										</button>
									</td>
									<td className="font-bold text-[#2F5318]">
										{new Date(notification.created_at).toLocaleDateString()}{' '}
										<br />
										{new Date(notification.created_at).toLocaleTimeString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-5 w-full justify-center">
					<Link
						href={'/'}
						className="flex gap-1 items-center w-max mx-auto text-[#2F5318] text-base font-bold"
					>
						See all <MdOutlineArrowOutward size={12} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DashboardTable;
