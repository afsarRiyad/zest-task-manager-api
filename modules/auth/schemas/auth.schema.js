import { z } from "zod";

const userSchema = z.object({
    name: z.string()
         .trim()
         .min(2, "Name must be at least 2 characters.")
         .max(50, "Name cannot exceed 50 characters.")
         .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,"Please enter a valid name."),

    email: z.string()
         .trim()
         .toLowerCase()
         .min(1, "Email is required.")
         .email("Please enter a valid email address."),
        
    password: z.string()
          .min(8, "Password must be at least 8 characters.")
          .max(64, "Password cannot exceed 64 characters.")
          .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
          .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
          .regex(/[0-9]/, "Password must contain at least one number.")
          .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),

    confirmPassword: z.string(),

    isVerified: z.boolean().default(false),

    otpHash: z.string().optional(),

    otpExpiresAt: z.coerce.date().optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});

export default userSchema