"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setIsMobile] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Service", href: "/service" },
    { name: "Property", href: "/property" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Investment Plan", href: "https://investment.pineleafestates.com/" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="md:bg-[#E6FFF6] px-[6.1458vw] py-3 md:relative absolute z-50 right-0 left-0 md:top-0 top-5 ">
        <nav className="w-full">
          <div className="max-w-8xl mx-auto  sm:px-6 ">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Image
                    src="/img/logo.png"
                    alt="Eagle Ventures Logo"
                    width={78}
                    height={78}
                    className="h-[78px] w-auto"
                  />
                </Link>
              

              </div>

              <div className="hidden md:flex md:items-center md:space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-green-600 px-3 py-2 md:text-lg font-[400] text-xs transition duration-150 ease-in-out"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="ml-4 px-4 py-2 border border-transparent md:text-lg text-sm  font-medium rounded-md text-white bg-[#000000CC]  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center"
                >
                  Register/Login
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>


              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md bg-white text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>


          {isOpen && (
            <div className="md:hidden ">
              <div className="flex justify-center pt-4 pb-3">
                <Link href="/">
                  {/* <Image
                  src="/img/logo.png"
                  alt="Pine-leaf Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                /> */}
                </Link>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1 !z-50 relative bg-white sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-green-600 block px-3 py-2 text-base font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex justify-center mt-4">
                  <Link
                    href="/login"
                    className="w-3/4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white  bg-[#000000CC] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex justify-center items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register/Login
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;