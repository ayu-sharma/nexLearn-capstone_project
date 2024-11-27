import { BookA, Code, DraftingCompass, File } from 'lucide-react';
import React from 'react'

interface CourseHeaderProps {
    title: string;
    type: string;
    description: string;
}

const CourseHeader = ({ title, description, type }: CourseHeaderProps) => {

    const renderLogo = () => {
        switch (type) {
            case "CODING":
                return <Code className="mr-2" />;
            case "APTITUDE":
                return <DraftingCompass className="mr-2" />;
            case "LANGUAGE":
                return <BookA className="mr-2" />;
            default:
                return <File className="mr-2" />;
        }
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center">
                {renderLogo()}
                <h1 className="text-2xl font-medium">{title}</h1>
            </div>
            <p className="font-light">{description}</p>
        </div>
    )
}

export default CourseHeader