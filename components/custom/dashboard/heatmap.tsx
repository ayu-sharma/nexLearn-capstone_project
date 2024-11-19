import React, { useEffect, useState } from 'react'
import HeatMap from '@uiw/react-heat-map';

const value = [
    { date: '2016/01/11', count: 2 },
    { date: '2016/01/12', count: 20 },
    { date: '2016/01/13', count: 10 },
    ...[...Array(17)].map((_, idx) => ({
      date: `2016/02/${idx + 10}`, count: idx, content: ''
    })),
    { date: '2016/04/11', count: 2 },
    { date: '2016/05/01', count: 5 },
    { date: '2016/05/02', count: 5 },
    { date: '2016/05/04', count: 11 },
  ];

const DashboardHeatMap = () => {
    
  return (
    <div className='mt-6 py-6 justify-center items-center flex bg-[#121417] rounded-md'>
        <HeatMap
        value={value}
        width={920}
        height={170}
        style={{ color: '#7981FF', fontSize: '12px' }}
        weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
        startDate={new Date('2016/01/01')}
        panelColors={['#172554', '#3730a3', '#4f46e5','#7981FF', '#8b5cf6', '#9333ea']}
        rectProps={{
            rx: 2
        }}
        rectSize={15}
      />
    </div>
  )
}

export default DashboardHeatMap
