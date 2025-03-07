"use client";

import React from "react";
import Image from "next/image";
import logoD from "../public/images/logoD.svg";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="font-mono overflow-hidden bg-[#ffffff] text-[#0a1728] min-h-[100vh]">
      <div className="flex flex-col my-8 md:mx-12 mx-6">

        <div className="md:mb-16 mb-10">
          <div className="md:text-center text-bold font-monospace lg:text-[5] sm:text-4xl text-3xl md:text-6xl max-w-6xl mx-auto flex flex-col gap-3 px-6 md:px-16">
            Reimagining Education <br />
            <div className="">Through Intelligent Technology</div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="flex flex-col md:items-center justify-center mb-16">
          <p className="text-balance md:text-center leading-8 text-lg px-6 md:px-24 max-w-4xl mx-auto">
            At NexLearn, we believe in the power of technology to transform education. 
            Our platform combines cutting-edge AI with proven educational methods to 
            create a learning experience that adapts to you, not the other way around.
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 max-w-6xl mx-auto mb-16">
          <div className="md:w-1/2 px-6 md:px-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-lg leading-8 mb-4">
            Founded by students of VIT, NexLearn bridges the gap between 
              traditional learning methods and advanced technology. We're passionate about 
              making quality education accessible, personalized, and effective for learners 
              of all backgrounds.
            </p>
            <p className="text-lg leading-8">
              Our team combines expertise in machine learning, educational psychology, and 
              instructional design to create a platform that truly understands how people learn.
            </p>
          </div>
          <div className="md:w-1/2 bg-[#121417] text-white p-8 rounded-xl flex flex-col justify-center px-6 md:px-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg leading-8 mb-4">
              We envision a world where education is personalized to each individual's unique 
              learning style, pace, and interests. Where technology empowers rather than 
              replaces human connection in the learning process.
            </p>
            <p className="text-lg leading-8">
              NexLearn is building the future of education—one where AI-powered insights 
              help unlock every learner's full potential.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto mb-16 px-6 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:text-center">How NexLearn Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-[#121417] rounded-xl p-6 md:p-8 flex flex-col">
              <div className="bg-[#121417] text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4">Analyze & Understand</h3>
              <p className="text-lg leading-7">
                Our AI technology analyzes your learning patterns, identifies strengths and weaknesses, 
                and builds a comprehensive learning profile unique to you.
              </p>
            </div>
            
            <div className="border border-[#121417] rounded-xl p-6 md:p-8 flex flex-col">
              <div className="bg-[#121417] text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4">Personalize & Adapt</h3>
              <p className="text-lg leading-7">
                Based on your profile, NexLearn creates customized learning paths and 
                targeted assignments that address your specific needs and learning goals.
              </p>
            </div>
            
            <div className="border border-[#121417] rounded-xl p-6 md:p-8 flex flex-col">
              <div className="bg-[#121417] text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4">Track & Improve</h3>
              <p className="text-lg leading-7">
                Monitor your progress with detailed analytics, receive real-time feedback, 
                and watch as the system continuously adapts to your evolving learning needs.
              </p>
            </div>
          </div>
        </div>

        {/* Core Features Highlight */}
        <div className="bg-[#121417] text-white py-12 md:py-16 px-6 md:px-16 rounded-xl max-w-8xl mx-auto mb-16">
  <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Approach</h2>
  
  <div className="grid lg:grid-cols-3 gap-10">
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4">Research-Backed Methods</h3>
      <p>
        Every aspect of NexLearn is grounded in educational research and cognitive science, ensuring learning strategies that truly work.
      </p>
    </div>
    
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4">Expert Educators</h3>
      <p>
        Our platform is developed by a multidisciplinary team of experienced educators, data scientists, and learning specialists.
      </p>
    </div>
    
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-4">Continuous Innovation</h3>
      <p>
        We constantly refine our algorithms and teaching methods based on the latest research and user feedback to deliver ever-improving results.
      </p>
    </div>
  </div>
</div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 px-6 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-lg leading-8 mb-10">
            Join thousands of learners who have already discovered the power of 
            AI-enhanced education with NexLearn.
          </p>
          <Link href="http://localhost:3000/signup">
            <Button className="text-lg py-6 px-12 text-[#F2F2F2] bg-[#121417] border border-[#121417] hover:bg-transparent hover:text-[#121417]">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;