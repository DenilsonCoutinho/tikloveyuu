import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import img_1 from '../../assets/proof/1730346739292.svg'
import img_2 from '../../assets/proof/1730346803402.svg'
import img_3 from '../../assets/proof/1730346888764.svg'
import Image from 'next/image';
export default function Viral() {
    return (
        <div className='max-w-[800px] m-auto md:pb-20 pb-20'>
            <h1 className='text-white md:text-5xl text-4xl font-bold text-center py-10'>Surpresas que<br />
                <span className='text-[#4500E5]  sha'>viralizaram</span></h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                // loop={true}
                autoplay={{
                    delay: 2300,
                    disableOnInteraction: false,
                }}
                navigation={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='flex flex-col items-center'>
                        <Image height={500} quality={100} alt='img' src={img_1} />
                        <div className='rounded-md bg-redDefault max-w-[200px] w-full'>

                            <p className='text-white text-center text-xs'>@gabriela.rodrigue9315</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex flex-col items-center'>
                        <Image height={500} quality={100} alt='img' src={img_2} />
                        <div className='rounded-md bg-redDefault max-w-[200px] w-full'>
                            <p className='text-white text-center text-xs'>@sandri.alv</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex flex-col items-center'>
                        <Image height={500} quality={100} alt='img' src={img_3} />
                        <div className='rounded-md bg-redDefault max-w-[200px] w-full'>
                            <p className='text-white text-center text-xs'>@ruth_p_coutinho</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}