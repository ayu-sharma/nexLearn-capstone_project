import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Username from "@/components/Username";
import { Bell, X, Check, AlertCircle, Mail, Info } from "lucide-react";

interface Notification {
  id: string | number;
  message: string;
  time: string;
  read: boolean;
  type?: 'message' | 'alert' | 'info';
}

const RightNav = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const response = await fetch('/data/notification.json');
                const data = await response.json();
                if (data.notifications) {
                    setNotifications(data.notifications);
                } else {
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        // Close sidebar when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current && 
                !sidebarRef.current.contains(event.target as Node) && 
                !(event.target as Element).closest('.notification-bell-btn')
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Prevent body scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            // Prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scrolling
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    const markAsRead = (id: string | number) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id: string | number) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const getNotificationIcon = (type?: string) => {
        switch (type) {
            case 'message':
                return <Mail className="h-4 w-4 text-blue-500" />;
            case 'alert':
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Info className="h-4 w-4 text-gray-500" />;
        }
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative notification-bell-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <>
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 animate-ping opacity-75"></span>
                        </>
                    )}
                </Button>

                {isOpen && (
                    <div 
                        ref={sidebarRef}
                        className="absolute right-0 top-10 z-50 w-80 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden"
                    >
                        <div className="p-4 flex items-center justify-between">
                            <h2 className="font-semibold text-lg">Notifications</h2>
                            <div className="flex gap-2">
                                {unreadCount > 0 && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={markAllAsRead}
                                        className="text-xs"
                                    >
                                        Mark all as read
                                    </Button>
                                )}
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">Loading notifications...</div>
                            ) : notifications.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">No notifications</div>
                            ) : (
                                <div className="py-2">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="relative">
                                            <div 
                                                className={`p-4 hover:bg-gray-100 cursor-pointer ${
                                                    !notification.read ? 'bg-blue-50' : ''
                                                }`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex gap-3">
                                                    <div className="mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {!notification.read && (
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-6 w-6"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    markAsRead(notification.id);
                                                                }}
                                                            >
                                                                <Check className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-6 w-6 text-red-500"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteNotification(notification.id);
                                                            }}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Username />
        </div>
    );
};

export default RightNav;