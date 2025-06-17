"use client";
import ButtonLike from '../../../components/button-like';
import Particles from '../../../../../components/Particles/Particles';
import ContadorEternoHome from '../../../components/counterHome';
import FormPaymentInputs from '@/app/components/formPaymentInputs';
import { Dancing_Script } from 'next/font/google';
import iconImg from '../../../../assets/photo (1).png'
import comovaificar from '../../../../assets/como vai ficar 👇.png'
import Image from "next/image";
import MySwiper from "../../../components/mySwiper";
import ButtonUiUniverse from '../../../components/buttonUiUniverse';
import {
    DialogTrigger,
} from "@/components/ui/dialog"
import FormFields from './formFields';
import { useFormUserContext } from '../../../../../context/FormUserContext';
const alexBrush = Dancing_Script({
    subsets: ['latin'],
    weight: '700',

})


export default function FormCouple() {

    const {
        dataCouple,
        hour,
        imageCouple,
        nameCouple,
        message,
        setTypeProduct,
        youtubeLink, setYoutubeLink,
        previewURLs,
        submit,
        getYoutubeVideoId
    } = useFormUserContext();

    
    
    return (
        <div>
            <div className="flex md:flex-row flex-col px-3 max-w-[1100px] pb-10 m-auto justify- items-center md:gap-10 gap-5">
                <section className="w-full">
                    <div className='' id='my_form'>
                        <FormPaymentInputs setSelectedInput={(e) => { setTypeProduct(e); setYoutubeLink('') }} />
                        <FormFields />
                    </div>

                </section>
                <aside className='w-full md:w-72 flex gap-4 flex-col items-center'>
                    <Image width={180} quality={100} alt='comovaificar ' src={comovaificar} />
                    <div className="flex md:w-72 w-full flex-col ">
                        <div className="overflow-hidden mb-2 relative border border-redDefault shadow-md shadow-redDefault bg-[#180d21] rounded-xl max-h-[540px] myscroll overflow-y-auto ">
                            <Particles
                                className='absolute  z-10  h-screen w-full  '
                                particleColors={['#fff']}
                                particleCount={500}
                                particleSpread={15}
                                speed={0.08}
                                cameraDistance={52}
                                particleBaseSize={80}
                                alphaParticles={false}
                                disableRotation={false}
                            />

                            <h1 className={`${alexBrush.className} text-[#9500ff] pb-2  text-center font- text-4xl`}>{nameCouple}</h1>

                            <div className={`previewURLsPhoto   my-10 flex relative z-40 justify-center items-center mt-4 ${previewURLs.length > 0 ? "" : ""} h-80 rounded-md  w-full px- `}>
                                {
                                    previewURLs.length > 0 ?
                                        <div className='px-4 md:max-w-72'>
                                            <MySwiper previewURLs={previewURLs} />
                                        </div>
                                        :
                                        <Image alt="icon-imagem" src={iconImg} width={40} height={40} className='z-50' />
                                }
                            </div>
                            <ButtonLike />
                            {hour && <ContadorEternoHome initialDate={dataCouple} initialHour={hour} />}
                            <div className="border-b relative z-40 border-white opacity-15 mb-3 px-3 max-w-64 w-full  mx-auto "></div>

                            {message && <p className='px-2 relative z-40 text-white text-center mt-3 text-xs text-wrap max-w-72 w-full leading-8  mx-auto'>{message}</p>}
                            {youtubeLink && getYoutubeVideoId(youtubeLink) && (
                                <iframe
                                    width="100%"
                                    height="176"
                                    className="m-auto rounded-2xl z-50 mt-4"
                                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(youtubeLink)}?autoplay=1&mute=1`}
                                    title="YouTube video player"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            )}
                        </div>
                        {
                            !nameCouple || !dataCouple || !hour || imageCouple.length < 1 ?
                                <button disabled={true} className='border  bg-transparent duration-200  flex flex-col justify-center items-center rounded-md mt-3 py-2'>
                                    <p className=" flex gap-2 items-center justify-center font-bold  rounded-lg text-xl   text-white ">Criar meu Contador</p>
                                    <p className=" flex gap-2 items-center justify-center font-medium  rounded-lg text-xs   text-white ">Preencha os campos necessários</p>
                                </button>
                                :
                                <DialogTrigger className='mt-3 ' asChild>
                                    <ButtonUiUniverse text=' Criar meu Contador' onClick={() => {
                                        submit()
                                    }} />

                                </DialogTrigger>
                        }
                    </div>
                </aside>
            </div >
        </div>
    );
}