import { useState } from 'react';

const CodePlayground = () => {
  const [code, setCode] = useState('// Write your code here\n');

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <textarea
        className="w-full h-64 bg-gray-900 text-white p-2 font-mono text-sm rounded-md"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ resize: 'none' }}
      /> 
      </div>
  );
};

export default CodePlayground;
