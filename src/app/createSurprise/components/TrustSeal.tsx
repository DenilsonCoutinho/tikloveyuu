
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TrustSeal = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: 'linear-gradient(135deg, #28a745, #20c997)',
      color: 'white',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      marginTop: '12px',
      boxShadow: '0 2px 4px rgba(40, 167, 69, 0.2)'
    }}>
      <ShieldCheck size={14} />
      <span>PAGAMENTO VERIFICADO</span>
    </div>
  );
};

export default TrustSeal;