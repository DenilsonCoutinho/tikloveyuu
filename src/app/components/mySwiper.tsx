import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

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
                speed={1000}
                loop={true}

                modules={[EffectCube, Pagination, Autoplay]}
                className="mySwiper max-w-60 "
            >

                {
                    previewURLs.map((img: any) => {
                        return <SwiperSlide>
                            <div className="bg-cover text-transparent bg-no-repeat bg-center h-72" style={{ backgroundImage: `url(${img})`, backgroundPosition: "center 30%" }}>
                                a
                            </div>
                        </SwiperSlide>
                    })
                }

            </Swiper>
        </>
    )
}