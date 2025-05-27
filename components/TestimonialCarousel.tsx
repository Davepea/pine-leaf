"use client"
import { useState, useEffect, SetStateAction } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  testimonial: string;
  rating: number;
}

interface StarRatingProps {
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCarousel: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Mr Godspower',
      location: 'Landowner - Anambra',
      image: '/img/prf1.png',
      testimonial: '"I’ve had land issues before with other companies, but Pineleaf changed that experience. I got my land, my papers, and peace of mind. They don’t just talk — they deliver.""',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mr Chinedu M.',
      location: 'Realtor',
      image: '/img/prf2.png',
      testimonial: '"I joined PRRM just to ‘try it out’ — I never imagined I’d earn so much in so little time. After my first land sale, I got my commission without delay. Pineleaf keeps their word, and I’m proud to be part of this!"',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mrs. Amaka',
      location: 'Landowner - Awka',
      image: '/img/prf3.png',
      testimonial: '"From the first inspection to allocation, everything went smoothly. Pineleaf delivered exactly what they promised. The documents were verified, the location is great, and the process was very transparent."',
      rating: 5,
    },
    {
      id: 4,
      name: 'Miss Grace T.',
      location: 'Realtor',
      image: '/img/prf4.png',
      testimonial: '"What impressed me most wasn\'t just the 10% commission, but how organized and supportive the team is. I also introduced a friend who joined, and I started earning from her sales too! PRRM is truly a game changer."',
      rating: 5,
    },
    {
      id: 5,
      name: 'Mr Daniel',
      location: 'PRRM Affiliate',
      image: '/img/prf5.png',
      testimonial: '"This isn\'t just a referral system — it\'s a full support network. Pineleaf teaches, encourages, and actually pays. I\'ve withdrawn commission more than once, and I\'m motivated to keep going."',
      rating: 5,
    },
    {
      id: 6,
      name: 'Chinyere',
      location: 'Landowner - Asaba',
      image: '/img/prf6.png',
      testimonial: '"One thing about Pineleaf is clarity. I was given all the information I needed upfront. No hidden charges, no drama. And yes, I was allocated immediately after payment. 100% satisfied!"',
      rating: 5,
    },
    {
      id: 7,
      name: 'Mr Godspower',
      location: 'Landowner - Anambra',
      image: '/img/prf1.png',
      testimonial: '"I\'ve had land issues before with other companies, but Pineleaf changed that experience. I got my land, my papers, and peace of mind. They don\'t just talk — they deliver."',
      rating: 5,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // const carouselRef = useRef(null);

  // Handle resize to determine if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle dot click
  const handleDotClick = (index: SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  // Calculate visible testimonials
  const visibleTestimonials = isMobile 
    ? [testimonials[currentIndex]] 
    : currentIndex + 2 <= testimonials.length 
      ? testimonials.slice(currentIndex, currentIndex + 2) 
      : [...testimonials.slice(currentIndex), ...testimonials.slice(0, 2 - (testimonials.length - currentIndex))];

  // Star rating component
  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
      <div className="flex gap-[8px]">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  // Testimonial card component
  const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
      <div className="flex flex-col items-center p-10  rounded-lg mx-2 my-4 h-full pb-4 relative">
        <div className='absolute bottom-0 top-25 right-0 left-0 bg-white rounded-lg shadow-2xl shadow-gray-200'></div>
        <div className="mb-2 rounded-full overflow-hidden w-[113px] h-[113px] relative">
          <Image 
            src={testimonial.image} 
            alt={testimonial.name}
            fill
            sizes="(max-width: 768px) 100vw, 64px"
            className="object-cover"
            priority
          />
        </div>
      <div className='relative flex flex-col items-center'>
        <h3 className="font-medium text-center mt-9 text-[20px]">{testimonial.name}</h3>
        <p className="text-sm text-gray-600 text-center">{testimonial.location}</p>
        <p className="text-center text-[16px] my-5 pb-3">{testimonial.testimonial}</p>
        <StarRating rating={testimonial.rating} />
      </div>
      </div>
    );
  };

  return (
    <div className=" px-4 py-8">
      {/* Desktop view - grid layout */}
      <div className={`${isMobile ? 'hidden' : 'grid'} md:grid-cols-2  gap-4 gap-y-[60px] relative pb-[60px]`}>
        {visibleTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile view - single card */}
      <div className={`${isMobile ? 'block' : 'hidden'}`}>
        <TestimonialCard testimonial={visibleTestimonials[0]} />
      </div>


      <div className="flex justify-center items-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 border border-[#2F5318] ${
              index === currentIndex ? 'bg-[#2F5318]' : 'bg-white '
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default TestimonialCarousel;