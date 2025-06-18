import Image from "next/image";
import logo from "../../../assets/logoLove.png"
import { FaEnvelope, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-defaultBg border-white border-t  py-10">
            <div className=" px-3 m-auto flex md:flex-row  max-w-[1100px]  md:items-start items-start justify-between   flex-col md:gap- gap-10">
                <div className="flex flex-col  pl-1">
                    <Image alt="logo" src={logo} quality={100} width={110} className="" />
                    <p className="text-xs text-slate-100 font-medium leading-5">Surpreenda o seu amor criando seu<br /> contador de tempo de relacionamento ou com um pedido</p>
                    <p className="text-xs text-slate-300 font-mono ">Copyright © 2024 - Todos os direitos reservados</p>
                    <div className="flex flex-row items-center text-white gap-3 mt-2">
                        <p className="text-sm">siga-nos</p>
                        <a href="https://www.tiktok.com/@tikloveyuu" className="">
                            <FaTiktok />
                        </a>
                        <a href="https://www.youtube.com/@tikloveyuu/shorts">
                            <FaYoutube />
                        </a>
                        <a href="https://www.instagram.com/tikloveyuu/reels/">
                            <FaInstagram />
                        </a>

                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-white text-lg">Suporte</h1>
                    <div className="flex items-center gap-3 justify-center">
                        <FaEnvelope className="text-white"/>
                        <p className="text-white text-xs">
                            denidesenvolvimentos@gmail.com
                        </p>
                    </div>

                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-white text-lg">Legal</h1>
                    <Link href="/terms">
                        <p className="text-white text-xs">
                            Termos de uso
                        </p>
                    </Link>
                    <Link href="/privacy-policy">
                        <p className="text-white text-xs">
                            Termos de privacidade
                        </p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}