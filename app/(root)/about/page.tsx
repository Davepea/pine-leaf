import Image from 'next/image';
import React from 'react';

const team = [
  {
    name: 'Bishop Dr. Onyekpa Nzekwesi',
    role: 'CEO PINELEAF ESTATE',
    img: '/images/team/ceo.jpg',
    bio: `With a bold vision to simplify land ownership and empower families across Nigeria, Bishop Dr. Onyekpa Nzekwesi founded Pineleaf Estates to deliver more than just real estate. He built a brand rooted in trust, transparency, and transformation.`
  },
];

const directors = [
  {
    name: 'Director Bob Francis Nzekwesi',
    role: 'COO PINELEAF ESTATE',
    img: '/images/team/bob.jpg',
  },
  {
    name: 'Director Tochukwu Nzekwesi',
    role: 'CFO PINELEAF ESTATE',
    img: '/images/team/tochukwu.jpg',
  },
];

const management = [
  { name: 'Mrs Chinasa Gimba', role: 'General Manager', img: '/images/team/chinasa.jpg' },
  { name: 'Dr. Micheal Emeka Ugwu', role: 'Chief Marketing Officer', img: '/images/team/michael.jpg' },
  { name: 'Mr Celestine Okonkwo', role: 'Marketing Secretary', img: '/images/team/celestine.jpg' },
  { name: 'Mrs Sheila Arinluka Ngene', role: 'Marketing Manager', img: '/images/team/sheila.jpg' },
  { name: 'Mr Ugochukwu Njoku', role: 'General Site Manager', img: '/images/team/ugochukwu.jpg' },
  { name: 'Mr Ifeanyi Ajira', role: 'Admin/Financial Officer', img: '/images/team/ifeanyi.jpg' },
];

export default function About() {
  return (
    <div className="bg-white text-gray-900">
      <div className="relative h-64 w-full">
        <Image src="/images/about-hero.jpg" alt="About Us" layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-2">Welcome to Pineleaf Estate</h2>
          <p className="italic">“Where every property is a smart investment”</p>
          <p className="mt-4 text-gray-700">
            Pineleaf Estates began with a simple but powerful belief, that every family and investor deserves access to secure, verified land without stress or uncertainty...
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>To provide verified, accessible, and affordable land to individuals, families, and investors while upholding integrity, customer satisfaction, and long term value.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p>To become Africa’s most trusted real estate company through secure land investment and sustainable development.</p>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Meet the Team</h3>
          {team.map((member, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 mb-6 items-center">
              <Image src={member.img} alt={member.name} width={200} height={200} className="rounded-md" />
              <div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                <p className="text-gray-700">{member.bio}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8">Board of Directors</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {directors.map((director, index) => (
              <div key={index} className="text-center">
                <Image src={director.img} alt={director.name} width={200} height={200} className="rounded-md mx-auto" />
                <h4 className="font-bold mt-4">{director.name}</h4>
                <p className="text-sm text-gray-500">{director.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-center mb-8">Management Body</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {management.map((person, index) => (
              <div key={index} className="text-center">
                <Image src={person.img} alt={person.name} width={200} height={200} className="rounded-md mx-auto" />
                <h4 className="font-bold mt-4">{person.name}</h4>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
