import React from 'react';

interface NotificationProps {
  handleNotificationChange: (type: 'email' | 'push' | 'sms') => void;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const NotificationBar: React.FC<NotificationProps> = ({ handleNotificationChange, notifications }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <div>
          <h3 className="text-gray-700 dark:text-gray-200 font-medium">Email Notifications</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Receive updates via email</p>
        </div>
        <button 
          onClick={() => handleNotificationChange('email')}
          className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${notifications.email ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          <span className={`inline-block w-5 h-5 transform transition-transform duration-300 ${notifications.email ? 'translate-x-6' : 'translate-x-1'} rounded-full bg-white shadow-md`}></span>
        </button>
      </div>
      
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <div>
          <h3 className="text-gray-700 dark:text-gray-200 font-medium">Push Notifications</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Receive real-time alerts</p>
        </div>
        <button 
          onClick={() => handleNotificationChange('push')}
          className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${notifications.push ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          <span className={`inline-block w-5 h-5 transform transition-transform duration-300 ${notifications.push ? 'translate-x-6' : 'translate-x-1'} rounded-full bg-white shadow-md`}></span>
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;