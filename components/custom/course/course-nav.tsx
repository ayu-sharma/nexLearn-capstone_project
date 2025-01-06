"use client"

import { ModeToggle } from '@/components/ModeToggle'
import Username from '@/components/Username'
import React from 'react'

const CourseNav = () => {
  return (
    <div className="absolute top-6 right-6">
      <div className="flex gap-3">
        <Username />
        <ModeToggle />
      </div>
    </div>
  )
}

export default CourseNav