// "use Client"

// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center">

        <div className="flex justify-between text-lg gap-10 space-x-4">
          <Link href="/">
            <div className="text-black font-monospace">Home</div>
          </Link>
          <Link href="/about">
            <div className="text-black font-monospace">Features</div>
          </Link>
          <Link href="/contact">
            <div className="text-black font-monospace">Courses</div>
          </Link>
          <Link href="/contact">
            <div className="text-black font-monospace">How it Works</div>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
