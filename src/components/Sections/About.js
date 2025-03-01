import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import React from 'react'

export default function About({ data }) {
    return (
        <>
            {data ?
                <div className="about-us">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-us-img-wrapper">
                                    <div className="about-img-first">
                                        <div className="about-us-img-wrap img-cover" data-aos="zoom-in" data-aos-delay="100"
                                            data-aos-duration="1500">
                                            <Image src={data.image ? data.image : themeConfig.no_found_image} width={322} height={206} alt="" />
                                        </div>
                                        <div className="about-us-img-wrap about-us-img-small img-cover" data-aos="zoom-in"
                                            data-aos-delay="200" data-aos-duration="1500">
                                            <Image src={data.image_small ? data.image_small : themeConfig.no_found_image} width={182} height={154} alt="" />
                                        </div>
                                    </div>
                                    <div className="about-img-last">
                                        <div className="about-us-img-wrap about-us-img-small img-cover" data-aos="zoom-in"
                                            data-aos-delay="300" data-aos-duration="1500">
                                            <Image src={data.image_small2 ? data.image_small2 : themeConfig.no_found_image} width={182} height={154} alt="" />
                                        </div>
                                        <div className="about-us-img-wrap img-cover" data-aos="zoom-in" data-aos-delay="400"
                                            data-aos-duration="1500">
                                            <Image src={data.about_image ? data.about_image : themeConfig.no_found_image} width={322} height={206} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-us-details" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
                                    <div className="title-wrap">
                                        <h2 className="title">{data.title}</h2>
                                    </div>
                                    <p>
                                        {data.label}
                                    </p>
                                    <p>
                                        {data.detail}
                                    </p>
                                    <div className="about-us-stype">
                                        <ul>
                                            {data.list && data.list.length > 0 ? data.list.map((data, index) => (
                                                <li key={index}><i className="far fa-check-circle"></i>{data}</li>
                                            )) : null}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}
