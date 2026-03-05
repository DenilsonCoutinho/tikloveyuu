import { updatecustomerId } from "../../actions/updateClientePix"
import { generatoClient } from "./generatorClient"

export default async function generatorPix(input: { id: string, name: string, cpfCnpj: string, email: string, description: string, price: number }): Promise<{ pixCustomersDataId?: string, error?: string }> {
    console.log(input)
    const { customerId, erro } = await generatoClient(input.name, input.cpfCnpj)
    if (!customerId) throw new Error("Erro ao gerar cliente code: #generatoClient!")
    await updatecustomerId({id:input.id, customerId,email:input.email})
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
            value: input.price, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
            customerid: customerId,
            description: input.description
        })
    })
    const pixCustomers = await res.json();
    return { pixCustomersDataId: pixCustomers.pixCustomersData.id }

}
