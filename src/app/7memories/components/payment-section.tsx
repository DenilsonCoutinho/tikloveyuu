"use client"

import { useState } from "react"
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
interface PaymentSectionProps {
  onBack: () => void
}

export function PaymentSection({ onBack }: PaymentSectionProps) {
  const [copied, setCopied] = useState(false)
  const [processingCard, setProcessingCard] = useState(false)
  const [qrCode, setQrCode] = useState<string>('');
  const [encoder, setEncoder] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  // TODO: Substituir pela chave Pix real gerada pelo Asaas
  const PIX_CODE =
    "00020126580014br.gov.bcb.pix0136exemplo-chave-pix-aqui5204000053039865802BR5925Nome Exemplo6009SAO PAULO62070503***6304ABCD"

  function handleCopyPix() {
    navigator.clipboard.writeText(PIX_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4)
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2)
    }
    return digits
  }

  async function handlePixPayment() {
    try {
      
    } catch (error: unknown) {
      setIsSubmitting(false)
      setSubmitted(false)

      throw new Error("Erro interno")
    }
  }

  async function handleCardPayment() {
    setProcessingCard(true)

    // TODO: Integrar com Stripe Checkout / Payment Intent
    // POST /api/payments/stripe/checkout
    console.log("[v0] Cartão enviado — integração Stripe pendente", {
      lastFour: cardData.number.replace(/\s/g, "").slice(-4),
      name: cardData.name,
    })

    await new Promise((resolve) => setTimeout(resolve, 2500))
    setProcessingCard(false)
    alert("Pagamento processado com sucesso!")
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="">
          <Image width={180} src={logo} alt="logo" />
        </div>
        <h2 className="font-serif text-3xl text-foreground text-balance">
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
        className="flex flex-col gap-4"
        onValueChange={(val) => setPaymentMethod(val as "pix" | "card")}
      >
        <TabsList className="grid w-full grid-cols-2 h-12 bg-secondary">
          <TabsTrigger
            value="pix"
            className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <QrCode className="size-4" />
            Pix
          </TabsTrigger>
          <TabsTrigger
            value="card"
            className="gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CreditCard className="size-4" />
            Cartão
          </TabsTrigger>
        </TabsList>

        {/* ─── Pix via Asaas ─── */}
        <TabsContent value="pix" className="mt-0">
          <Card className="border-border/60">
            <CardContent className="flex flex-col items-center gap-5 py-6">
              {/* Badge gateway */}
              <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Pagamento via Pix
              </span>

              {/* QR Code — será substituído pela imagem gerada pelo Asaas */}
              <div
                className="flex size-48 items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-secondary/50"
                style={{ boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)" }}
              >
                <QrCode className="size-24 text-primary/60" />
              </div>

              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                Escaneie o QR Code acima ou copie o código Pix abaixo
              </p>

              <Separator className="bg-border/50" />

              {/* Código Pix copia e cola */}
              <div className="flex w-full flex-col gap-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Código Pix Copia e Cola
                </Label>
                <div className="flex gap-2">
                  <div className="flex-1 truncate rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm text-muted-foreground">
                    {PIX_CODE.slice(0, 40)}...
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-primary/30 hover:bg-primary/10"
                    onClick={handleCopyPix}
                    aria-label="Copiar código Pix"
                  >
                    {copied ? (
                      <Check className="size-4 text-green-400" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
                {copied && (
                  <span className="text-xs text-green-400">
                    Código copiado!
                  </span>
                )}
              </div>

              {/* Botão de confirmar pagamento Pix */}
              <Button
                type="button"
                size="lg"
                className="h-12 w-full text-base font-semibold"
                style={{ boxShadow: "0 2px 35px rgba(69, 0, 229, 0.39)" }}
                onClick={handlePixPayment}
              >
                Já fiz o pagamento
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                <ShieldCheck className="size-3.5" />
                <span>Pagamento instantâneo e seguro via Pix</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Cartão via Stripe ─── */}
        <TabsContent value="card" className="mt-0">
          <Card className="border-border/60">
            <CardContent className="flex flex-col gap-5 py-6">
              {/* Badge gateway */}
              <div className="flex justify-center">
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Pagamento via cartão
                </span>
              </div>

              {/* Número do cartão */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="card-number"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Número do cartão
                </Label>
                <Input
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData((prev) => ({
                      ...prev,
                      number: formatCardNumber(e.target.value),
                    }))
                  }
                  maxLength={19}
                  inputMode="numeric"
                  className="h-11 bg-secondary/50 border-border"
                />
              </div>

              {/* Nome no cartão */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="card-name"
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  Nome no cartão
                </Label>
                <Input
                  id="card-name"
                  placeholder="Como está no cartão"
                  value={cardData.name}
                  onChange={(e) =>
                    setCardData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="h-11 bg-secondary/50 border-border"
                />
              </div>

              {/* Validade e CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="card-expiry"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    Validade
                  </Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/AA"
                    value={cardData.expiry}
                    onChange={(e) =>
                      setCardData((prev) => ({
                        ...prev,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    maxLength={5}
                    inputMode="numeric"
                    className="h-11 bg-secondary/50 border-border"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="card-cvv"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    CVV
                  </Label>
                  <Input
                    id="card-cvv"
                    placeholder="000"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData((prev) => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                      }))
                    }
                    maxLength={4}
                    inputMode="numeric"
                    type="password"
                    className="h-11 bg-secondary/50 border-border"
                  />
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                className="h-12 w-full text-base font-semibold"
                style={{ boxShadow: "0 2px 35px rgba(69, 0, 229, 0.39)" }}
                disabled={processingCard}
                onClick={handleCardPayment}
              >
                {processingCard ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Pagar R$ 19,90"
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
                <ShieldCheck className="size-3.5" />
                <span>Pagamento seguro e criptografado</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Voltar */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar e editar memórias
      </button>
    </div>
  )
}
