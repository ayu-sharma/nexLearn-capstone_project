// "use Client"

// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center">

        <div className="flex justify-between text-lg gap-10 space-x-4 text-[#F2F2F2]">
          <Link href="/">
            <div className="hover:text-[#7981FF] transition-colors">Home</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-[#7981FF] transition-colors">Features</div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-[#7981FF] transition-colors">Courses</div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-[#7981FF] transition-colors">Pricing</div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-[#7981FF] transition-colors">How it Works</div>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
