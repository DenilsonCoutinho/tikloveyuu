// pages/api/payments-webhook.js
import { NextRequest, NextResponse } from "next/server";
import { deleteCoupleById, getBycustomerId } from "../../../../actions/couple";
import { deleteFolder } from "@/lib/deleteimagesfirebase";
import { db as prisma } from '@/lib/db';

const nodemailer = require("nodemailer");

export async function POST(req: NextRequest, res: NextResponse) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "denidesenvolvimentos@gmail.com",
            pass: process.env.PASSWORDNODEMAILER as string
        },
        port: 587,
    });

    try {
        // res.headers.set('ngrok-skip-browser-warning', 'true');
        // res.headers.set('User-Agent', 'CustomUserAgent/1.0');
        const body = await req.json();

        switch (body.event) {
            case 'PAYMENT_CREATED':
                const paymentCreated = body.payment;
                console.log(paymentCreated)
                console.log(body)

                break;
            case 'PAYMENT_RECEIVED':
                const paymentReceived = body.payment;
                console.log("PAYMENT_RECEIVED")
                console.log(paymentReceived)
                const res = await getBycustomerId(paymentReceived.customer)
                await transporter.sendMail({
                    from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
                    to: res?.email, // list of receivers
                    subject: "Seu link e QR Code", // Subject line
                    html: `
                                <div style="font-family: Arial, sans-serif; color: #333;">
                                  <div style="background-color: #0E0813; padding: 20px; text-align: center;">
                                    <h1 style="color: #A61111;">Obrigado por sua compra!</h1>
                                  </div>
                                  <div style="padding: 20px;">
                                    <p>Olá,</p>
                                    <p>Seu pedido foi processado com sucesso. Clique no botão abaixo para acessar o seu link e QR Code:</p>
                                    <div style="text-align: center; margin: 20px 0;">
                                      <a 
                                        href="https://www.tikloveyuu.com/qrCode?id=${res?.idCouple}"
                                        style="
                                          background-color: #A61111;
                                          color: white;
                                          padding: 15px 30px;
                                          text-decoration: none;
                                          border-radius: 5px;
                                          font-size: 16px;
                                        ">
                                        Acessar seu Link
                                      </a>
                                    </div>
                                    <p style="margin-top: 20px;">Caso tenha algum problema, entre em contato conosco em <a href="mailto:denidesenvolvimentos@gmail.com" style="color: #A61111;">denidesenvolvimentos@gmail.com</a>.</p>
                                    <p>Atenciosamente,<br>deni-desenvolvimentos</p>
                                  </div>
                                  <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #777; font-size: 12px;">
                                    <p>Este é um e-mail automático, por favor, não responda.</p>
                                  </div>
                                </div>
                              `,
                });
                const resReceived = await prisma.user.findFirst({
                    where: { idCostumerAsaas: paymentReceived.customer },
                })
                await prisma.user.update({
                    where: { idCouple:resReceived?.idCouple },
                    data:{paid:"PAID"}
                })
                break;
            case 'PAYMENT_OVERDUE':
                const paymentOverdue = body.payment;
                console.log("PAYMENT_OVERDUE", paymentOverdue)
                const resOverdue = await prisma.user.findFirst({
                    where: { idCostumerAsaas: paymentOverdue.customer },
                })
                console.log(resOverdue)
                if (resOverdue) {
                    await deleteFolder(resOverdue?.idCouple)
                    await deleteCoupleById(resOverdue?.idCouple)
                }
                break;
            // ... trate outros eventos
            default:
                console.log(`Este evento não é aceito: ${body.event}`);
        }

        // Retorne uma resposta para dizer que o webhook foi recebido
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (err) {
        // Responda com um erro se o método não for POST
        return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
    }
}

