import React from 'react'

interface CourseViewProps {
  courseId: string | null;
}

const CourseView = ({ courseId }: CourseViewProps) => {
  if (!courseId) {
    return <div>No course selected</div>;
  }

  return (
    <div>{courseId}</div>
  )
}

export default CourseView