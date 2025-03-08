
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Username from "@/components/Username";
import { Bell } from "lucide-react";

const RightNav = () => {
    return (
        <div className=" p-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* <Searchbar /> */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-xs text-white flex items-center justify-center">2</span>
              </span>
            </Button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-0.5 hidden sm:block"></div>
            <Username />
          </div>
        </div>
    );
  };
  export default RightNav