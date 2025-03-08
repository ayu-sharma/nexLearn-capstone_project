type AccountProps = {
  // Define any props you might need later
};

const Privacy: React.FC<AccountProps> = () => {
  return (
    <div>
      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">
            Data Sharing
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Choose how your information is shared
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="share-analytics"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="share-analytics"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Allow anonymous usage data collection
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="share-profile"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="share-profile"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Share profile with third-party services
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="share-activity"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="share-activity"
                className="ml-3 text-sm text-gray-700 dark:text-gray-300"
              >
                Let others see my activity status
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">
            Cookies & Tracking
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Manage cookie preferences
          </p>
          <button className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 shadow-sm">
            Manage Cookie Settings
          </button>
        </div>
      </div>
      import React from "react";
    </div>
  );
};

export default Privacy;
