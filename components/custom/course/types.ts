
export interface CourseViewProps {
    initialCourseId: string | null;
  }
  
export interface ModuleListItem {
    id: number;
    title: string;
    type: string;
    completed: boolean;
  }
  
export interface ModuleDetail {
    id: number;
    title: string;
    completed: boolean;
    content: Content | null;
    videoUrl: string | null;
    courseId: number;
    assessments: Assessment[];
  }
  
 export interface Content {
    heading: string;
    subhead1: string;
    subhead2?: string;
    paragraph1: string;
    paragraph2?: string;
  }
  
  
 export interface Assessment {
    id: number;
    type: string;
    level: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }

export interface Course {
    id: number;
    title: string;
    description: string;
    type: string;
    goal: string;
    lastViewedAt: string | null;
    createdAt: string;
    updatedAt: string;
    correctAnswers: number;
    modules: ModuleListItem[];
}