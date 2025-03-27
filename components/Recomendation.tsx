import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: "DSA" | "MCQ" | "Challenge" | string;
}

interface RecommendationsProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations?: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ 
  isOpen, 
  onClose, 
  recommendations = [] 
}) => {
  // Effect to prevent body scrolling when recommendations panel is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling on the background
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Cleanup function to restore scrolling when component unmounts or panel closes
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Default recommendations if none provided
  const defaultRecommendations: Recommendation[] = [
    {
      id: 1,
      title: "Complete Array Problems",
      description: "Focus on medium difficulty array manipulation questions",
      type: "DSA",
    },
    {
      id: 2,
      title: "Review Graph Algorithms",
      description: "Your accuracy on graph problems is below average",
      type: "DSA",
    },
    {
      id: 3,
      title: "Practice MCQs on Data Structures",
      description: "Recommended to improve your understanding of fundamentals",
      type: "MCQ",
    },
    {
      id: 4,
      title: "Take the Dynamic Programming Challenge",
      description: "This will help strengthen your DP skills",
      type: "Challenge",
    },
  ];

  const items = recommendations.length > 0 ? recommendations : defaultRecommendations;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Recommendations panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 sm:right-8 w-full max-w-md bg-white rounded-lg shadow-lg z-[100] overflow-hidden h-[20rem] md:h-[30rem]"
          >
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold text-gray-800">Recommendations</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (item.id % 4) }}
                  className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        item.type === "DSA" ? "bg-blue-100 text-blue-800" :
                        item.type === "MCQ" ? "bg-green-100 text-green-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Recommendations;