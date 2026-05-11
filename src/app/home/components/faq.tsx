import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion"
export default function Faq() {

    const items = [
        { value: "a", title: "O que é a Tikloveyuu?", text: "Tikloveyuu é uma plataforma que permite criar páginas personalizadas de relacionamento para casais ou enviar pedidos especiais. Você pode adicionar fotos, uma mensagem especial e um contador que mostra há quanto tempo vocês estão juntos." },
        { value: "b", title: "Como recebo minha página personalizada ou meu pedido especial após o pagamento?", text: "Após a conclusão do pagamento, você receberá um QR code caso o produto for o contado dinâmico para compartilhar com seu parceiro(a) e um link via e-mail para acessar a página. Se for o pedido especial, você apenas receberá um link no email." },
        { value: "c", title: "Quais são as formas de pagamento?", text: "No momento, aceitamos pagamentos por Pix e cartão de crédito." },
        { value: "d", title: "Quanto tempo demora para receber o QR Code no e-mail?", text: "Pagamentos com cartão de crédito e Pix ficam prontos na hora." },
        { value: "e", title: "Como posso entrar em contato com o suporte ao cliente?", text: "Você pode entrar em contato com nosso suporte ao cliente através do e-mail denidesenvolvimentos@gmail.com" },
    ]
    return (
        <div className="max-w-[1100px] m-auto py-16 px-3">
            <h1 className="text-white font-bold text-3xl text-center py-4">Perguntas Frequentes

            </h1>
            <AccordionRoot collapsible >

                {items.map((item, index) => (
                    <AccordionItem key={index} value={item.value} className="border-b">
                        <AccordionItemTrigger className="text-white py-4 font-semibold">{item.title}</AccordionItemTrigger>
                        <AccordionItemContent className="text-white text-md">{item.text}</AccordionItemContent>
                    </AccordionItem>
                ))}
            </AccordionRoot>

        </div>
    )
}