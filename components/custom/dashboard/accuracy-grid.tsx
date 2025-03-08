import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

const AccuracyGrid = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Topic Accuracy</h2>
      <button className="text-sm text-blue-600 hover:text-blue-800">Filter</button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[
            {topic: 'Arrays & Strings', attempted: 45, correct: 37, accuracy: 82},
            {topic: 'Linked Lists', attempted: 28, correct: 23, accuracy: 82},
            {topic: 'Trees & Graphs', attempted: 35, correct: 25, accuracy: 71},
            {topic: 'Dynamic Programming', attempted: 20, correct: 14, accuracy: 70},
            {topic: 'Sorting & Searching', attempted: 30, correct: 26, accuracy: 87},
          ].map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.topic}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.attempted}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.correct}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${item.accuracy >= 80 ? 'text-green-600' : item.accuracy >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {item.accuracy}%
                  </span>
                  <div className="ml-4 w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.accuracy >= 80 ? 'bg-green-500' : item.accuracy >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{width: `${item.accuracy}%`}}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default AccuracyGrid