import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { FaTiktok } from "react-icons/fa";
import RotatingText from "../../../../components/RotatingText/RotatingText";
import logo from '../../../assets/logoLove.png'
import FallingText from "../../../../components/FallingText/FallingText";
import objectAnimated from '@/assets/home/EllipseTikLoveyuu.svg'
import { scrollToDiv } from "../../../../utils/scrollToDiv";
function isSafari() {
    if (typeof window === "undefined") return false; // Garante que está no browser
    return /^((?!Chrome|Chromium|Android).)*Safari/i.test(navigator.userAgent) && navigator.vendor.includes("Apple");
}

export default function Hero() {
    return (
        <>
            <div className='md:h-[33rem] relative    '>
                <div className="absolute md:-right-20 -right-48 z-[1] md:max-w-[650px] max-w-[350px] h-[300px] ">
                    <Image src={objectAnimated} alt="objectAnimated" className=" object-cover elementAnimated" />
                </div>
                <div className='max-w-[1100px] m-auto px-3  z-10 relative'>
                    <div>
                        <Image alt='logo' width={150} className='m-auto pb-10 py-2' src={logo} />
                    </div>
                    <section className="Presentation">
                        <div className='max-w-[800px] flex md:flex-row flex-col items-center justify-center mx-auto gap-4'>
                            <h1 className="text-redDefault md:text-6xl text-5xl font-black  md:text-left text-center">Surpreenda seu </h1>
                            <RotatingText
                                texts={['Amor!', 'Love!']}
                                mainClassName="px-2 sm:px-2 bg-[#9500ff] text-white md:max-w-auto font-semibold md:text-5xl text-5xl md:px-3  text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 bg-[#9500ff] sm:pb-1 md:pb-1"
                                transition={{ type: "", damping: 200, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </div>

                        {isSafari() ? <p className='mx-auto text-center py-10 md:text-xl text-xs md:max-w-[1100px] sm:max-w-[400px] text-white'>
                            Celebre cada momento do seu relacionamento com um contador dinâmico exclusivo! Preencha o formulário e receba um site personalizado com um QRCode especial para compartilhar com quem você ama. Agora, aproveite também a opção de criar um pedido especial!
                        </p>
                            :
                            <div className="text-white text-center ">
                                <FallingText text={`Celebre cada momento do seu relacionamento com um contador dinâmico exclusivo! Preencha o formulário e receba um site personalizado com um QRCode especial para compartilhar com quem você ama. Agora, aproveite também a opção de criar um pedido especial!`}
                                    highlightWords={["Celebre", "momento", "relacionamento", "exclusivo!", "experiência", "QRCode"]}
                                    // className='mx-auto py-10 md:text-xl text-xs md:max-w-[1100px] sm:max-w-[400px] text-white'
                                    trigger="click"
                                    backgroundColor="transparent"
                                    wireframes={false}
                                    gravity={0.56}
                                    fontSize="16px"
                                    mouseConstraintStiffness={0.9} />
                            </div>
                        }
                        <div className='flex md:flex-row flex-col justify-center items-center gap-4 mt-3 max-w-[600px] mx-auto'>
                            <Button className='shadow-[#4500E5] rounded-3xl shadow-lg bg-[#4500E5] hover:bg-[#6638C6] hover:shadow-[#6638C6] m-auto text-white max-w-[300px] w-full ' onClick={() => scrollToDiv("Prices")}>
                                Criar minha timeline infinita
                            </Button>
                          

                        </div>
                        <div className='DESTAQUES flex flex-col md:flex-row justify-center gap-4 md:my-20 my-14 items-center'>
                            <p className='text-white text-xl'>Em destaque no</p>
                            <div className='flex items-center gap-4'>
                                <a href="https://www.tiktok.com/@gabriela.rodrigue9315/video/7430304676643425542" className="">
                                    <FaTiktok className='hover:scale-110 duration-150 text-white text-6xl ' />
                                </a>

                            </div>
                            <div className='flex items-center md:flex-row flex-col gap-3'>
                                <CountUp prefix='+' start={0} end={2451644} duration={3} className='text-xl text-white font-bold' /> <span className='text-white text-xl'>Milhões de Pessoas já viram</span>
                            </div>
                        </div>

                    </section>

                </div>
            </div>
        </>
    )
}