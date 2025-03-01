import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Testimonial({ data }) {
    return (
        <>
            {data ?
                <div className="testimonials">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="testimonials-left">
                                    {data.testimonial_image ? < Image src={data.testimonial_image} width={data.testimonial_width} height={data.testimonial_height} alt="" /> : null}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="testimonials-right">
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={40}
                                        loop={true}
                                        speed={600}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            el: ".testimonials-right .swiper-pagination",
                                            clickable: true,
                                        }}
                                        modules={[Pagination, Autoplay]}
                                        className="mySwiper">
                                        {data.testimonial && data.testimonial.length > 0 ? data.testimonial.map((list_data, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className="swiper-slide-wrapper">
                                                        <div className="testimonials-title-wrap">
                                                            <h3>{list_data.name}</h3>
                                                            <h4>Customer</h4>
                                                        </div>
                                                        <div className="testimonials-user img-cover">
                                                            <Image src={list_data.image ? list_data.image :themeConfig.no_found_user} width={list_data.width} height={list_data.height} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="testimonials-description">
                                                        <div className="quote-left">
                                                            <i className="fas fa-quote-left"></i>
                                                        </div>
                                                        <p>
                                                            {list_data.label}
                                                        </p>
                                                        <div className="quote-right">
                                                            <i className="fas fa-quote-right"></i>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        }) : null}

                                        <div className="swiper-pagination"></div>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}
