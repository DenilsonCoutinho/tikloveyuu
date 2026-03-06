// pages/api/payments-webhook.js
import { deleteImages } from "../../../../actions/deleteImg";
import { moveImgObject } from "../../../../actions/moveImgObject";
import { prisma } from "../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer"


export async function POST(req: NextRequest) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "denidesenvolvimentos@gmail.com",
      pass: process.env.PASSWORDNODEMAILER as string
    },
    port: 587,
  });

  try {
    const body = await req.json();
    if (body.payment.description === "politeia" || body.payment.description === "contadoreterno") return NextResponse.json({ received: false }, { status: 200 });


    switch (body.event) {

      case 'PAYMENT_RECEIVED':
        const paymentReceived = body.payment;

        const dataTikLoveyu = await prisma.userMemories.findFirst({
          where: {
            idCostumerAsaas: paymentReceived.customer as string
          },

          select: {
            memories: true,
            email: true,
            idCostumerAsaas: true,
            userId: true,
            paid: true,
            id: true
          }
        })
        if (!dataTikLoveyu) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
        await transporter.sendMail({
          from: 'deni-desenvolvimentos <denidesenvolvimentos@gmail.com>', // sender address
          to: dataTikLoveyu?.email as string, // list of receivers
          subject: "Seu link e QR Code", // Subject line
          html: `<div style="font-family: Arial, sans-serif; color: #fff; max-width: 520px; margin: 0 auto;">

              <div style="background-color: #0f1729; padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
                <div style="width: 52px; height: 52px; background-color: #ebbc46; border-radius: 12px; margin: 0 auto 16px; line-height: 52px; font-size: 26px; font-weight: 800; color: #0f1729;">E</div>
                <h1 style="color: #ebbc46; margin: 0 0 6px; font-size: 22px; font-weight: 700;">Pagamento Confirmado!</h1>
              
              </div>

              <div style="background-color: #0f1729; padding: 0 24px;">
                <div style="height: 1px; background-color: rgba(235,188,70,0.2);"></div>
              </div>

              <div style="background-color: #0f1729; padding: 24px;">
              
                <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
                  Seu pagamento via cartao foi <strong style="color: #ebbc46;">aprovado com sucesso</strong>. Seu produto ja esta disponivel!
                </p>

                <div style="background-color: rgba(235,188,70,0.08); border: 1px solid rgba(235,188,70,0.2); border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 20px;">
                  <div style="width: 56px; height: 56px; background-color: rgba(235,188,70,0.15); border-radius: 50%; margin: 0 auto 12px; line-height: 56px;">
                    <span style="font-size: 28px; color: #ebbc46;">&#10003;</span>
                  </div>
                  <p style="margin: 0 0 4px; font-size: 16px; font-weight: 700; color: #fff;">Pagamento Aprovado</p>
                  <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.5);">Cartao de credito/debito</p>
                </div>


                <div style="text-align: center; margin-bottom: 24px;">
                  <p style="margin: 0 0 10px; font-size: 13px; color: rgba(255,255,255,0.5);">Clique no botao abaixo para acessar seu produto:</p>
                  <a
                    href="${process.env.NEXT_PUBLIC_URL}/memorie/${dataTikLoveyu?.id}"
                    style="
                      background-color: #ebbc46;
                      color: #0f1729;
                      padding: 14px 40px;
                      text-decoration: none;
                      border-radius: 8px;
                      font-size: 15px;
                      font-weight: 700;
                      display: inline-block;
                    "
                  >
                    Acessar meu Produto
                  </a>
                </div>

                <div style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(235,188,70,0.1); border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;">
                  <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.6;">
                    Voce tambem pode acessar seu produto a qualquer momento pelo link:<br>
                    <a href="${process.env.NEXT_PUBLIC_URL}/memorie/${dataTikLoveyu?.id}" style="color: #ebbc46; text-decoration: none; word-break: break-all; font-size: 11px;">${process.env.NEXT_PUBLIC_URL}/memorie/${dataTikLoveyu?.id}</a>
                  </p>
                </div>

                <p style="margin: 0 0 4px; font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6;">
                  Caso tenha algum problema, entre em contato conosco em
                  <a href="mailto:denidesenvolvimentos@gmail.com" style="color: #ebbc46; text-decoration: none;">denidesenvolvimentos@gmail.com</a>.
                </p>
                <p style="margin: 16px 0 0; font-size: 13px; color: rgba(255,255,255,0.5);">Atenciosamente,<br><strong style="color: #fff;">Deni Desenvolvimentos</strong></p>
              </div>

              <div style="background-color: #0f1729; padding: 0 24px;">
                <div style="height: 1px; background-color: rgba(235,188,70,0.15);"></div>
              </div>

              <div style="background-color: #0f1729; padding: 20px 24px; text-align: center; border-radius: 0 0 12px 12px;">
                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.25); line-height: 1.5;">Este e-mail foi enviado automaticamente, por favor, nao responda.</p>
              </div>

            </div>`
        })

        await prisma.userMemories.update({
          where: { id: dataTikLoveyu?.id },
          data: { paid: "PAID" }
        })


        break;

      case 'PAYMENT_OVERDUE':
        const paymentOverdue = body.payment;

        const resOverdue = await prisma.userMemories.findFirst({
          where: { idCostumerAsaas: paymentOverdue.customer },
          select: {
              memories: true,
              email: true,
              idCostumerAsaas: true,
              userId: true,
              paid: true,
              id: true
            }
        })
        if (resOverdue) {
          await prisma.userMemories.delete({
            where: { userId: resOverdue?.userId },
            
          })

          const imagesToMove = resOverdue.memories.map((m) => (m.imageUrl));
          await deleteImages(imagesToMove)
          // await moveImgObject(imagesToMove)
          break;
        }

        break;
      default:
        console.log(`Este evento não é aceito: ${body.event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
  }
}

