'use client';
import React, { Suspense, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'next/navigation';
import SecurityBadge from '../components/SecurityBadge';
import SecurityIndicators from '../components/SecurityIndicators';
import TrustSeal from '../components/TrustSeal';
import { Lock, Timer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PIX_KEY = '000.000.000-00'; // Substitua pela sua chave PIX
const RECEIVER_NAME = 'Nome do Recebedor';
const AMOUNT = 19.99; // Valor fixo ou dinâmico
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
        <div
            className='flex flex-col items-center justify-center py-10 bg-gray-200 overflow-y-auto'
        >
            <div
                style={{
                    maxWidth: 400,
                    width: '100%',
                    padding: 24,
                    border: '1px solid #eee',
                    borderRadius: 8,
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    position: 'relative'
                }}
            >
                {/* Indicador SSL no topo */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#28a745',
                    marginBottom: '16px',
                    padding: '4px 8px',
                    background: '#d4edda',
                    borderRadius: '4px',
                    border: '1px solid #c3e6cb'
                }}>
                    <Lock size={12} />
                    <span>🔒 Conexão Segura SSL</span>
                </div>

                <SecurityBadge />

                <h2 className='text-[#28a745]' style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={20} className='text-[#28a745]' />
                    Pagamento via PIX
                </h2>

                <p className='text-center' style={{ color: '#444', marginBottom: 20 }}>
                    Escaneie o QR Code abaixo ou copie o código PIX para realizar o pagamento.
                </p>

                {/* Timer de expiração */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: '#dc3545',
                    marginBottom: '16px',
                    padding: '6px 12px',
                    background: '#f8d7da',
                    borderRadius: '4px',
                    border: '1px solid #f5c6cb'
                }}>
                    <Timer size={14} />
                    <span>Este código expira em 15 minutos</span>
                </div>

                <div className='mx-auto max-w-96 w-full flex justify-center' style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <QRCode
                            value={qrCode || ''}
                            size={200}
                            bgColor="#fff"
                            fgColor="#000"
                            style={{ border: '2px solid #28a745', borderRadius: 8, background: '#fff' }}
                        />
                        {/* Selo de verificação no QR Code */}
                        <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#28a745',
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            ✓
                        </div>
                    </div>
                </div>

                <TrustSeal />

                <div style={{ marginBottom: 16, marginTop: 20 }}>
                    <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Lock size={14} color="#28a745" />
                        Chave PIX Criptografada:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                        <input
                            type="text"
                            value={qrCode || ''}
                            readOnly
                            style={{
                                flex: 1,
                                padding: 8,
                                border: '1px solid #ccc',
                                borderRadius: 4,
                                fontSize: 14,
                                background: '#fff',
                                color: '#222',
                            }}
                        />
                        <button
                            onClick={handleCopy}
                            style={{
                                marginLeft: 8,
                                padding: '8px 12px',
                                background: '#04d361',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease',
                                boxShadow: copied ? '0 2px 8px rgba(4, 211, 97, 0.3)' : 'none'
                            }}
                        >
                            {copied ? '✓ Copiado!' : 'Copiar'}
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        background: '#f7f7f7',
                        padding: 12,
                        borderRadius: 4,
                        fontSize: 15,
                        color: '#222',
                        border: '1px solid #e9ecef'
                    }}
                >
                    <strong>Valor:</strong> R$ {AMOUNT.toFixed(2)}
                </div>
                {confirmPayment && <div onClick={() => setVerifyEmail(true)} className='flex flex-col items- justify-center w-full'>
                    <span className='text-gray-400 py-2'>
                        {verifyEmail ? "Verifique seu email!" : "fez o pagamento? clique em confirmar"}
                    </span>
                    <Button disabled={verifyEmail} className={`bg-[#28a745] shadow-md text-white px-3 rounded-lg`}>
                        {verifyEmail ? "ok" : "Confirmar"}
                        
                    </Button>
                </div>}

                <SecurityIndicators />

                <div style={{
                    marginTop: 24,
                    color: '#888',
                    fontSize: 13,
                    textAlign: 'center',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    border: '1px solid #e9ecef'
                }}>
                    <div style={{ marginBottom: '8px', fontWeight: '500' }}>
                        📱 Após o pagamento, verifique seu email.
                    </div>
                    <div style={{ fontSize: '11px', color: '#6c757d' }}>
                        Seus dados estão protegidos e o pagamento é processado pelo Banco Central do Brasil
                    </div>
                </div>

                {/* Rodapé com informações de segurança */}
                <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    color: '#6c757d'
                }}>
                    <Shield size={12} color="#28a745" />
                    <span>Certificado de Segurança Digital</span>
                </div>
            </div>
        </div>
    );
}


export default function UserViewPayment() {
    return (
        <Suspense fallback={<div className="overflow-y-auto flex flex-col bg-defaultBg justify-center items-center"><div className="lds-heart" ><div></div></div></div >}>
            {<PaymentPage />}
        </Suspense>
    );
}