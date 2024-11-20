import * as z from "zod"

export const eventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    info: z.string().min(3, "Description must be at least 3 characters"),
    location: z.string().min(3, "Please select a location"),
    imageUrl: z
      .instanceof(File)
      .or(z.string())
      .or(z.null())
      .refine((value) => value !== null && value !== "", {
        message: "Image is required",
      }),
    startDateTime: z.date(),
    endDateTime: z.date(),
    ticketDate: z.date(),
    category: z.string().min(3, "Please select a category"),
    price: z.number(),
    views: z.number(),
    url: z.string().url().optional(),
    mapLink: z.string().url().optional(),
  })
  .refine((data) => data.endDateTime >= data.startDateTime, {
    message: "End date cannot be before start date",
    path: ["endDateTime"],
  })
  .refine((data) => data.ticketDate <= data.endDateTime, {
    message: "Ticket sales end date cannot be after the event end date",
    path: ["ticketDate"],
  })

export const userFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email(),
  image: z.instanceof(File).or(z.string()).or(z.null()),
  instagram: z.string().url().optional().or(z.null()),
  facebook: z.string().url().optional().or(z.null()),
  twitter: z.string().url().optional().or(z.null()),
})

export const adminFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
