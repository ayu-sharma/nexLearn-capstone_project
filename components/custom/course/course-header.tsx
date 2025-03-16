import { BookA, Code, DraftingCompass, File } from 'lucide-react';
import React from 'react'

interface CourseHeaderProps {
    title: string;
    type: string;
    description: string;
}

const CourseHeader = ({ title, description, type }: CourseHeaderProps) => {
    const getTypeColor = () => {
        switch (type.toUpperCase()) {
            case "CODING":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "APTITUDE":
                return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
            case "LANGUAGE":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
        }
    };

    const renderLogo = () => {
        switch (type.toUpperCase()) {
            case "CODING":
                return <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
            case "APTITUDE":
                return <DraftingCompass className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
            case "LANGUAGE":
                return <BookA className="h-6 w-6 text-green-600 dark:text-green-400" />;
            default:
                return <File className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
        }
    };

    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 inline-flex items-center justify-center">
                            {renderLogo()}
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                            <div className="flex items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor()} mt-1`}>
                                    {type}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader