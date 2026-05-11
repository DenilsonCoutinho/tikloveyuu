interface customerProps {
    customerId?: string;
    erro?: string;
}

export async function generatoClient(name: string, cpfCnpj: string): Promise<customerProps> {
    const response = await fetch('/api/create-client-pix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            cpfCnpj: cpfCnpj.replace(/[.-]/g, '')
        })
    });
    
    const customer = await response.json();
    console.log("AQUI "+customer.customersData.id)
    return { customerId: customer.customersData.id }
}