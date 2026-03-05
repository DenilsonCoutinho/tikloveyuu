"use client"

import { useFormContext } from "react-hook-form"
import { Lock } from "lucide-react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { MemoriesFormValues } from "@/lib/schema"

export function PasswordSection() {
  const form = useFormContext<MemoriesFormValues>()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <Separator className="bg-border/70" />
        <div className="flex items-center flex-col gap-2 text-muted-foreground">
          <Lock className="size-4" />
          <span className="text-sm font-medium">
            Proteja com uma data especial (opcional)
          </span>
        </div>
        <p className="text-center text-xs text-muted-foreground/80">
          Se quiser, adicione uma data que somente vocês dois sabem(ou deviam saber).
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                Data
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-white text-white bg-transparent"
                  type="month"
                  placeholder="Mínimo 4 caracteres"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-2xl text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-xs uppercase tracking-wide">
                Confirmar data
              </FormLabel>
              <FormControl>
                <Input
                  type="month"
                  className="border border-white text-white bg-transparent"
                  placeholder="Repita a senha"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
