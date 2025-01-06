import React from 'react'

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <div className="">
      <video width="750" height="500" controls className="rounded-2xl">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoPlayer