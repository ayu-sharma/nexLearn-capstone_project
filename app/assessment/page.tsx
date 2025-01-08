import React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Questionbar from "../../components/custom/questionbar/questionbar";
import { ModeToggle } from "@/components/ModeToggle";
export default function assessment() {
  return (
    <div className="flex flex-col py-6 px-5 h-screen">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <Clock className="text-[#7981FF]" size={25} />
          <div className="flex flex-col">
            <p className="dark:text-slate-300 text-xs">
              Time remaining
            </p>
            <p className="text-sm font-mono">14:44:00</p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <Button className="hover:bg-transparent hover:text-black dark:hover:text-white border font-mono border-black dark:border-white">
            Submit
          </Button>
          <ModeToggle />
        </div>
      </div>
      <Questionbar />
    </div>
  );
}
