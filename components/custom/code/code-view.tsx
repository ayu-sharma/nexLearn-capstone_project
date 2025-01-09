import React from 'react'
import SolvedGrid from './solved-grid'

const CodePage = () => {
  return (
    <div className='grid grid-cols-3 gap-x-6'>
      <SolvedGrid />
      <div className='col-span-2'>
        LIST
      </div>
    </div>
  )
}

export default CodePage