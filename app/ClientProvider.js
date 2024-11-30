"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function GlobalLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
}

export default function ClientProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <GlobalLoader />}
      {children}
    </>
  );
}
