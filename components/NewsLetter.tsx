'use client'; // for Next.js App Router (if applicable)

import { useState } from 'react';
import { toast } from 'sonner';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 

  const handleSubscribe = async (): Promise<void> => {
    if (!email || !validateEmail(email)) {
     
      return;
    }

    setLoading(true);


    try {
      const response = await fetch('https://pineleaflaravel.sunmence.com.ng/public/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: { message?: string } = await response.json();

      if (response.ok) {
 
        setEmail('');
        toast.success('Successfully subscribed!');
        
      } else {
        
        toast.error(data.message || 'Subscription failed.');
      }
    } catch (error) {
     
      toast.error('An error occurred. Please try again later.')
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
    
        <h3 className="text-lg font-bold mb-5">Our Newsletter</h3>
        <p className="font-roboto font-light text-sm mb-8">
          Your Gateway to a World of Real Estate: Explore, Engage, and Empower with our Exclusive Newsletter Subscription!
        </p>
        <div className="flex md:flex-row flex-col md:bg-[#4b6b4c] bg-none gap-y-[18px] backdrop-blur-2xl bg-gradient-to-r rounded-xl overflow-hidden">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 flex-1 !h-[42px] md:bg-none bg-[#4b6b4c] rounded-l-md text-black"
            disabled={loading}
          />
         <div>
             <button
            onClick={handleSubscribe}
            className="bg-[#E6FFF6] p-3 px-6 text-green-900 font-bold px-4 md:rounded-none md:rounded-r-md rounded-md"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
         </div>
        </div>
        

    </>
  );
}
