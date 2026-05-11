"use client"
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ButtonRandom({colorButton,shadowButton,hoverColorButton,hoverShadowButton,yesOrNo }:any) {
    useEffect(() => {

        
        const NoClick2Yes = document.querySelector('.NoClick2');

        // Função de mover o botão
        const moveButton = (button: HTMLElement) => {
            button.style.position = 'fixed';

            const randLeft = Math.random() * (window.innerWidth - button.offsetWidth);
            const randTop = Math.random() * (window.innerHeight - button.offsetHeight);

            button.style.left = `${randLeft}px`;
            button.style.top = `${randTop}px`;
        };

        // Verifica se o botão existe e adiciona os eventos
       

        if (NoClick2Yes) {
            const handleMoveYes = () => moveButton(NoClick2Yes as HTMLElement);
            NoClick2Yes.addEventListener('click', handleMoveYes);

            // Remove o listener ao desmontar o componente
            return () => NoClick2Yes.removeEventListener('click', handleMoveYes);
        }
    }, []);
    return (
        <>
            <Button className={`NoClick2 shadow-[${shadowButton}] shadow-lg bg-[${colorButton}] hover:bg-[${hoverColorButton}] hover:shadow-[${hoverShadowButton}] text-white w-[150px]  mt-3`}>
                {yesOrNo}
            </Button>
        </>
    )
}