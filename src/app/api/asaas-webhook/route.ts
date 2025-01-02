// pages/api/payments-webhook.js
import { NextRequest, NextResponse } from "next/server";
import { deleteCoupleById, getBycustomerId } from "../../../../actions/couple";
import { deleteReqById, getByReqCustomerId } from "../../../../actions/requestSend";
import { deleteFolder, deleteFolderReq } from "@/lib/deleteimagesfirebase";
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
  //  await res.headers.set('ngrok-skip-browser-warning', 'true');
    // res.headers.set('User-Agent', 'CustomUserAgent/1.0');
    const body = await req.json();
    if (body.payment.description === "politeia") return NextResponse.json({ received: false }, { status: 200 });


    switch (body.event) {

      case 'PAYMENT_RECEIVED':
        const paymentReceived = body.payment;
        console.log("PAYMENT_RECEIVED")
        console.log(paymentReceived)
        if (paymentReceived.description === "1") {
          const res = await getBycustomerId(paymentReceived.customer)
          console.log("EMAIL: ", res?.email)
          console.log("datas: ", res)

          await transporter.sendMail({
            from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
            to: res?.email, // list of receivers
            subject: "Seu link e QR Code", // Subject line
            html: `
                                  <div style="font-family: Arial, sans-serif; color: #333;">
                                    <div style="background-color: #0E0813; padding: 20px; text-align: center;">
                                      <h1 style="color: #4500E5;">Obrigado por sua compra!</h1>
                                    </div>
                                    <div style="padding: 20px;">
                                      <p>Olá,</p>
                                      <p>Seu pedido foi processado com sucesso. Clique no botão abaixo para acessar o seu link e QR Code:</p>
                                      <div style="text-align: center; margin: 20px 0;">
                                        <a 
                                          href="https://www.tikloveyuu.com/qrCode?id=${res?.idCouple}"
                                          style="
                                            background-color: #4500E5;
                                            color: white;
                                            padding: 15px 30px;
                                            text-decoration: none;
                                            border-radius: 5px;
                                            font-size: 16px;
                                          ">
                                          Acessar seu Link
                                        </a>
                                      </div>
                                      <p style="margin-top: 20px;">Caso tenha algum problema, entre em contato conosco em <a href="mailto:denidesenvolvimentos@gmail.com" style="color: #6638C6;">denidesenvolvimentos@gmail.com</a>.</p>
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
            where: { idCouple: resReceived?.idCouple },
            data: { paid: "PAID" }
          })
          break;
        }

        const res = await getByReqCustomerId(paymentReceived.customer)
        console.log(res?.email)
        await transporter.sendMail({
          from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
          to: res?.email, // list of receivers
          subject: "Seu link para enviar para sua pessoa!", // Subject line
          html: `
                              <div style="font-family: Arial, sans-serif; color: #333;">
                                <div style="background-color: #0E0813; padding: 20px; text-align: center;">
                                  <h1 style="color: #4500E5;">Obrigado por sua compra!</h1>
                                </div>
                                <div style="padding: 20px;">
                                  <p>Olá,</p>
                                  <p>Seu pedido foi processado com sucesso. Clique no botão abaixo para acessar o seu link para enviar para sua pessoa!:</p>
                                  <div style="text-align: center; margin: 20px 0;">
                                    <a 
                                      href="https://www.tikloveyuu.com/yesOrNo?id=${res?.idRequestSend}"
                                      style="
                                        background-color: #6638C6;
                                        color: white;
                                        padding: 15px 30px;
                                        text-decoration: none;
                                        border-radius: 5px;
                                        font-size: 16px;
                                      ">
                                      Acessar seu Link
                                    </a>
                                  </div>
                                  <p style="margin-top: 20px;">Caso tenha algum problema, entre em contato conosco em <a href="mailto:denidesenvolvimentos@gmail.com" style="color: #6638C6;">denidesenvolvimentos@gmail.com</a>.</p>
                                  <p>Atenciosamente,<br>deni-desenvolvimentos</p>
                                </div>
                                <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #777; font-size: 12px;">
                                  <p>Este é um e-mail automático, por favor, não responda.</p>
                                </div>
                              </div>
                            `,
        });
        const resReceived = await prisma.requestSend.findFirst({
          where: { idCostumerAsaas: paymentReceived.customer },
        })
        await prisma.requestSend.update({
          where: { idRequestSend: resReceived?.idRequestSend },
          data: { paid: "PAID" }
        })
        break;

      case 'PAYMENT_OVERDUE':
        const paymentOverdue = body.payment;
        console.log("TESTE: ", paymentOverdue)
        if (paymentOverdue.description === "1") {

          const resOverdue = await prisma.user.findFirst({
            where: { idCostumerAsaas: paymentOverdue.customer },
          })
          if (resOverdue) {
            await deleteFolder(resOverdue?.idCouple)
            await deleteCoupleById(resOverdue?.idCouple)
          }
          break;
        }

        // const paymentOverdueReq = body.payment;
        const resOverdueReq = await prisma.requestSend.findFirst({
          where: { idCostumerAsaas: paymentOverdue.customer },
        })
        if (resOverdueReq) {
          await deleteFolderReq(resOverdueReq?.idRequestSend)
          await deleteReqById(resOverdueReq?.idRequestSend)
        }
        break;
      default:
        console.log(`Este evento não é aceito: ${body.event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
  }
}

