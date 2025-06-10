import { updatecustomerId } from "../../actions/couple"
import { updateSurpriseSend } from "../../actions/surpriseSend"
import { generatoClient } from "./generatoClient"

export default async function generatorPix(idUser: string, name: string, cpfCnpj: string, email: string, typeProduct: number, description: string): Promise<{ pixCustomersDataId?: string, error?: string }> {

    const { customerId, erro } = await generatoClient(name, cpfCnpj)

    if (erro) {
        return { error: "CPF inválido!", pixCustomersDataId: "" }
    }
    if (!customerId) {
        return { error: "Cliente inválido!", pixCustomersDataId: "" }
    }
    if (typeProduct === 1 || typeProduct === 2) {
        await updatecustomerId(idUser, customerId, email)
    }

    if (typeProduct === 5) {
        await updateSurpriseSend(idUser, customerId, email)
    }
    const res = await fetch('/api/create-pix', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            value: typeProduct === 1 ? 14.99 : typeProduct === 2 ? 34.99 : 19.99, // Certifique-se que o valor está correto (3499 representa R$ 34,99)
            customerid: customerId,
            description: description
        })
    })
    const pixCustomers = await res.json();
    return { pixCustomersDataId: pixCustomers.pixCustomersData.id }

}
