"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { memoriesFormSchema, type MemoriesFormValues } from "@/lib/schema"
import { MemoryCard } from "./memory-card"
import { PasswordSection } from "./password-section"
import { PaymentSection } from "./payment-section"
import Image from "next/image"
import logo from '../../../assets/logoLove.png'
import { createMemories } from "../../../../actions/uploadImage"

const DEFAULT_MEMORIES = Array.from({ length: 2 }, () => ({
  image: undefined as unknown as File,
  description: "",
  date: "",
  title:""
}))

export function MemoriesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"form" | "payment">("form")
  const id = crypto.randomUUID()
  const form = useForm<MemoriesFormValues>({
    resolver: zodResolver(memoriesFormSchema),

    defaultValues: {
      memories: DEFAULT_MEMORIES,
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  })

  async function onSubmit(data: MemoriesFormValues) {
    console.log(data.memories)
    const formData = new FormData()

    data.memories.forEach((memory, index) => {
      formData.append(`image-${index}`, memory.image)
      formData.append(`description-${index}`, memory.description)
      formData.append(`date-${index}`, memory.date)
      formData.append(`title-${index}`, memory.title??"")
    })
    try {

      setIsSubmitting(true)
      await createMemories(formData)
      setIsSubmitting(false)

    } catch (error) {
      console.error(error)
      setIsSubmitting(false)

    }
    return
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Formulário enviado:", {
      memoriesCount: data.memories.length,
      hasPassword: !!data.password,
    })

    setIsSubmitting(false)
    setStep("payment")
  }

  return (
    <>
      {/* Formulário — permanece montado (oculto quando no pagamento) para preservar previews */}
      <div className={step === "payment" ? "hidden" : ""}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Cabeçalho */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="">
                <Image src={logo} alt="logo" width={140} />
              </div>
              <h1 className="font-serif text-3xl text-white md:text-4xl text-balance">
                7 Memórias para Casais
              </h1>
              <p className="max-w-md text-muted-foreground leading-relaxed">
                Escolha 7 momentos especiais do casal, adicione uma foto, uma frase
                e a data de cada um.
              </p>
            </div>

            {/* Cards de memórias */}
            <div className="flex flex-col gap-5">
              {Array.from({ length: 2 }, (_, i) => (
                <MemoryCard key={i} index={i} />
              ))}
            </div>

            {/* Seção de senha */}
            {/* <PasswordSection /> */}

            {/* Botão de envio */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-12 w-full text-base font-semibold bg-[#4500E5] hover:bg-[#4500E5]"
              style={{ boxShadow: "0 2px 35px rgba(69, 0, 229, 0.39)" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar nossa página"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Pagamento — exibido após envio do formulário */}
      {step === "payment" && (
        <PaymentSection onBack={() => setStep("form")} />
      )}
    </>
  )
}
