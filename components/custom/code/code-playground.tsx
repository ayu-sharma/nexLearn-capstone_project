import { useState } from 'react';

const CodePlayground = () => {
  const [code, setCode] = useState('// Write your code here\n');

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <textarea
        className="w-full h-64 bg-gray-900 text-white p-3 font-mono text-sm rounded-md
                  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                  focus:border-transparent transition-all duration-200"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ resize: 'none' }}
        spellCheck="false"
        placeholder="// Write your code here"
        autoComplete="off"
      />
    </div>
  );
};

export default CodePlayground;