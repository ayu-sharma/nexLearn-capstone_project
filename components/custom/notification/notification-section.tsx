import React, { useState } from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationSection: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New message received',
      message: 'You have a new message from Sarah about the project deadline.',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Meeting reminder',
      message: 'Your team meeting starts in 30 minutes. Don\'t forget to prepare your updates.',
      time: '15 minutes ago',
      read: false,
    },
    {
      id: 3,
      title: 'Task completed',
      message: 'The task "Update documentation" has been marked as complete by John.',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 4,
      title: 'Task completed',
      message: 'The task "Update documentation" has been marked as complete by John.',
      time: '1 hour ago',
      read: true,
    },
  ]);

  const markAsRead = (id: number): void => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = (): void => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: number): void => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-medium text-gray-800">Notifications</h2>
            <button 
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-72 overflow-auto">
            <div className="max-h-full overflow-y-auto pr-2">
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-lg transition-all duration-200 ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 mr-3">
                          <h3 className="font-medium text-gray-800">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                        </div>
                        <div className="flex flex-shrink-0 space-x-2">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                            >
                              Mark read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
            <p className="text-sm text-gray-500">
              {notifications.length} total notifications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;