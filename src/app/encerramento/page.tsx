"use client"

import { Heart, HeartCrack } from "lucide-react"

export default function EncerramentoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="flex justify-center gap-4">
          <HeartCrack className="w-16 h-16 text-rose-400 opacity-60" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Projeto Encerrado
          </h1>
          
          <p className="text-slate-300 text-lg leading-relaxed">
            Infelizmente, o <span className="text-rose-400 font-semibold">tikloveyuu</span> foi descontinuado e não está mais disponível.
          </p>
          
          <p className="text-slate-400 text-base">
            Agradecemos a todos que fizeram parte dessa jornada conosco.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-700">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Obrigado por todo o carinho</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
