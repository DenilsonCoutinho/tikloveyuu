'use client';
import React, { Suspense, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'next/navigation';
import SecurityBadge from '@/app/createSurprise/components/SecurityBadge';
import SecurityIndicators from '@/app/createSurprise/components/SecurityIndicators';
import TrustSeal from '@/app/createSurprise/components/TrustSeal';
import { Lock, Timer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PIX_KEY = '000.000.000-00'; // Substitua pela sua chave PIX
const RECEIVER_NAME = 'Nome do Recebedor';
const AMOUNT = 10.99; // Valor fixo ou dinâmico
function PaymentPage() {
    const searchParams = useSearchParams();
    const [copied, setCopied] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [confirmPayment, setConfirmPayment] = useState(false);
    const qrCode = searchParams.get('qrCode');

    const handleCopy = () => {
        if (!qrCode) return alert("Código PIX não disponível");
        navigator.clipboard.writeText(qrCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        setTimeout(() => setConfirmPayment(true), 25000);
    }, [])

    return (
        <div className=' bg-gray-200 py-5 h-screen overflow-hidden'>
            <div className="flex flex-col items-center overflow-y-scroll h-[39rem] z-10">
                <div className="relative w-full max-w-[400px] p-6 border border-[#eee] rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-center gap-[6px] text-[11px] text-[#28a745] mb-4 px-2 py-1 bg-[#d4edda] rounded border border-[#c3e6cb]">
                        <Lock size={12} />
                        <span>🔒 Conexão Segura SSL</span>
                    </div>

                    <SecurityBadge />

                    <h2 className="flex items-center gap-2 text-[#28a745] mb-2">
                        <Shield size={20} className="text-[#28a745]" />
                        Pagamento via PIX
                    </h2>

                    <p className="text-center text-[#444] mb-5">
                        Escaneie o QR Code abaixo ou copie o código PIX para realizar o pagamento.
                    </p>

                    {/* Timer de expiração */}
                    <div className="flex items-center justify-center gap-[6px] text-[12px] text-[#dc3545] mb-4 px-3 py-1.5 bg-[#f8d7da] rounded border border-[#f5c6cb]">
                        <Timer size={14} />
                        <span>Este código expira em 15 minutos</span>
                    </div>

                    {/* QR Code */}
                    <div className="mx-auto max-w-96 w-full flex justify-center text-center">
                        <div className="relative">
                            <QRCode
                                value={qrCode || ''}
                                size={200}
                                bgColor="#fff"
                                fgColor="#000"
                                className="border-2 border-[#28a745] rounded-lg bg-white"
                            />
                            <div className="absolute -top-2 -right-2 bg-[#28a745] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                                ✓
                            </div>
                        </div>
                    </div>

                    <TrustSeal />

                    {/* Campo da chave PIX */}
                    <div className="mt-5 mb-4">
                        <label className="font-medium flex items-center gap-[6px]">
                            <Lock size={14} color="#28a745" />
                            Chave PIX Criptografada:
                        </label>
                        <div className="flex items-center mt-1">
                            <input
                                type="text"
                                value={qrCode || ''}
                                readOnly
                                className="flex-1 p-2 border border-gray-300 rounded text-sm bg-white text-[#222]"
                            />
                            <button
                                onClick={handleCopy}
                                className={`ml-2 px-3 py-2 bg-[#04d361] text-white rounded font-medium transition shadow-sm ${copied ? 'shadow-[0_2px_8px_rgba(4,211,97,0.3)]' : ''
                                    }`}
                            >
                                {copied ? '✓ Copiado!' : 'Copiar'}
                            </button>
                        </div>
                    </div>

                    {/* Valor */}
                    <div className="bg-[#f7f7f7] p-3 rounded text-[15px] text-[#222] border border-[#e9ecef]">
                        <strong>Valor:</strong> R$ {AMOUNT.toFixed(2)}
                    </div>

                    {/* Confirmação de pagamento */}
                    {confirmPayment && (
                        <div
                            onClick={() => setVerifyEmail(true)}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <span className="text-gray-400 py-2">
                                {verifyEmail
                                    ? 'Verifique seu email!'
                                    : 'fez o pagamento? clique em confirmar'}
                            </span>
                            <Button
                                disabled={verifyEmail}
                                className="bg-[#28a745] shadow-md text-white px-3 rounded-lg"
                            >
                                {verifyEmail ? 'ok' : 'Confirmar'}
                            </Button>
                        </div>
                    )}

                    <SecurityIndicators />

                    {/* Mensagem final */}
                    <div className="mt-6 text-[#888] text-sm text-center p-3 bg-[#f8f9fa] rounded border border-[#e9ecef]">
                        <div className="mb-2 font-medium">
                            📱 Após o pagamento, verifique seu email.
                        </div>
                        <div className="text-[11px] text-[#6c757d]">
                            Seus dados estão protegidos e o pagamento é processado pelo Banco
                            Central do Brasil
                        </div>
                    </div>

                    {/* Rodapé */}
                    <div className="mt-4 pt-4 border-t border-[#e9ecef] flex items-center justify-center gap-2 text-[11px] text-[#6c757d]">
                        <Shield size={12} color="#28a745" />
                        <span>Certificado de Segurança Digital</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function UserViewPayment() {
    return (
        <Suspense fallback={<div className=" flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<PaymentPage />}
        </Suspense>
    );
}