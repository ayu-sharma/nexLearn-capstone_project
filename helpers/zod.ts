import z from "zod";

export const signupInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const loginInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const courseSchema = z.object({
    title: z.string(),
    type: z.enum(['CODING', 'APTITUDE', 'LANGUAGE_SKILLS']),
    goal: z.enum(['INTERNSHIP', 'PLACEMENT']),
});

export const moduleSchema = z.object({
    title: z.string(),
    content: z.string(),
    videoUrl: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type CourseSchema = z.infer<typeof courseSchema>;
export type ModuleSchema = z.infer<typeof moduleSchema>;