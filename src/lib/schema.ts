import { z } from "zod"

const memorySchema = z.object({
  image: z
    .instanceof(File, { message: "Envie uma foto para esse momento." })
    .refine((f) => f.size > 0, "Envie uma foto para esse momento."),
  description: z
    .string()
    .min(5, "A frase precisa ter pelo menos 5 caracteres.")
    .max(120, "A frase pode ter no máximo 120 caracteres."),
  date: z.string().min(1, "Escolha a data desse momento."),
  // Ajustado para aceitar string vazia corretamente
  title: z.string().max(20, "Máximo 20 caracteres.").optional().or(z.literal("")),
})

const emptyMemory = z.object({
  image: z.any().optional(),
  description: z.string().optional().or(z.literal("")),
  date: z.string().optional().or(z.literal("")),
  title: z.string().optional().or(z.literal("")),
});

export const memoriesFormSchema = z.object({
  memories: z.tuple([
    memorySchema, // Índice 0: Obrigatório
    z.union([memorySchema, emptyMemory]), // Índice 1: Preenchido ou Vazio
    z.union([memorySchema, emptyMemory]), // Índice 2: Preenchido ou Vazio
    z.union([memorySchema, emptyMemory]), // ...
    z.union([memorySchema, emptyMemory]),
    z.union([memorySchema, emptyMemory]),
    z.union([memorySchema, emptyMemory]),
  ]),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
})
.refine(
  (data) => {
    if (data.password && data.password.length > 0) {
      return data.password === data.confirmPassword
    }
    return true
  },
  {
    message: "As senhas não coincidem.", // Corrigido de "datas" para "senhas"
    path: ["confirmPassword"],
  }
)

export type MemoriesFormValues = z.infer<typeof memoriesFormSchema>
