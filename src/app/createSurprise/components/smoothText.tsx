"use client"

import { Button } from "@/components/ui/button"
import { useCreateCard } from "@/lib/zustad/useCreateCard"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef, useState } from "react"

export default function SmoothText({ text }: { text: string | null | undefined }) {
    const { setStep, step } = useCreateCard()

    const containerRef = useRef<HTMLDivElement>(null)
    const [animationComplete, setAnimationComplete] = useState(true)
    useEffect(() => {
        document.fonts.ready.then(async () => {
            if (!containerRef.current) return

            // Show the container when fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(containerRef.current.querySelector("h1")!)

            // Animate the words in the h1
            await animate(
                words,
                { opacity: [0, 1], y: [20, 0] },
                {
                    type: "spring",
                    duration: 1.5,
                    bounce: 0,
                    delay: stagger(0.07),
                },
            )

            // Esta função executa APÓS a animação terminar
            setAnimationComplete(true)

            // Aguarda um pouco e mostra uma mensagem especial
            setTimeout(() => {
                setAnimationComplete(false)
            }, 1)

            // Você pode executar outras ações aqui:
            // - Tocar um som
            // - Mostrar botões de ação
            // - Fazer uma requisição
            // - Redirecionar para outra página
            // - Etc.
        })
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <p className="text-3xl select-none font-bold text-white">EU AVISEI💜</p>
            <h1 className="h1 select-none text-white">
               {text}
            </h1>
            {<Button onClick={() => setStep(3)} disabled={animationComplete} className="border text-white bg-transparent px-10 z-10">Próximo</Button>}
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>{`
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                gap: 20px;
                width: 100%;
                max-width: 1120px;
                text-align: left;
                visibility: hidden;
                padding: 20px;
            }

            .split-word {
                will-change: transform, opacity;
            }
        `}</style>
    )
}
