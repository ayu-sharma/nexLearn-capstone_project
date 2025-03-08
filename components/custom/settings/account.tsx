import React from "react";

type AccountProps = {
  // Define any props you might need later
};

const Account: React.FC<AccountProps> = () => {
  return (
    <div>
       <div className="space-y-5">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-4">Account Security</h3>
              <button className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow-sm">
                Change Password
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-4">Data Management</h3>
              <button className="w-full mb-3 py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 shadow-sm">
                Export Data
              </button>
              <button className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 shadow-sm">
                Privacy Settings
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-4">Danger Zone</h3>
              <button className="w-full py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition duration-200 shadow-sm">
                Delete Account
              </button>
            </div>
          </div>
    </div>
  );
};

export default Account;
