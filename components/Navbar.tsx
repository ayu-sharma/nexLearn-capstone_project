import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Navigation links array with proper section links
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "About Us", href: "#about" },
  ];
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  
  return (
    <>
      <nav className="p-4 md:block hidden">
        <div className="container mx-auto flex items-center">
          <div className="flex justify-between text-lg gap-10 space-x-4 text-[#0a1728]">
            {navLinks.map((link, index) => (
              <Link href={link.href} key={index}>
                <div className="hover:text-[#7981FF] transition-colors">{link.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <nav className='md:hidden p-0'>
        <button
          onClick={toggleMenu}
          className="text-black focus:outline-none"
        >
          {isOpen ? "" : <HiMenu size={30} />}
        </button>
      </nav>
      
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white p-6 transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <HiX size={30} />
          </button>
        </div>

        <div className="flex justify-between h-full flex-col text-md mt-4">
          <div className='flex flex-col gap-3'>
            {navLinks.map((link, index) => (
              <Link href={link.href} key={index} onClick={handleLinkClick}>
                <div className="hover:text-gray-400 text-black transition-colors">{link.name}</div>
              </Link>
            ))}
          </div>
          <div className='flex flex-col mb-9'>
            <Link href="http://localhost:3000/login">
              <Button className="w-full text-lg py-3 px-8 text-[#F2F2F2] border bg-[#000000] border-[#000000] hover:bg-transparent hover:text-[#000000]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;