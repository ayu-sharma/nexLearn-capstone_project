import z from "zod";

export const signupInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const loginInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const upgateGoal = z.object({
    goal: z.enum(['INTERNSHIP', 'PLACEMENT'])
});

export const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['CODING', 'APTITUDE', 'LANGUAGE']),
    goal: z.enum(['INTERNSHIP', 'PLACEMENT']),
});

export const contentSchema = z.object({
    heading: z.string(),
    subhead1: z.string(),
    subhead2: z.string().optional(),
    paragraph1: z.string(),
    paragraph2: z.string().optional(),
});

export const moduleSchema = z.object({
    courseId: z.string(),
    title: z.string(),
    index: z.number().positive()
});

export const materialSchema = z.object({
    moduleId: z.string(),
    title: z.string(),
    type: z.enum(["READING", "VIDEO", "ASSESSMENT"]),
    videoUrl: z.string().optional(),
    content: z.string().optional(),
    questions: z.array(
        z.object({
          text: z.string().min(1, 'Question text is required'),
          optionA: z.string().min(1, 'Option A is required'),
          optionB: z.string().min(1, 'Option B is required'),
          optionC: z.string().min(1, 'Option C is required'),
          optionD: z.string().min(1, 'Option D is required'),
          correctAnswer: z.enum(['A', 'B', 'C', 'D']),
        })
    ).nonempty('At least one question is required').optional()
}).refine(
    (data) =>
       (data.type === "READING" && data.content && !data.videoUrl && !data.questions) ||
       (data.type === "VIDEO" && data.videoUrl && !data.content && !data.questions) ||
       (data.type === "ASSESSMENT" && data.questions && !data.videoUrl && !data.content),
        {
            message: "A module must either have content for READING, quiz for ASSESSMENT or a videoUrl for VIDEO.",
            path: ["content", "videoUrl", "questions"],
        }
)

export const lastViewedSchema = z.object({
    courseId: z.number()
});

export const enrollCourseSchema = z.object({
    courseId: z.string()
});

export const dsaTopicSchema = z.object({
    title: z.string()
})

export const dsaProblemSchema = z.object({
    topicId: z.string(),
    title: z.string(),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    problemStatement: z.string(),
    sampleInput1: z.string(),
    sampleOutput1: z.string(),
    sampleInput2: z.string(),
    sampleOutput2: z.string()
});

export const testCaseSchema = z.object({
    problemId: z.string(),
    input: z.string(),
    expected: z.string()
})

export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type CourseSchema = z.infer<typeof courseSchema>;
export type ModuleSchema = z.infer<typeof moduleSchema>;
export type MaterialSchema = z.infer<typeof materialSchema>;
export type LastViewedSchema = z.infer<typeof lastViewedSchema>;
export type EnrollCourseSchema = z.infer<typeof enrollCourseSchema>;