import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  info: z.string().min(3, "Description must be at least 3 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.instanceof(File).or(z.string()).or(z.null()),
  startDateTime: z.date(),
  endDateTime: z.date(),
  ticketDate: z.date(),
  category: z.string(),
  price: z.number(),
  views: z.number(),
  url: z.string().url().optional(),
})
