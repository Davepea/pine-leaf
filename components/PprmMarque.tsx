"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const StatsMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const items = marquee.querySelectorAll(".marquee-item");

      // Clone items to enable infinite effect
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        marquee.appendChild(clone);
      });

      const totalWidth = marquee.scrollWidth / 2; // Half because we clone it

      gsap.to(marquee, {
        x: `-=${totalWidth}`,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="bg-green-50 py-10 overflow-hidden">
      <div className="">
        <div className="relative overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap w-max gap-6"
          >
            <div className="marquee-item flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
              <p className="small-header font-bold !text-[#2F5318] !text-[18px]">₦2 Billion+</p>
              <p className="text-gray-600">in Realtor Rewards Paid</p>
            </div>
            <div className="marquee-item flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
              <p className="small-header font-bold !text-[#2F5318] !text-[18px]">1,819+ Properties</p>
              <p className="text-gray-600">Successfully Allocated</p>
            </div>
            <div className="marquee-item flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
              <p className="small-header font-bold !text-[#2F5318] !text-[18px]">50+</p>
              <p className="text-gray-600">Active Estates Across Nigeria</p>
            </div>
            <div className="marquee-item flex-shrink-0 px-6 min-w-[200px] flex items-center gap-1">
              <p className="small-header font-bold !text-[#2F5318] !text-[18px]">1,819+</p>
              <p className="text-gray-600">Happy Landowners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsMarquee;
