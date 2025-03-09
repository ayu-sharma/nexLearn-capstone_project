import Link from 'next/link';
import { useState, MouseEvent } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from './ui/button';

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const navLinks: NavLink[] = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "About Us", href: "#about" },
  ];
  
  const toggleMenu = (): void => setIsOpen(!isOpen);
  
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, sectionId: string): void => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    
    if (section) {
      setIsOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", `#${sectionId}`);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="p-4 hidden md:block">
        <div className="container mx-auto flex items-center">
          <div className="flex justify-between text-lg gap-10 text-[#0a1728]">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href.replace("#", ""))}
                className="hover:text-[#7981FF] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden p-4 flex justify-between items-center">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="text-black focus:outline-none"
        >
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white p-6 transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="text-black focus:outline-none"
          >
            <HiX size={30} />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full mt-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href.replace("#", ""))}
                className="hover:text-gray-400 text-black transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col mb-9">
            <Link href="/login">
              <Button className="w-full text-lg py-3 px-8 text-white bg-black border border-black hover:bg-transparent hover:text-black">
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
