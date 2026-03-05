
import { generatoClient } from "./generatoClient"

export default async function generatorPix(idUser: string, name: string, cpfCnpj: string, email: string, typeProduct: number, description: string, price: number): Promise<{ pixCustomersDataId?: string, error?: string }> {
    const { customerId, erro } = await generatoClient(name, cpfCnpj)

    if (erro) {
        return { error: "CPF inválido!", pixCustomersDataId: "" }
    }
    if (!customerId) {
        return { error: "Cliente inválido!", pixCustomersDataId: "" }
    }
    
    const res = await fetch('/api/create-pix', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            value: price, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
            customerid: customerId,
            description: description
        })
    })
    const pixCustomers = await res.json();
    return { pixCustomersDataId: pixCustomers.pixCustomersData.id }

}
