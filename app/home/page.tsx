"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import Username from '@/components/Username';
import { Bell } from 'lucide-react';
import DashboardGrid from '@/components/custom/dashboard/dashboard-grid';
import CourseView from '@/components/custom/course/course-view';
import Library from '@/components/custom/library/library-view';
import CodePage from '@/components/custom/code/code-view';
import PracticeSection from '@/components/custom/practice/practice-section';
import NotificationSection from '@/components/custom/notification/notification-section';
import SettingsSection from '@/components/custom/settings/settings-section';

const HomePage = () => {
  
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState('Dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push('/login');
                return;
            }
        } catch (error) {
            console.error('Error finding authorisation token: ', error);
        }
    }

    checkAuth();
}, []);

useEffect(() => {
  const savedGroup = localStorage.getItem("selectedGroup");
  if (savedGroup) {
    setSelectedGroup(savedGroup);
  }
}, []);

// Persist selected group to localStorage whenever it changes
const handleGroupChange = (newGroup: string) => {
  setSelectedGroup(newGroup);
  localStorage.setItem("selectedGroup", newGroup);
};

  const renderComponent = () => {
    switch (selectedGroup) {
      case 'Dashboard':
        return <DashboardGrid />;
      case 'Library':
        return <Library onSelectCourse={handleCourseSelection}/>;
      case 'My Courses':
        return <CourseView courseId={selectedCourseId}/>;
      case 'Code':
        return <CodePage />;
      case 'Practice':
        return <PracticeSection />;
      case 'Messages':
        return <NotificationSection />;
      case 'Settings':
        return <SettingsSection />;
      default:
        return <div>Other component</div>;
    }
  }

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourseId(courseId); // Update selected course ID
    setSelectedGroup("My Courses"); // Switch to "My Courses" view
  };

  return (
    <div className='relative h-screen w-screen flex'>
      <RightNav />
      <Sidebar selectedGroup={selectedGroup} onSelectGroup={handleGroupChange}/>
      <div className='px-6 py-8 flex flex-col w-full'>
        <div className='text-2xl font-semibold mb-8'>
          {selectedGroup}
        </div>
        {renderComponent()}
      </div>
    </div>
  )
}

export default HomePage

const RightNav = () => {
  return (
    <div className='absolute top-6 right-6'>
        <div className='flex justify-evenly gap-x-8 items-center'>
          {/* <Searchbar /> */}
          <Button size={'icon'} variant={'outline'}>
            <Bell className='w-5 h-5'/>
          </Button>
          <Username />
          <ModeToggle />
        </div>
      </div>
  )
}