import Image from 'next/image'
import qrCode from '../../assets/qrCodeSite.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { scrollToDiv } from '../../../utils/scrollToDiv'
export default function QrCodeSite() {
    return (
        <div className='px-3'>
            <div className="max-w-[1100px] m-auto border border-white rounded-md p-6 mt-10  mb-20">
                <div className='flex md:flex-row flex-col items-center gap-3'>
                    <Image src={qrCode} quality={100} className='rounded-lg  shadow-custom-light' width={180} alt='qrCode' />
                    <h1 className='text-white md:text-left text-center md:text-3xl text-xl font-bold max-w-[500px]'>Vamos fazer um presente surpresa para o seu amor?</h1>
                    <div className='flex flex-col gap-3'>
                        <Button onClick={() => scrollToDiv("my_form")} className='shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6]  text-white max-w-[300px] w-full px-2 '>
                            Criar meu contador dinâmico
                        </Button>
                        <p className='text-white text-center'>OU</p>
                        <Link className=' max-w-[300px] w-full m-auto' href={"/sendRequest"}>
                            <div></div>
                            <Button className='relative shadow-[#4500E5] shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] text-white max-w-[300px] w-full m-auto  px-2'>
                                <span className="absolute top-[-13px] right-[-10px] bg-[#ff8000] text-xs font-bold text-white px-2 py-1 rounded-full">
                                    Destaque
                                </span>
                                Enviar um pedido especial
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}