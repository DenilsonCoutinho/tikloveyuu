import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function MySwiper({ previewURLs }: any) {
    return (
        <>
        
            <Swiper
                effect={'cube'}
                grabCursor={true}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,

                }}
                pagination={true}
                autoplay={{
                    delay: 1000,
                }}
                speed={2000}
                loop={true}

                modules={[EffectCube, Pagination, Autoplay]}
                className="mySwiper max-w-72 "
            >

                {
                    previewURLs.map((img: any, i: any) => {
                        return <SwiperSlide id='' key={"image" + i}>
                            <div className="relative bg-cover text-transparent bg-no-repeat bg-center h-[360px]" style={{ backgroundImage: `url(${img.replace(/ /g, '%20')})`, backgroundPosition: "center 30%" }}>
                                <Image
                                    quality={100}
                                    className=" w-full h-full object-cover"
                                    width={222}
                                    height={222}
                                    alt='323'
                                    src={img}
                                    style={{ opacity: 110 }} 
                                />
                            </div>
                            {/* <div className="bg-cover text-transparent bg-no-repeat bg-center h-72" style={{ backgroundImage: `url(${img.replace(/ /g, '%20')})`, backgroundPosition: "center 30%" }}>
                                
                            </div>
                                <Image quality={100} className='bg-cover text-transparent bg-no-repeat bg-center h-' style={{ backgroundImage: `url(${img.replace(/ /g, '%20')})`, backgroundPosition: "center 30%" }} width={222} height={222} alt='323' src={img}/> */}
                        </SwiperSlide>
                    })
                }

            </Swiper>
        </>
    )
}