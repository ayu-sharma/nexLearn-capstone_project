"use client";

import CodeEditor from '@/components/custom/code/code-editor';
import ProblemPanel from '@/components/custom/code/problem-panel';
import CourseNav from '@/components/custom/course/course-nav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const CodingTerminal = () => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    
    // Check screen size on component mount and window resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
        };
        
        // Initial check
        checkScreenSize();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);
        
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);
    
    const handleBack = () => {
        router.back();
    };
    
    return (
        <div className="min-h-screen flex flex-col">
            <CourseNav />
            <div className="flex-1 flex flex-col py-6 px-5 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-x-6 mb-8">
                    <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={handleBack}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">Code Playground</h1>
                </div>
                
                {isMobile ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-md max-w-md flex gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                                Code Playground is not supported on mobile devices.
                                Please use a larger screen for the best experience.
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full ">
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 shadow-sm h-[40rem]">
                            <ProblemPanel />
                        </div>
                        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm h-[35rem]">
                            <CodeEditor />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodingTerminal;