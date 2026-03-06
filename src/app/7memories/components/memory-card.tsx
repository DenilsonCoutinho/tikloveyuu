"use client"

import React, { useCallback, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { ImagePlus, X } from "lucide-react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MemoriesFormValues } from "@/lib/schema"
import Image from "next/image"

const MOMENT_LABELS = [
  "Exemplo: Primeiro encontro",
  "Exemplo: Primeiro beijo",
  "Exemplo: Uma viagem juntos",
  "Exemplo: Risada inesquecível",
  "Exemplo: Momento de superação",
  "Exemplo: Surpresa especial",
  "Exemplo:Nosso momento favorito",
]

export function MemoryCard({ index }: { index: number }) {
  const form = useFormContext<MemoriesFormValues>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const description = form.watch(`memories.${index}.description` as any) ?? ""
  const title = form.watch(`memories.${index}.title` as any) ?? ""
  const charCount = description.length
  const charCountTitle = title.length

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        form.setValue(`memories.${index}.image` as any, file, {
          shouldValidate: true,
        })
        const url = URL.createObjectURL(file)
        setPreview(url)
      }
    },
    [form, index]
  )

  const handleRemoveImage = useCallback(() => {
    form.setValue(`memories.${index}.image`as any, undefined as unknown as File, {
      shouldValidate: true,
    })
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [form, index])

  return (
    <Card className="border-border/60 shadow-none transition-shadow hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {index + 1}
          </span>
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              Momento {index + 1}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {MOMENT_LABELS[index]}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* Image upload */}
        <FormField
          control={form.control}
          name={`memories.${index}.image` as any}
          render={() => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                Foto
              </FormLabel>
              <FormControl>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                    aria-label={`Enviar foto do momento ${index + 1}`}
                  />
                  {preview ? (
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        width={300}
                        height={300}
                        quality={100}
                        src={preview}
                        alt={`Preview do momento ${index + 1}`}
                        className="aspect-[9/16] w-full bg-center object-cover swing-in-right-fwd "
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-foreground/70 text-background transition-colors hover:bg-foreground/90"
                        aria-label="Remover foto"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/20 bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent/50"
                      style={{ boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)' }}
                    >
                      <ImagePlus className="size-8 opacity-60" />
                      <span className="text-sm">Clique para enviar uma foto</span>
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`memories.${index}.title`as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                  Título que descreva o momento
                </FormLabel>
                <span
                  className={`text-xs tabular-nums ${charCountTitle > 20
                    ? "text-destructive"
                    : charCountTitle > 100
                      ? "text-primary"
                      : "text-muted-foreground"
                    }`}
                >
                  {charCountTitle}/20
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Escreva algo especial sobre esse momento..."
                  className="resize-none"
                  maxLength={20}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={form.control}
          name={`memories.${index}.description`as any}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                  Sua frase
                </FormLabel>
                <span
                  className={`text-xs tabular-nums ${charCount > 120
                    ? "text-destructive"
                    : charCount > 100
                      ? "text-primary"
                      : "text-muted-foreground"
                    }`}
                >
                  {charCount}/120
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Escreva algo especial sobre esse momento..."
                  className="resize-none"
                  maxLength={120}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name={`memories.${index}.date`as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                Data da imagem (pode ser uma data aproximada)
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
