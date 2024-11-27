import React from 'react'
import { ModuleDetail } from './types'
import { ChevronRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModuleContentProps {
    selectedModule: ModuleDetail | null;
    loading: boolean;
    toggleModuleCompletion: (moduleId: number, currentStatus: boolean) => void;
}

const ModuleContent = ({ selectedModule, loading, toggleModuleCompletion }: ModuleContentProps) => {
  return (
    <div className="relative h-full w-3/4 p-4 border rounded overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoaderCircle className='h-12 w-12 animate-spin' />
            </div>
          ) : selectedModule ? (
            <>
              {selectedModule.content ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{selectedModule.content.heading}</h2>
                  {selectedModule.content.subhead2 && (
                    <h4 className="text-md font-medium">{selectedModule.content.subhead2}</h4>
                  )}
                  <p className="text-base">{selectedModule.content.paragraph1}</p>
                  <h3 className="text-lg font-medium">{selectedModule.content.subhead1}</h3>
                  {selectedModule.content.paragraph2 && (
                    <p className="text-base">{selectedModule.content.paragraph2}</p>
                  )}
                </div>
              ) : selectedModule.videoUrl ? (
                <div className="mt-4">
                  <video controls className="w-full">
                    <source src={selectedModule.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className='flex items-center justify-center h-full'>Oops! Nothing here.</div>
              )}

              <div className="mt-6">
                <h3 className="text-xl font-semibold">Assessments</h3>
                {selectedModule.assessments.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {selectedModule.assessments.map((assessment) => (
                      <li
                        key={assessment.id}
                        className="border p-4 rounded shadow-sm space-y-2"
                      >
                        <h4 className="text-lg font-medium">{assessment.type} - {assessment.level}</h4>
                        <p className="font-medium">Question:</p>
                        <p>{assessment.question}</p>
                        <p className="font-medium">Options:</p>
                        <ul className="list-disc ml-6">
                          {assessment.options.map((option, index) => (
                            <li key={index}>{option}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No assessments available for this module.</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">Select a module to view its content.</div>
          )}

          {/* Footer Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-x-4">
            <Button
              onClick={async () => {
                if (selectedModule) {
                  // Trigger toggle on the Mark as Completed button click
                  toggleModuleCompletion(selectedModule.id, selectedModule.completed);
                }
              }}
            >
              {selectedModule?.completed ? 'Module Complete' : 'Mark as Completed'}
            </Button>
            <Button size="icon">
              <ChevronRight />
            </Button>
          </div>
        </div>
  )
}

export default ModuleContent