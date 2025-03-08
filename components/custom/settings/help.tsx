
            import React from "react";

            type AccountProps = {
              // Define any props you might need later
            };
            
            const Help: React.FC<AccountProps> = () => {
              return (
<div className="space-y-5">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">Frequently Asked Questions</h3>
                <ul className="space-y-3 mt-4">
                  <li className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <button className="flex justify-between items-center w-full text-left">
                      <span className="text-gray-700 dark:text-gray-200 font-medium">How do I reset my password?</span>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                  <li className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <button className="flex justify-between items-center w-full text-left">
                      <span className="text-gray-700 dark:text-gray-200 font-medium">How do I change my email?</span>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                  <li className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <button className="flex justify-between items-center w-full text-left">
                      <span className="text-gray-700 dark:text-gray-200 font-medium">Where can I manage my subscriptions?</span>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">Contact Support</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Need help? Our support team is here for you.</p>
                <button className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow-sm">
                  Contact Support
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                <h3 className="text-gray-700 dark:text-gray-200 font-medium mb-2">Documentation</h3>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <a href="#" className="block py-2 text-indigo-600 dark:text-indigo-400 hover:underline">Getting Started Guide</a>
                  <a href="#" className="block py-2 text-indigo-600 dark:text-indigo-400 hover:underline">API Documentation</a>
                  <a href="#" className="block py-2 text-indigo-600 dark:text-indigo-400 hover:underline">Best Practices</a>
                </div>
              </div>
            </div>
              );
            };
            
            export default Help;
            