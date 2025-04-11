"use client"
import { Button } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import QRCode from 'react-qr-code';
function QrcodeComponet() {
    useEffect(() => {
        localStorage.removeItem('idUserMyLoverTik');
    }, [])
    const searchParams = useSearchParams();
    const code = searchParams.get("id");
    const captureScreen = async () => {
        const element = document.getElementById('capture');
        if (element) {
            try {
                const canvas = await html2canvas(element, { useCORS: true });
                const imageData = canvas.toDataURL('image/png');

                // Corrigindo o formato e criando o link para download
                const link = document.createElement('a');
                link.href = imageData;
                link.download = 'captured-image.png'; // Nome do arquivo
                document.body.appendChild(link); // Anexa o link ao DOM
                link.click(); // Clica no link para iniciar o download
                document.body.removeChild(link); // Remove o link do DOM
            } catch (error) {
                console.error('Erro ao capturar a tela:', error);
            }
        } else {
            console.error('Elemento não encontrado!');
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Texto copiado para a área de transferência!');
        } catch (err) {
            console.error('Falha ao copiar: ', err);
        }
    };
    return (
        <div className={` min-h-screen overflow-auto bg-defaultBg bg-contain py-10 flex justify-center items-center`}>
            
            <div className='flex flex-col items-center gap-4'>
                <div id="capture" style={{ width: "295px", height: "295px", padding: '20px', backgroundColor: '#f5f5f5' }}>
                    <QRCode value={`https://www.tikloveyuu.com/userView?id=${code}`} />
                </div>
                <div className='flex  md:flex-row flex-col items-center gap-3'>
                    <Button className='text-black px-2 bg-white' onClick={() => captureScreen()}>Baixar QRcode</Button>
                    <Button className='text-black px-2 bg-white' onClick={() => copyToClipboard(`https://www.tikloveyuu.com/userView?id=${code}`)}>Copiar Link</Button>
                    <a href={`https://www.tikloveyuu.com/userView?id=${code}`}>
                        <Button className='text-black px-2 bg-white' >Ver meu site</Button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default function qrCode() {
    return( <Suspense fallback={<div className="h-screen flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
        <QrcodeComponet />
    </Suspense>)
   
}