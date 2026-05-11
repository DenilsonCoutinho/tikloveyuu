// pages/api/payments-webhook.js
import { NextRequest, NextResponse } from "next/server";
import { deleteCoupleById, getBycustomerId } from "../../../../actions/couple";
import { deleteReqById, getByReqCustomerId } from "../../../../actions/requestSend";
import { deleteFolder, deleteFolderMom, deleteFolderReq, deleteFolderSurprise } from "@/lib/deleteimagesfirebase";
import { db as prisma } from '@/lib/db';
import { deleteMomById, getBycustomerIdMom } from "../../../../actions/mom";
import { deleteSurpriseById, getBycustomerIdSurprise } from "../../../../actions/surpriseSend";
import Decimal from 'decimal.js'

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
        if (paymentReceived.description === "1") {
          const res = await getBycustomerId(paymentReceived.customer)

          await transporter.sendMail({
            from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
            to: res?.email, // list of receivers
            subject: "Seu link e QR Code", // Subject line
            html: `<div style="font-family: Arial, sans-serif; color: #333;">
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
          const resReceived = await prisma.userCouple.findFirst({
            where: { idCostumerAsaas: paymentReceived.customer },
          })
          await prisma.userCouple.update({
            where: { idCouple: resReceived?.idCouple },
            data: { paid: "PAID" }
          })
          break;
        }
        if (paymentReceived.description === "2") {
          const res = await getByReqCustomerId(paymentReceived.customer)

          await transporter.sendMail({
            from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
            to: res?.email, // list of receivers
            subject: "Seu link e QR Code", // Subject line
            html: `<div style="font-family: Arial, sans-serif; color: #333;">
                                    <div style="background-color: #0E0813; padding: 20px; text-align: center;">
                                      <h1 style="color: #4500E5;">Obrigado por sua compra!</h1>
                                    </div>
                                    <div style="padding: 20px;">
                                      <p>Olá,</p>
                                      <p>Seu pedido foi processado com sucesso. Clique no botão abaixo para acessar o seu link e QR Code:</p>
                                      <div style="text-align: center; margin: 20px 0;">
                                        <a 
                                          href="https://www.tikloveyuu.com/copyLink?id=${res?.idRequestSend}"
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
          const resReceived = await prisma.requestSend.findFirst({
            where: { idCostumerAsaas: paymentReceived.customer },
          })
          await prisma.requestSend.update({
            where: { idRequestSend: resReceived?.idRequestSend },
            data: { paid: "PAID" }
          })
          break;
        }

        if (paymentReceived.description === "5") {
          const res = await getBycustomerIdSurprise(paymentReceived?.customer)

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
                                          href="https://www.tikloveyuu.com/createSurprise/qrCode?id=${res?.idSurprise}"
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
          const resReceived = await prisma.surpriseSend.findFirst({
            where: { idCostumerAsaas: paymentReceived.customer },
          })
          const productPrice = 19.99
          const valueInCents = Math.round(productPrice * 100) // 1999
          await prisma.surpriseSend.update({
            where: { idSurprise: resReceived?.idSurprise },
            data: { paid: "PAID", price: valueInCents }
          })
          break;
        }
       
        break;

      case 'PAYMENT_OVERDUE':
        const paymentOverdue = body.payment;
        if (paymentOverdue.description === "1") {

          const resOverdue = await prisma.userCouple.findFirst({
            where: { idCostumerAsaas: paymentOverdue.customer },
          })
          if (resOverdue) {
            await deleteFolder(resOverdue?.idCouple)
            await deleteCoupleById(resOverdue?.idCouple)
          }
          break;
        }

        if (paymentOverdue.description === "2") {

          const resOverdue = await prisma.requestSend.findFirst({
            where: { idCostumerAsaas: paymentOverdue.customer },
          })
          if (resOverdue) {
            await deleteFolderReq(resOverdue?.idRequestSend)
            await deleteReqById(resOverdue?.idRequestSend)
          }
          break;
        }

        if (paymentOverdue.description === "5") {

          const resOverdue = await prisma.surpriseSend.findFirst({
            where: { idCostumerAsaas: paymentOverdue.customer },
          })
          if (resOverdue) {
            await deleteFolderSurprise(resOverdue?.idSurprise)
            await deleteSurpriseById(resOverdue?.idSurprise)
          }
          break;
        }
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
    return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
  }
}

