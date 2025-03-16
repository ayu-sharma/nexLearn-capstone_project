"use client"

import Username from '@/components/Username'
import React from 'react'

const CourseNav = () => {
  return (
    <div className="md:block absolute hidden top-6 right-6 ">
      <div className="flex gap-3">
        <Username />
      </div>
    </div>
  )
}

export default CourseNav