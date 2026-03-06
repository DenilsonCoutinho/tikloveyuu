import { z } from "zod"

const memorySchema = z
  .object({
    image: z.any().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    title: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasImage =
      data.image instanceof File && data.image.size > 0

    if (hasImage) {
      if (!data.description || data.description.trim().length < 5) {
        ctx.addIssue({
          code: "custom",
          message: "A frase precisa ter pelo menos 5 caracteres.",
          path: ["description"],
        })
      }

      if (!data.date || data.date.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Escolha a data desse momento.",
          path: ["date"],
        })
      }

      if (!data.title || data.title.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Adicione um título para esse momento.",
          path: ["title"],
        })
      }

      if (data.title && data.title.length > 20) {
        ctx.addIssue({
          code: "custom",
          message: "Máximo 20 caracteres.",
          path: ["title"],
        })
      }

      if (data.description && data.description.length > 120) {
        ctx.addIssue({
          code: "custom",
          message: "Máximo 120 caracteres.",
          path: ["description"],
        })
      }
    }
  })

export const memoriesFormSchema = z
  .object({
    memories: z.array(memorySchema).length(7),

    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {

    const filledMemories = data.memories.filter(
      (m) => m.image instanceof File && m.image.size > 0
    )

    if (filledMemories.length < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Adicione pelo menos 3 memórias com foto.",
        path: ["memories"],
      })
    }

    if (data.password && data.password.length > 0) {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não coincidem.",
          path: ["confirmPassword"],
        })
      }
    }
  })

export type MemoriesFormValues = z.infer<typeof memoriesFormSchema>