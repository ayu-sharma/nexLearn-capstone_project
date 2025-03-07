import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  // Company links array (updated to point to Courses and About sections)
  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Courses", href: "#courses" },
  ];

  // Help links array
  const helpLinks = [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Support", href: "#" },
  ];

  // Resources links array (for the third column)
  const resourceLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Resources", href: "#" },
  ];

  return (
    <footer className="text-gray-300 font-mono bg-[#282c34]">
      <div className="container px-5 py-24 mx-auto">
        <div className="md:flex md:flex-wrap md:text-left ">
          {/* Address Column (static, not from array) */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              ADDRESS
            </h2>
            <p className="mb-3 text-gray-300">
              NexLearn Inc.
              <br />
              123 Education Street
              <br />
              Learning City, ED 54321
              <br />
              United States
            </p>
            <p className="mb-10 text-gray-300">
              <a href="mailto:info@nexlearn.com" className="hover:text-white">
                info@nexlearn.com
              </a>
              <br />
              <a href="tel:+15551234567" className="hover:text-white">
                +1 (555) 123-4567
              </a>
            </p>
          </div>

          {/* Company Links Column (from array) */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              COMPANY
            </h2>
            <nav className="list-none mb-10">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          {/* Help Links Column (from array) */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              HELP
            </h2>
            <nav className="list-none mb-10">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          {/* Subscribe Column - Updated with the Button component */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
              SUBSCRIBE
            </h2>
            <div className="flex flex-col justify-center items-start gap-y-3">
              <div className="relative xs:w-40 xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                <label
                  htmlFor="footer-field"
                  className="leading-7 text-sm text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="footer-field"
                  name="footer-field"
                  placeholder="Your email"
                  className="w-full bg-gray-700 bg-opacity-50 rounded border border-gray-600 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Button 
                variant="custom" 
                size="lg" 
                className="bg-[#ffffff] rounded text-lg  text-[#121417] hover:bg-[#121417] border-[#121417] hover:text-white"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-2 text-left">
              Subscribe to our newsletter
              <br className="lg:block hidden" />
              and stay updated
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#1e2128]">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            href="#"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            <Image src="/images/logoL.svg" alt="" width={200} height={25}/>
          </Link>
          <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">
            © 2025 NexLearn —
            <a
              href="#"
              rel="noopener noreferrer"
              className="text-gray-300 ml-1"
              target="_blank"
            >
              All Rights Reserved
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-400 hover:text-white">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-400 hover:text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="#" className="ml-3 text-gray-400 hover:text-white">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;