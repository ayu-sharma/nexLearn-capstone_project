import { useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const alertStyles = {
  success: "bg-green-100 text-green-800 border-green-400",
  error: "bg-red-100 text-red-800 border-red-400",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  info: "bg-blue-100 text-blue-800 border-blue-400",
};

export default function Alert({ message, type = "info" }: AlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center p-4 border rounded-lg shadow-md w-full max-w-md mx-auto relative",
        alertStyles[type]
      )}
    >
      <AlertCircle className="w-5 h-5 mr-2" />
      <span className="flex-1">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-gray-600 hover:text-gray-800">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}