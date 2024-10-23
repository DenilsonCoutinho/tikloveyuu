"use client"
import { useState } from "react";
import styles from "../../app/reponseReceived/reponseReceived.module.css";
import Flowers from "../components/flower";

export default function reponseReceived() {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="bg-defaultBg  ">
            <div className=" h-screen flex justify-center items-center flex-col ">
                {/* <div className={` ${styles.valentines} `}>
                    <div className={` ${styles.envelope}`}>
                        <div className={` ${styles.card}`} style={{ transform: isClicked ? "translateY(-100px)" : "translateY(0)" }}>
                            <div className={` ${styles.text}`}>
                                Mensagem para você
                            </div>
                        </div>
                    </div>
                    <div className={` ${styles.front}`}></div>
                </div> */}

                {isClicked && <Flowers />}
                {!isClicked && <div className="flex flex-row gap-3 items-center">
                    <button onClick={() => setIsClicked(!isClicked)} className="bg-redDefault rounded-md shadow-[#4500E5] text-white shadow-md h-10 w-72 m-">Sim</button>
                    <button  className="bg-red-600 rounded-md shadow-[#e50800] text-white shadow-md h-10 w-72 m-">Não</button>
              
                </div>
                }
            </div>
        </div>
    )
}