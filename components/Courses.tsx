import React from 'react';
import Image from 'next/image';
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

export default function Courses() {
    const courses = [
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
    ];

    return (
        <div className="flex flex-col items-center pt-20 w-full">
            <p className="text-4xl font-bold">LEARN WITH US</p>
            <div className="w-full overflow-hidden relative">
                <div className="flex items-center justify-start transform animate-scrolltext gap-8">
                    {[...courses, ...courses].map((course, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                        >
                            <Image
                                src={course.image}
                                alt={course.alt}
                                height={300}
                                width={60}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
