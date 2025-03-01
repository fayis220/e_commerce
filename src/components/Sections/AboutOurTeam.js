import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import TeamMemberCard from '../TeamMemberCard'
import Link from 'next/link'

export default function AboutOurTeam({ data }) {
    return (
        <>
            {data ?
                <div className="meet-our-team">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="meet-our-team-wrapper">
                                    <div className="section-title">
                                        <div className="title-wrap" data-aos="fade-right" data-aos-delay="200"
                                            data-aos-duration="1500">
                                            <h2 className="title">{data.our_team_title}</h2>
                                        </div>
                                        <Link href="/our-team" data-aos="fade-left" data-aos-delay="200"
                                            data-aos-duration="1500">
                                            <p>{data.button}</p>
                                        </Link>
                                    </div>
                                    <div className="meet-our-team-slider">
                                        <Swiper slidesPerView={4}
                                            spaceBetween={30}
                                            loop={true}
                                            speed={600}
                                            autoplay={{
                                                delay: 5000,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                el: ".meet-our-team-slider .swiper-pagination",
                                                clickable: true,
                                            }}
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 0,
                                                },
                                                576: {
                                                    slidesPerView: 2,
                                                    spaceBetween: 20,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 30,
                                                },
                                                1024: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 30,
                                                },
                                            }}
                                            modules={[Autoplay, Pagination]}
                                            className="swiper mySwiper">
                                            {data.our_team_slider && data.our_team_slider.length > 0 ?
                                                data.our_team_slider.map((team_data, index) => (

                                                    <SwiperSlide key={index}>

                                                        <TeamMemberCard data={team_data} />

                                                    </SwiperSlide>)) : null}

                                            <div className="swiper-pagination"></div>

                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
                : null}
        </>
    )
}
