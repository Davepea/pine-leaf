import Image from 'next/image';
import React from 'react';

const directors = [
  {
    name: 'Director Bob Francis Nzekwesi',
    role: 'COO PINELEAF ESTATE',
    img: '/img/team/bob.png',
  },
  {
    name: 'Director Tochukwu Nzekwesi',
    role: 'CFO PINELEAF ESTATE',
    img: '/img/team/tochukwu.jpg',
  },
];

const management = [
  { name: 'Mrs Chinasa Gimba', role: 'General Manager', img: '/img/team/chinasa.jpg' },
  { name: 'Dr. Micheal Emeka Ugwu', role: 'Chief Marketing Officer', img: '/img/team/micheal.jpg' },
  { name: 'Mr Celestine Okonkwo', role: 'Marketing Secretary', img: '/img/team/celestine.jpg' },
  { name: 'Mrs Sheila Arinluka Ngene', role: 'Marketing Manager', img: '/img/team/shiela.jpg' },
  { name: 'Mr Ugochukwu Njoku', role: 'General Site Manager', img: '/img/team/ugochuwu.jpg' },
  { name: 'Mr Ifeanyi Ajira', role: 'Admin/Financial Officer', img: '/img/team/ifeanyi.jpg' },
];

export default function About() {
  return (
    <div className="bg-white text-gray-900">
      <div className="relative h-[464px] w-full">
        <Image src="/img/about.png" alt="About Us" layout="fill" objectFit="cover" />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
          <h1 className="head-1 text-white">About Us</h1>
        </div>
      </div>

      <div className=" mx-auto px-4 py-12 section">
        <section className="text-center  ">
          <div className="header flex flex-col gap-[12px]">
            <h2 className="head-2 font-semibold ">Welcome to Pineleaf Estate</h2>
          <p className="italic para-2 leading-[25.2px]">“Where every property is a smart investment”</p>
          </div>
          <p className="para-2-3 text-gray-700 max-w-[1200px] m-auto ">
          Pineleaf Estates began with a simple but powerful belief, that every family and investor deserves access to secure, verified land without stress or uncertainty. What started as a small real estate initiative has grown into a trusted name in property development across South-South and South-East Nigeria.
          From day one, our goal has been to make land ownership not just possible, but meaningful, giving people a chance to build homes, create wealth, and leave a legacy. We’ve stayed committed to transparency, integrity, and delivering real value to our clients, one property at a time.
          </p>
        </section>

        <section className='flex flex-col gap-8 pt-[60px] md:text-start text-center' >
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className='flex flex-col gap-[20px]'>
              <h3 className="head-4 ">Our Mission</h3>
              <p className='max-w-[470px] para-2-3'>To provide verified, accessible, and affordable land to individuals, families, and investors while upholding integrity, customer satisfaction, and long-term value in every transaction.</p>
            </div>
            <div className='md:flex md:justify-end'>
              <div className='max-w-[620px]'>
                <Image  src="/img/ab-short.png" alt="ll" width={800} height={500}/>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-8 '>
            <div className='md:order-1 order-2'>
              <div className='max-w-[620px]'>
                <Image  src="/img/ab-short2.png" alt="ll" width={800} height={500}/>
              </div>
            </div>
           <div className='md:order-2 order-1 md:pl-20 pl-0 md:flex md:justify-end'>
             <div  className=' flex flex-col gap-[20px]'>
              <h3 className="head-4">Our Vision</h3>
              <p className='max-w-[470px] para-2-3'>To become Africa’s most trusted real estate company, empowering individuals and communities through secure land investment and sustainable development.</p>
            </div>
           </div>
          </div>
        </section>

        <section className="mb-12 pt-[100px]">
           <div className="header flex flex-col gap-[12px] text-center">
              <h2 className="head-2 font-semibold ">Meet the Team</h2>
              <p className="italic para-2 leading-[25.2px]">The people driving the Pineleaf vision forward.</p>
            </div>
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-[36px] mb-6 ">
              <div className='max-w-[612px]'>
              <Image src="/img/ceo.png" alt="ceo" width={612} height={517} className="rounded-md" />

              </div>
              <div>
                <h4 className="bold-para-1">Bishop Dr. Onyeka Nzekwesi </h4>
                <p className="para-4 !font-[700] mb-[20px] text-[#2F5318CC]">CEO PINELEAF ESTATE</p>
                <p className="text-gray-700 para-2-3">
                With a bold vision to simplify land ownership and empower families across Nigeria, Bishop Dr. Onyeka Nzekwesi founded Pineleaf Estates to deliver more than just real estate, he built a brand rooted in trust, transparency, and transformation. <br />
                Over the years, he has led the company with unmatched dedication, ensuring that every client feels seen, supported, and secure in their land ownership journey. His unique approach blends a deep understanding of people with smart real estate strategies that make land investment accessible to everyone, from first-time buyers to seasoned investors. <br />
                Under his leadership, Pineleaf has grown into one of the most respected names in South-South and South-East Nigeria, known for verified lands, timely allocations, and a realtor reward system that uplifts hardworking agents nationwide. <br /> <br />

                Bishop Dr. Onyeka Nzekwesi is not just building estates, he’s building legacies.
                </p>
              </div>
            </div>
        </section>

        <section className=" pt-[100px]">
          <div className="header">
          <h3 className="head-3 text-center ">Board of Directors</h3>

          </div>
          <div className="grid md:grid-cols-2 gap-8 px-[6.2vw]">
            {directors.map((director, index) => (
              <div key={index} className="text-center  w-full h-[438px] overflow-hidden relative border border-[#2F531833] rounded-lg">
                {/* <Image src={director.img} alt={director.name} width={200} height={200} className="rounded-md mx-auto" /> */}
                <Image src={director.img} alt={director.name} width={384} height={438} className="rounded-md mx-auto w-full h-full object-cover" />
               <div className='absolute z-10 h-[100px] bg-white bottom-0 right-0 left-0 p-[20px]'>
                  <p className="bold-para-3 text-[#2F5318]  ">{director.role}</p>
                  <h4 className="bold-para-2 !leading-[25.2px]">{director.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='pt-[80px]'>
            <div className="header">
          <h3 className="head-3 text-center ">Management Body</h3>

            </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[24px]">
            {management.map((person, index) => (
              <div key={index} className="text-center w-full h-[438px] overflow-hidden relative border border-[#2F531833] rounded-lg">
                <Image src={person.img} alt={person.name} width={384} height={438} className="rounded-md mx-auto w-full h-full object-cover " />
                <div className='absolute z-10 h-[100px] bg-white bottom-0 right-0 left-0 py-[10px] flex flex-col gap-[10px] justify-center ' >
                <p className="bold-para-3 text-[#2F5318]">{person.role}</p>
                <h4 className="bold-para-2 !leading-[25.2px]">{person.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
