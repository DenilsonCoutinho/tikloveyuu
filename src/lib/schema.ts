import { z } from "zod"

const memorySchema = z.object({
  image: z
    .instanceof(File, { message: "Envie uma foto para esse momento." })
    .refine((f) => f.size > 0, "Envie uma foto para esse momento."),
  description: z
    .string()
    .min(5, "A frase precisa ter pelo menos 5 caracteres.")
    .max(120, "A frase pode ter no maximo 120 caracteres."),
  date: z.string().min(1, "Escolha a data desse momento."),
  title: z.string().min(1,).max(15,"A frase pode ter no maximo 50 caracteres.").optional(),
})

export const memoriesFormSchema = z
  .object({
    memories: z.array(memorySchema).length(2, "Voce precisa preencher todos os 7 momentos."),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password.length >= 4
      }
      return true
    },
    {
      message: "A senha precisa ter pelo menos 4 caracteres.",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: "As datas não coincidem.",
      path: ["confirmPassword"],
    }
  )

export type MemoriesFormValues = z.infer<typeof memoriesFormSchema>
