import { z } from "zod";

export const driverSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Driver name must be at least 2 characters long" })
    .max(50, { message: "Driver name must be less than 50 characters" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be no more than 15 digits" }),
  date: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Please provide a valid date in YYYY-MM-DD format",
  }),
  driverImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image (JPG, PNG, etc.)",
    })
    .optional(),
});
