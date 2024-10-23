import fields from '../../assets/howWork/fields.svg'
import emailCouple from '../../assets/howWork/email-phone 1.svg'
import couple from '../../assets/howWork/couple.svg'
import payment from '../../assets/howWork/payment.svg'
import Image from 'next/image'
export default function HowItWorks(){
    return(
        <>
          <div className='mb-20 md:mt-20 flex md:flex-row flex-col max-w-[1100px] justify-between m-auto items-center md:items-start'>
                    <h1 className='text-white text-center md:text-5xl text-3xl mb-5 font-bold'>Como  <span className='text-redDefault'>funciona</span></h1>
                    <div className='grid md:grid-cols-2 m-auto gap-10 '>
                        <div className='h-80 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>1 - Preencha os dados</h1>
                            <Image className='m-auto translate-y-10' quality={100} height={250} width={250} alt='fields' src={fields} />
                        </div>
                        <div className='h-80 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>2 - Faça o pagamento</h1>
                            <Image className='m-auto  p-5 translate-y-10' quality={100} height={250} width={250} alt='payment' src={payment} />
                        </div>
                        <div className='h-96 border-gray-800 border max-w-72 flex flex-col justify-center items-center bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>3 - Receba seu QR Code no <br/>e-mail</h1>
                            <Image className='m-auto  p-5 translate-y-14' quality={100} height={250} width={250} alt='email' src={emailCouple} />
                        </div>
                        <div className='h-96 border-gray-800 border max-w-72 flex flex-col items-end bg-gradient-to-b from-[#0E0813] to-redDefault  rounded-md overflow-hidden'>
                            <h1 className='text-white p-5  text-center  font-bold'>4 - Surpreenda seu amor</h1>
                            <Image className='m-auto  p-5 translate-y-' quality={100} height={250} width={250} alt='couple' src={couple} />
                        </div>
                    </div>
                </div>
        </>
    )
}