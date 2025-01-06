import React from 'react'

interface ReadingContentProps {
    content: string;
}

const ReadingContent = ({ content }: ReadingContentProps) => {
  return (
    <div className='flex justify-center p-6 rounded-xl h-[500px] border w-[750px] overflow-y-scroll'>
        <p className='text-justify w-[75%] py-6'>
            {content}
        </p>
    </div>
  )
}

export default ReadingContent