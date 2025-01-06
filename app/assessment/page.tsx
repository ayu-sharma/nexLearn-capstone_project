import React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Questionbar from "../../components/custom/questionbar/questionbar";
export default function assessment() {
  return (
    <div className="flex flex-col py-6 px-5 h-screen">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <Clock className="text-[#121212]" size={25} />
          <div className="flex flex-col">
            <p className="text-[#797979] font-mono text-xs">
              Time remaining
            </p>
            <p className="text-black text-sm font-mono">14:44:00</p>
          </div>
        </div>
        <Button className="hover:bg-transparent hover:text-black border font-mono border-black">
          {" "}
          Submit{" "}
        </Button>
      </div>
      <Questionbar />
    </div>
  );
}
