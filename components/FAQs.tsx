"use client";

import {  useState } from "react";
import { ChevronDown } from "lucide-react";



const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  const faqs = [
    {
      question: "Is Pineleaf Estates registered and trusted?",
      answer:
        "Yes. Pineleaf Estates is fully registered and operates with transparency and integrity. We have a strong track record of successful real estate developments and happy clients."
    },
    {
      question: "How do I join the PRRM?",
      answer:
        "You can join by registering with a one-time fee of ₦50,000. Once registered, you’ll earn 10% commission on sales and 4% from your downline’s sales. Visit the PRRM section on our website to register."
    },
    {
      question: "What documents are included during purchase?",
      answer:
        "You’ll receive a Deed of Assignment, Registered Survey, and Receipt of Payment. We also offer support in obtaining your Certificate of Occupancy or Governor’s Consent if required."
    },
    {
      question: "Can I pay for lands in installments?",
      answer:
        "Yes! We offer flexible payment plans across many of our estates. You can choose monthly or milestone-based payments based on the plan you select."
    },
    {
      question: "Where are your estates located?",
      answer:
        "Our estates are strategically located across major growth zones in Nigeria. For the full list of locations, please visit the Properties section on our website."
    },
    {
      question: "What ROI (Return on Investment) do you offer?",
      answer:
        "We offer two fixed investment plans:\n- 25% ROI after 6 months\n- 50% ROI after 12 months"
    },
    {
      question: "Can I withdraw my ROI anytime?",
      answer:
        "No. ROI is only available at the end of your selected investment duration. You’ll be notified via email and dashboard alert. You can then choose to reinvest or withdraw your ROI to your bank account."
    },
    {
      question: "Can I become a Realtor and an Investor at the same time?",
      answer:
        "Yes. You can register for both. You’ll have access to separate dashboards and can switch between roles easily."
    }
  ];

  return (
    <section className="pb-[100px]">
      <div className="header">
        <h1 className="head-2 text-center">What Our Clients & Realtors Are Saying</h1>
      </div>
      <div className="space-y-4 mx-auto">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border-2 border-[#2F531833] rounded-lg md:py-9 py-7 md:px-5 px-4 h-full cursor-pointer group md:text-[20px] text-[16px]"
          >
            <div
              onClick={() =>
                setOpenIndex(idx === openIndex ? null : idx)
              }
              className="flex justify-between items-center font-semibold"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-4 w-5 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === idx && (
              <p className="text-gray-600 pt-4 pl-1 whitespace-pre-line">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
