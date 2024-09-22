import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    // confirmPassword: z.string().min(8)
});

export const loginInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;