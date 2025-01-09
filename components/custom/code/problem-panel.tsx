const ProblemPanel = () => {
    return (
      <div className="bg-whi p-6 rounded-lg border h-full">
        <h2 className="text-xl font-bold">Contains Duplicate</h2>
        <p className="mt-4 text-gray-700 dark:text-slate-400">
          Given an integer array nums, return true if any value appears more than
          once in the array, otherwise return false.
        </p>
        <div className="mt-6">
          <h3 className="font-medium">Example 1:</h3>
          <pre className="bg-neutral-800 text-white p-4 rounded mt-2">
            Input: nums = [1, 2, 3, 3]
            <br />
            Output: true
          </pre>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Example 2:</h3>
          <pre className="bg-neutral-800 text-white p-4 rounded mt-2">
            Input: nums = [1, 2, 3, 4]
            <br />
            Output: false
          </pre>
        </div>
      </div>
    );
  };
  
  export default ProblemPanel;
  