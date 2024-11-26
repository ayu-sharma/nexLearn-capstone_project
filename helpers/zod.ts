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
    title: z.string(),
    type: z.enum(["READING", "VIDEO"]),
    content: contentSchema.optional(),
    videoUrl: z.string().optional(),
}).refine(
    (data) =>
      (data.type === "READING" && data.content && !data.videoUrl) ||
      (data.type === "VIDEO" && data.videoUrl && !data.content),
    {
      message: "A module must either have content for READING or a videoUrl for VIDEO, but not both.",
      path: ["content", "videoUrl"],
    }
);

export const assessmentSchema = z.object({
    type: z.enum(['CODING', 'MCQ']),
    level: z.enum(['EASY', 'MEDIUM', 'HARD']),
    question: z.string(),
    options: z.array(z.string()).optional(), // MCQ options
    correctAnswer: z.string(),
});

export const lastViewedSchema = z.object({
    courseId: z.number()
});

export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type CourseSchema = z.infer<typeof courseSchema>;
export type ModuleSchema = z.infer<typeof moduleSchema>;
export type AssessmentSchema = z.infer<typeof assessmentSchema>;
export type LastViewedSchema = z.infer<typeof lastViewedSchema>;