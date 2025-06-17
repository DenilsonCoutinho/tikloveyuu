"use client"
import {
    DialogContent,
} from "@/components/ui/dialog"


import Footer from './components/footer';

import HowItWorks from './components/howItork';
import Faq from './components/faq';
import QrCodeSite from './components/qrCodeSite';
import Viral from './components/viral';

import Prices from './components/prices';
import ModalPayment from '../components/modalPayment';
import Hero from './components/hero';
import FormCouple from "./components/form/formCouple";
import { useFormUserContext } from "../../../context/FormUserContext";


export default function Presentation() {

    const {
        dataCouple,
        hour,
        imageCouple,
        nameCouple,
        message,
        typeProduct, setTypeProduct,
        youtubeLink, setYoutubeLink,
    } = useFormUserContext();

    console.log( dataCouple,
        hour,
        imageCouple,
        nameCouple,
        message,
        typeProduct,)
    return (
        <div className='overflow-hidden'>
            <DialogContent className='bg-white FORM_PAYMENT_CONTENT'>
                <ModalPayment imageCouple={imageCouple} dataCouple={dataCouple} hour={hour} message={message} nameCouple={nameCouple} typeProduct={typeProduct} youtubeLink={youtubeLink} />
            </DialogContent>
            <main className="m-auto">
                <Hero />
                <Viral />
                <HowItWorks />
                <Prices setSelectedInput={(e) => { setTypeProduct(e); setYoutubeLink('') }} />
                <FormCouple />
            </main >
            <Faq />
            <QrCodeSite />
            <Footer />

        </div>
    )
}