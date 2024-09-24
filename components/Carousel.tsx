"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import img1l from '@/public/images/auth1L.svg';
import img1d from '@/public/images/auth1D.svg';
import img2l from '@/public/images/auth2L.svg';
import img2d from '@/public/images/auth2D.svg';
import img3l from '@/public/images/auth3L.svg';
import img3d from '@/public/images/auth3D.svg';

const Carousel = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true, 
    slides: {
      perView: 1,
      spacing: 15, 
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      const autoSlide = setInterval(() => {
        instanceRef.current?.next();
      }, 3000);

      return () => clearInterval(autoSlide); 
    }
  }, [instanceRef]);


  return (
    <div className='flex h-[90vh] w-[400px] rounded bg-gradient-to-b from-[#D2D6DB] to-[#707275] dark:from-[#1B2027] dark:to-[#62748D] shadow-md'>
      <div className='keen-slider' ref={sliderRef}>
        {array.map((item) => (
          <div key={item.id} className="keen-slider__slide">
            <Element 
              heading={item.heading}
              description={item.description}
              imgL={item.imgL}
              imgD={item.imgD}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel

interface ElementProps {
  heading: string
  description: string
  imgD: string
  imgL: string
}

const Element = ({ heading, description, imgD, imgL }: ElementProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode(); 
    const observer = new MutationObserver(checkDarkMode); 

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect(); 
  }, []);
  return (
    <div className='flex flex-col items-center justify-evenly h-full'>
        <div className='flex flex-col text-xl w-full px-10'>
          <h1 className='font-bold'>{heading}</h1>
          <p>{description}</p>
        </div>
        <Image src={isDarkMode ? imgD : imgL} alt='Carousel image'/>
      </div>
  )
};

const array = [
  {
    id: 1,
    heading: 'Collaborate and Grow Together',
    description: 'Join discussion forums and collaboration tools to enhance your learning journey.',
    imgL: img1l,
    imgD: img1d
  },
  {
    id: 2,
    heading: 'Unlock Your Potential with NexLearn',
    description: 'Join us to experience a new era of online education.',
    imgL: img2l,
    imgD: img2d
  },
  {
    id: 3,
    heading: 'Interactive Learning at Your Fingertips',
    description: 'Engage with dynamic video lectures and interactive quizzes.',
    imgL: img3l,
    imgD: img3d
  }
]