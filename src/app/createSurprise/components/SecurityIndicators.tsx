import React from 'react';
import { Lock, ShieldCheck, Check } from 'lucide-react';

const SecurityIndicators = () => {
  const indicators = [
    {
      icon: <Lock size={16} color="#28a745" />,
      text: "Conexão SSL Segura"
    },
    {
      icon: <ShieldCheck size={16} color="#28a745" />,
      text: "Dados Criptografados"
    },
    {
      icon: <Check size={16} color="#28a745" />,
      text: "PIX Banco Central"
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: '6px',
      marginTop: '16px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ 
        fontSize: '14px', 
        fontWeight: '600', 
        color: '#495057',
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        🔒 Ambiente Seguro
      </div>
      {indicators.map((indicator, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          color: '#6c757d'
        }}>
          {indicator.icon}
          <span>{indicator.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SecurityIndicators;