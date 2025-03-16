"use client"

import { Button } from '@/components/ui/button'
import { Notebook, NotebookPen, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AssessmentProps {
  materialId: string
  questions: number
  title: string
  estimatedTime?: number // Optional prop for estimated completion time
}

const AssessmentStart = ({ materialId, questions, title, estimatedTime }: AssessmentProps) => {
  const router = useRouter()
  
  const handleStart = () => {
    router.push(`/assessment?materialId=${materialId}`)
  }
  
  return (
    <div className="relative flex flex-col p-6 rounded-xl border w-full max-w-3xl mx-auto shadow-sm transition-all hover:shadow-md">
      {/* Main content */}
      <div className="flex flex-col space-y-4 mb-16">
        <div className="flex items-center gap-2">
          <Notebook className="h-5 w-5 text-blue-500" />
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">Knowledge Check</h2>
        </div>
        
        <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl">{title}</h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
          <div className="flex gap-x-2 items-center">
            <NotebookPen className="h-4 w-4 text-indigo-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">{questions} questions</p>
          </div>
          
          {estimatedTime && (
            <div className="flex gap-x-2 items-center">
              <Clock className="h-4 w-4 text-indigo-500" />
              <p className="text-sm text-slate-600 dark:text-slate-400">{estimatedTime} minutes</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action button */}
      <div className="absolute bottom-6 right-6 w-full flex justify-end">
        <Button 
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  )
}

export default AssessmentStart