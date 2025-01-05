"use server"
import { v4 as uuidv4 } from 'uuid';
import { db as prisma } from "../../src/lib/db";
export default async function Affiliate(email: string, name: string, percentage: number, pixKey: string) {

    const uuid = uuidv4(); // Exemplo de UUID: '550e8400-e29b-41d4-a716-446655440000'
    const shortCode = uuid.replace(/-/g, '').substring(0, 8); // Pega os 8 primeiros caracteres sem os hifens
     // Retorna o código em maiúsculas


    const createRef = await prisma.affiliate.create({
        data: {
            code: shortCode.toUpperCase(),
            email: email,
            name: name,
            percentage: percentage,
            keyPix: pixKey
        }
    })
    return createRef
}


export async function connectAffiliate(affiliateId:string,idUser:string ){
    await prisma.affiliate.update({
        where: { code: affiliateId },
        data: {
          users: {
            connect: { idCouple: idUser },
          },
        },
      });
}



export async function getAffiliateWithUsers(affiliateCode: string) {
    try {
      const affiliate = await prisma.affiliate.findUnique({
        where: { code: affiliateCode }, // Encontrando o afiliado pelo 'code'
        include: {
          users: true, // Incluindo todos os usuários associados ao afiliado
        },
      });
  
      if (!affiliate) {
        throw new Error('Afiliado não encontrado');
      }
  
      return affiliate;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar afiliado com usuários');
    }
  }