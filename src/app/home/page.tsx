"use client"
import Footer from './components/footer';

import HowItWorks from './components/howItork';
import Faq from './components/faq';
import QrCodeSite from './components/qrCodeSite';

import Prices from './components/prices';
import Hero from './components/hero';


export default function Presentation() {

    return (
        <div className='overflow-hidden'>
            <main className="m-auto">
                <Hero />
                {/* <Viral /> */}
                <HowItWorks />
                <Prices setSelectedInput={(e) => { }} />
            </main >
            <Faq />
            <QrCodeSite />
            <Footer />

        </div>
    )
}