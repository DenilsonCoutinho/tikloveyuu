import Image from "next/image";
import logo from "../../assets/logoLove.png"
import me from "../../assets/me.png"
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="border-white border-t mt-20 py-10">
            <div className=" px-3 m-auto flex md:flex-row  max-w-[1000px]  md:items-start items-start   flex-col md:gap-96 gap-10">
                <div className="flex flex-col  pl-1">
                    <Image alt="logo" src={logo} quality={100} width={110} className="" />
                    <p className="text-xs text-slate-100 font-medium leading-5">Surpreenda o seu amor criando seu<br /> contador de tempo de relacionamento</p>
                    <p className="text-xs text-slate-300 font-mono ">Copyright © 2024 - Todos os direitos reservados</p>
                    <div className="flex items-center flex-row md:mt-2 mt-10">
                        <Image alt="logo" quality={100} src={me} className="rounded-full md:h-10 md:w-10 w-8 h-8 object-cover  z-20 relative" />
                        <div className="border-b flex items-center border-r border-t  border-white w- max-w- h-7 rounded-r-md md:-translate-x-2 -translate-x-3">
                            <p className="text-white text-xs px-3 font-medium boujee-text">Feito por Denilson Coutinho</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center text-white gap-3 mt-2">
                        <p className="text-sm">siga-nos</p>
                        <a href="https://www.youtube.com/@tikloveyuu/shorts">
                            <FaYoutube />
                        </a>
                        <a href="https://www.instagram.com/tikloveyuu/reels/">
                            <FaInstagram />
                        </a>
                       
                        <a href="https://www.linkedin.com/in/denilson-c-silva/" className="">
                            <FaLinkedin />
                        </a>
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