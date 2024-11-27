import React from 'react'
import { ModuleListItem } from './types'
import { File, Video } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ModuleListViewProps {
    modules: ModuleListItem[];
    selectedModuleId: number | undefined;
    onModuleClick: (moduleId: number) => void;
    onToggleComplete: (moduleId: number, completed: boolean) => void;
}

const ModuleListView = ({ modules, selectedModuleId, onModuleClick, onToggleComplete }: ModuleListViewProps) => {
  return (
    <div className="flex flex-col gap-6 w-1/4 overflow-y-auto">
          {modules.sort((a, b) => a.id - b.id).map((module) => (
            <div
              key={module.id}
              className={`flex justify-between items-center p-4 border rounded transition cursor-pointer hover:border-neutral-400 ${selectedModuleId === module.id ? "dark:bg-indigo-950 bg-indigo-200" : ""
                }`}
              onClick={() => onModuleClick(module.id)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {module.type === 'READING' ? <File className="h-5 mr-2" /> : <Video className='h-5 mr-2' />}
                  <h2>Module {module.id}</h2>
                </div>
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </div>
              <Checkbox
                checked={module?.completed}
                onClick={() => onToggleComplete(module.id, module.completed)}
              />
            </div>
          ))}
        </div>
  )
}

export default ModuleListView