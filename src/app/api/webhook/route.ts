import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { deleteCoupleById, getCoupleById, getCoupleByUniqueId, updateEmailCouple } from "../../../../actions/couple";
import { deleteFolder, deleteFolderReq } from "@/lib/deleteimagesfirebase";
import { headers } from "next/headers";
const nodemailer = require("nodemailer");

import stripe from '@/lib/stripe';
import { db as prisma } from "@/lib/db";
import { deleteReqById } from "../../../../actions/requestSend";
const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "denidesenvolvimentos@gmail.com",
      pass: process.env.PASSWORDNODEMAILER as string
    },
    port: 587,
  });

  let event;

  try {
    const body = await req.text(); // Obtenha o corpo da requisição
    const sig = headers().get("stripe-signature");
    if (!sig || !secret) {
      throw new Error("Missing secret or signature");
    }
    const event = stripe.webhooks.constructEvent(body, sig, secret);

    if (event.data.object)

      switch (event.type) {

        case 'checkout.session.completed':
          const checkout_session_completed = event.data.object; // Acesse os detalhes da sessão
          if (event.data.object.payment_status === "paid") {
            if (checkout_session_completed.customer_details?.email && checkout_session_completed?.metadata) {
              let idCouple = checkout_session_completed.metadata.idUser
              if (checkout_session_completed.metadata.type === "1") {
                await transporter.sendMail({
                  from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
                  to: checkout_session_completed.customer_details?.email, // list of receivers
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
                                  href="https://www.tikloveyuu.com/qrCode?id=${checkout_session_completed.metadata.idUser}"
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
                await prisma.user.update({
                  where: { idCouple },
                  data: {
                    email: checkout_session_completed.customer_details?.email,
                  }
                })
                break
              }
              await transporter.sendMail({
                from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
                to: checkout_session_completed.customer_details?.email, // list of receivers
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
                                    href="https://www.tikloveyuu.com/yesOrNo?id=${checkout_session_completed.metadata.idUser}"
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
              await prisma.requestSend.update({
                where: { idRequestSend: idCouple },
                data: {
                  email: checkout_session_completed.customer_details?.email,
                }
              })
            }
          }

          break
        case 'checkout.session.expired':
          const sessionExpired = event.data.object; // Acesse os detalhes da sessão

          if (sessionExpired.metadata && sessionExpired.metadata.type === "1") {

            await deleteFolder(sessionExpired.metadata.idUser)
            await deleteCoupleById(sessionExpired.metadata.idUser)

            break;
          }

          if (sessionExpired && sessionExpired.metadata) {

            await deleteFolderReq(sessionExpired.metadata.idUser)
            await deleteReqById(sessionExpired.metadata.idUser)

            break;
          }

        // Adicione mais casos para outros eventos conforme necessário
        default:
          const sessionCon = event.data.object; // Acesse os detal

      }
    return NextResponse.json({ result: event, ok: true });

  } catch (err) {
    console.error(`Webhook Error: ${err}`);
    // return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }
  // Lidar com o evento

  return NextResponse.json({ received: true });
}