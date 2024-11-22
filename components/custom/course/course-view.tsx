import React from 'react'

interface CourseViewProps {
  courseId: string | null;
}

const CourseView = ({ courseId }: CourseViewProps) => {
  if (!courseId) {
    return <div>No course selected</div>;
  }
  
  return (
    <div>CourseView</div>
  )
}

export default CourseView