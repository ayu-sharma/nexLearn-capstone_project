import React from 'react'

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  poster?: string;
}

const VideoPlayer = ({ videoUrl, title, poster }: VideoPlayerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md">
      {title && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
      )}
      <div className="relative w-full pb-[56.25%]">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls
          poster={poster}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default VideoPlayer