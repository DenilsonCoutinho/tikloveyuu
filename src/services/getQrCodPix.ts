export async function getQrCodPix(paymentId: string): Promise<{ encodedImage: string, qrCode: string }> {
    try {
        const res = await fetch('/api/get-pix-client', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                paymentId
            })
        })
        const getPixCustomers = await res.json();
        console.log("aqui",getPixCustomers)
        return { encodedImage: getPixCustomers.pixCustomersData.encodedImage, qrCode: getPixCustomers.pixCustomersData.payload }

    } catch (error) {
        return { encodedImage: "", qrCode: "" }

    }


}