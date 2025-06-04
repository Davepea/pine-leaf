'use client'
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        router.push('/login');
    };

    return (
        <div className='rounded-[5px]'>
            <div onClick={handleLogout} className='flex items-center gap-2 text-sm px-2 py-2'>
                <svg className='w-[18px] h-[16px] flex items-center' width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.75 4L9.6925 5.0575L10.8775 6.25H4.75V7.75H10.8775L9.6925 8.935L10.75 10L13.75 7L10.75 4ZM1.75 1.75H7V0.25H1.75C0.925 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.925 13.75 1.75 13.75H7V12.25H1.75V1.75Z" fill="black" fillOpacity="0.8" />
                </svg>
                <span>Logout</span>
            </div>
        </div>
    );
};

export default LogoutBtn;