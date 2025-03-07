import React, { useState, useEffect } from "react";
import Image from "next/image";
import aws from "../public/images/aws.svg";
import docker from "../public/images/docker.svg";
import flutter from "../public/images/flutter.svg";
import javascript from "../public/images/javascript.svg";
import node from "../public/images/node.svg";
import webflow from "../public/images/webflow.svg";
import react from "../public/images/react.svg";
import mongo from "../public/images/mongo.svg";
import figma from "../public/images/figma.svg";
import adobei from "../public/images/adobei.svg";
import type { StaticImageData } from "next/image";

interface Course {
  image: StaticImageData;
  alt: string;
}

export default function Courses() {
  const [coursesToShow, setCoursesToShow] = useState<Course[]>([]);
  
  useEffect(() => {
    setCoursesToShow([
      { image: adobei, alt: "Adobe Illustrator" },
      { image: figma, alt: "Figma" },
      { image: webflow, alt: "Webflow" },
      { image: node, alt: "Node" },
      { image: docker, alt: "Docker" },
      { image: react, alt: "React" },
      { image: aws, alt: "AWS" },
      { image: javascript, alt: "JavaScript" },
      { image: mongo, alt: "MongoDB" },
      { image: flutter, alt: "Flutter" },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center py-8 w-full gap-y-10">
      <p className="text-4xl font-bold">LEARN WITH US</p>
      <div className="w-full inline-flex flex-nowrap overflow-hidden relative">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_li]:md:mx-8 [&_img]:max-w-none animate-[scroll_20s_linear_infinite]">
          {coursesToShow.map((course, index) => (
            <li key={index}>
              <Image src={course.image} alt={course.alt} height={50} width={50} />
            </li>
          ))}
        </ul>
        <ul
          className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_li]:md:mx-8 [&_img]:max-w-none animate-[scroll_20s_linear_infinite]"
          aria-hidden="true"
        >
          {coursesToShow.map((course, index) => (
            <li key={index}>
              <Image src={course.image} alt={course.alt} height={50} width={50} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
