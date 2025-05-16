'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`${isLoading ? "invisible" : "visible"} transition-opacity duration-700`}>
        {children}
      </div>
    </>
  );
}
