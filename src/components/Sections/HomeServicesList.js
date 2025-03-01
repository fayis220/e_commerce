import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import React from 'react'

export default function HomeServicesList({ data }) {
    return (
        <>
            {data ?
                <div className="services">
                    <div className="container">
                        <div className="row">
                            {data.homepage_services_list && data.homepage_services_list.length > 0 ? data.homepage_services_list.map((data, index) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-3" key={index}>
                                        <div className="services-type" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                                            <div className="services-icon">
                                                <Image src={data.image ? data.image : themeConfig.no_found_image} width={data.width} height={data.height} alt="" />
                                            </div>
                                            <h6>{data.title}</h6>
                                            <p>{data.label}</p>
                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                    </div>
                </div>

                : null}
        </>
    )
}
