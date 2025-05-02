import React from 'react';
import { DownloadIcon } from 'lucide-react';

interface InvestmentTier {
  investment: string;
  roiSixMonths: string;
  roiTwelveMonths: string;
}

const InvestmentTable: React.FC = () => {
  const investmentTiers: InvestmentTier[] = [
    {
      investment: 'N200,000',
      roiSixMonths: 'N250,000',
      roiTwelveMonths: 'N300,000',
    },
    {
      investment: 'N500,000',
      roiSixMonths: 'N625,000',
      roiTwelveMonths: 'N750,000',
    },
    {
      investment: 'N1,000,000',
      roiSixMonths: 'N1,250,000',
      roiTwelveMonths: 'N1,500,000',
    },
    {
      investment: 'N5,000,000',
      roiSixMonths: 'N6,250,000',
      roiTwelveMonths: 'N7,500,000',
    },
    {
      investment: 'N10,000,000',
      roiSixMonths: 'N12,500,000',
      roiTwelveMonths: 'N15,000,000',
    },
    {
      investment: 'N50,000,000',
      roiSixMonths: 'N62,500,000',
      roiTwelveMonths: 'N75,000,000',
    },
  ];

  return (
    <div className="min-h-screen   flex flex-col items-center justify-center">
      <div className=" w-full">
       
        
        
        
        <h2 className="medium-header text-center pb-[20px]">
          Our Investment Tiers
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full mb-10 border-b ">
         
          <div className=' border border-[#2F5318] rounded-lg '>
              <div className=" p-4 rounded-t-lg font-medium  text-gray-800 text-center">
                  Investment
                </div>

                {investmentTiers.map((tier, index) => (
                <React.Fragment key={index}>
                  
                  <div className=" p-4 border border-[#2F5318] border-r-0 border-l-0 border-b-0 text-center">
                    {tier.investment}
                  </div>
                  
                </React.Fragment>
            ))}
          </div>
          <div className=' border border-[#2F5318] rounded-lg '>
              <div className=" p-4 rounded-t-lg font-medium  text-gray-800 text-center">
              ROI in 6 months
                </div>

                {investmentTiers.map((tier, index) => (
                <React.Fragment key={index}>
                  
                  <div className=" p-4 border border-[#2F5318] border-r-0 border-l-0 border-b-0 text-center">
                    {tier.roiSixMonths}
                  </div>
                  
                </React.Fragment>
            ))}
          </div>
          
          <div className=' border border-[#2F5318] rounded-lg '>
              <div className="p-4 rounded-t-lg font-medium text-gray-800 text-center">
              ROI in 12 months
                </div>

                {investmentTiers.map((tier, index) => (
                <React.Fragment key={index}>
                  
                  <div className="  p-4 border border-[#2F5318] border-r-0 border-l-0 border-b-0 text-center">
                    {tier.roiTwelveMonths}
                  </div>
                  
                </React.Fragment>
            ))}
          </div>
          

          
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className=" text-[#2F5318] border border-[#2F5318] hover:bg-green-100 font-semibold py-3 px-6 rounded-md transition-colors duration-300">
            Request Consultation
          </button>
          <button className="bg-[#2F5318] text-white hover:bg-[#2F5318] font-semibold py-3 px-8 rounded-md flex items-center justify-center gap-2 transition-colors duration-300">
            Download Investment Brochure
            <DownloadIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTable;