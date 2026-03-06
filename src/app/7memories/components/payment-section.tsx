"use client"

import { ReactEventHandler, useState } from "react"
import {
  Heart,
  QrCode,
  CreditCard,
  Copy,
  Check,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import logo from '@/assets/logoLove.png'
import { getQrCodPix } from "@/services/getQrCodPix"
import generatorPix from "@/services/generatorPix"
import { useForm } from "react-hook-form"
import { memoriesFormSchema, MemoriesFormValues } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { uploadImage } from "../../../../actions/uploadImage"
import { createUser } from "../../../../actions/createUser"
interface PaymentSectionProps {
  onBack: () => void
  data: {
    image?: File;
    description?: string;
    date?: string;
    title?: string | undefined;
  }[]
}

export function PaymentSection({ onBack, data }: PaymentSectionProps) {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")

  function formatCPF(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 11)

    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  const [processingCard, setProcessingCard] = useState(false)
  const [qrCode, setQrCode] = useState<string>('');
  const [encoder, setEncoder] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<MemoriesFormValues>({
    defaultValues: {
      memories: data as MemoriesFormValues["memories"],
    }
  })
  const handleCopy = async () => {
    try {
      const text = navigator.clipboard.writeText(qrCode);
      setCopied(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCopied(false)
    } catch (err) {
      console.error("Falha ao colar conteúdo:: ", err);
    }
  };

  function handleCpfChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCpf(formatCPF(e.target.value))
  }

  async function submit(e: MemoriesFormValues) {
  try {
    setIsSubmitting(true)

    // -------------------------
    // 1. ENVIAR IMAGENS
    // -------------------------

    const formData = new FormData()

    e.memories.forEach((memory, index) => {
      if (memory.image instanceof File) {
        formData.append(`image-${index}`, memory.image)
      }
    })

    // upload das imagens
    const uploadedImages = await uploadImage(formData)

    // uploadedImages exemplo:
    // [
    //   { index: 0, url: "https://r2.dev/temp/abc.webp" },
    //   { index: 2, url: "https://r2.dev/temp/xyz.webp" }
    // ]

    // -------------------------
    // 2. MONTAR MEMÓRIAS COM URL
    // -------------------------

    const memories = e.memories.map((memory, index) => {

      const uploaded = uploadedImages.find(
        (img: { index: number; url: string }) => img.index === index
      )

      return {
        imageUrl: uploaded ? uploaded.url : null,
        description: memory.description ?? "",
        date: memory.date ?? "",
        title: memory.title ?? ""
      }
    })

    // -------------------------
    // 3. SALVAR NO BANCO
    // -------------------------

    const create = await createUser({
      memories,
      name,
      cpf,
      email
    })

    // -------------------------
    // 4. GERAR PIX
    // -------------------------

    const { pixCustomersDataId } = await generatorPix({
      id: create.id,
      name: name,
      cpfCnpj: cpf,
      description: "tikloveyuu",
      email: email,
      price: 19.9
    })

    // -------------------------
    // 5. PEGAR QR CODE
    // -------------------------

    const { encodedImage, qrCode } = await getQrCodPix(
      pixCustomersDataId as string
    )

    if (!encodedImage) {
      throw new Error("Erro ao gerar pix!")
    }

    setQrCode(qrCode)
    setEncoder(encodedImage)
    setSubmitted(true)

  } catch (error) {

    console.error(error)

  } finally {

    setIsSubmitting(false)

  }
}

  function handleCopyPix() {
    navigator.clipboard.writeText(encoder)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  async function handlePixPayment() {
    try {

    } catch (error: unknown) {
      setIsSubmitting(false)
      setSubmitted(false)

      throw new Error("Erro interno")
    }
  }

  {
    if (submitted) return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center justify-center rounded-xl  max-w-72">
          <Image width={300} height={300} className='m-auto' alt='qrCode' src={`data:image/png;base64,${encoder}`} />
          <div className='flex flex-col items-center bg-gray-100 p-1'>
            <p className='font-bold text-xs text-yellow-600 uppercase'>Atenção</p>
            <p className='text-center text-black text-xs font-semibold px-2 wrap-break-word'>Assim que fizer o pagamento você receberá no e-mail a sua Timeline Infinita!</p>
          </div>
        </div>
        <Button onClick={() => {
          handleCopy(); toast.success("Copiado com sucesso!", {
            style: {
              background: "#00c950"
            },
            position: "top-center"

          })
        }} className='select-none hover:bg-green-500 bg-green-700 ' ><p className=' text-white  font-medium px-2'>{copied ? "Copiado" : "Copiar"}</p> <span className=' border border-white rounded-md p-1'><Copy className=' text-white' /></span></Button>
        <p className="text-xs text-muted-foreground">
          Aguardando confirmação...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="">
          <Image width={180} src={logo} alt="logo" />
        </div>
        <h2 className="font-serif text-3xl text-white text-balance">
          Quase lá!
        </h2>
        <p className="max-w-sm text-muted-foreground leading-relaxed">
          Suas 7 memórias estão prontas. Finalize o pagamento para publicar
          a página do casal.
        </p>
      </div>

      {/* Resumo do valor */}
      <Card
        className="border-primary/20"
        style={{ boxShadow: "0 2px 35px rgba(69, 0, 229, 0.15)" }}
      >
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-muted-foreground">
              7 Memórias para Casais
            </span>
            <span className="text-xs text-muted-foreground/70">
              Página personalizada do casal
            </span>
          </div>
          <span className="font-serif text-2xl font-bold text-foreground">
            R$ 19,90
          </span>
        </CardContent>
      </Card>

      {/* Seleção de método — Pix (Asaas) / Cartão (Stripe) */}
      <Tabs
        defaultValue="pix"
        className=" "
        onValueChange={(val) => setPaymentMethod(val as "pix" | "card")}
      >
        <TabsList className="  w-full  bg-secondary">
          <TabsTrigger
            value="pix"
            className="gap-2  text-sm font-medium data-[state=active]:bg-defaultBg data-[state=active]:text-primary-foreground"
          >
            <QrCode className="size-4" />
            Pix
          </TabsTrigger>

        </TabsList>
      </Tabs>

      <form
        onSubmit={form.handleSubmit(submit)}
        className="max-w-md mx-auto w-full space-y-4 p-4 bg-white rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold">
          Dados pessoais
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Nome completo
          </label>

          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            E-mail
          </label>

          <input
            type="text"
            placeholder="Seu melhor Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            CPF
          </label>

          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={`h-12 w-full text-base font-semibold bg-[#4500E5] hover:bg-[#4500E5] flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          style={{ boxShadow: "0 2px 35px rgba(69, 0, 229, 0.39)" }}
        >
          {isSubmitting && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {isSubmitting ? 'Processando...' : 'Confirmar forma de pagamento'}
        </Button>
      </form>

      {/* Voltar */}
      {submitted ?
        <></>
        :
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar e editar memórias
        </button>}
    </div>
  )
}
