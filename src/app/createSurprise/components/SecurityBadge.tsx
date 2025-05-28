import React from 'react';
import { Shield, Lock, Check } from 'lucide-react';

const SecurityBadge = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '12px',
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '6px',
      marginBottom: '16px'
    }}>
      <Shield size={20} color="#28a745" />
      <div style={{ fontSize: '13px', color: '#495057' }}>
        <strong>Pagamento Seguro</strong> - Dados protegidos por criptografia SSL
      </div>
    </div>
  );
};

export default SecurityBadge;