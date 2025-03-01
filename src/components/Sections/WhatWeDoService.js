import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function WhatWeDoService({ data }) {
    return (
        <>
            {data ?
                <div className="what-we-do">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="what-we-do-wrapper">
                                    <div className="section-title">
                                        <div className="title-wrap" data-aos="fade-right" data-aos-delay="200"
                                            data-aos-duration="1500">
                                            <h2 className="title">{data.whtawe_title}</h2>
                                        </div>
                                        <p data-aos="fade-left" data-aos-delay="200" data-aos-duration="1500">
                                            {data.label}
                                        </p>
                                    </div>
                                    <div className="what-we-do-wrap">
                                        <div className="row">
                                            {data.whatwe_listing && data.whatwe_listing.length > 0 ?
                                                data.whatwe_listing.map((list_data, index) => (
                                                    <div className="col-12 col-md-6 col-lg-3" key={index}>
                                                        <div className="what-we-do-futures" data-aos="fade-up" data-aos-delay="100"
                                                            data-aos-duration="1500">
                                                            <div className="what-we-futures-img">
                                                                <Link href="/gallery" className="img-cover">
                                                                    <Image src={list_data.image ? list_data.image : themeConfig.no_found_image} width={list_data.width} height={list_data.height}
                                                                        alt={list_data.alt} />
                                                                </Link>
                                                            </div>
                                                            <div className="what-we-futures-details">
                                                                <h3>{list_data.number}</h3>
                                                                <Link href={`/blog/${list_data.slug}`}>
                                                                    <h4>{list_data.title}</h4>
                                                                </Link>
                                                                <p>
                                                                    {list_data.label}
                                                                </p>
                                                                <Link href={`/blog/${list_data.slug}`}>{list_data.read_button}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : null}

                                        </div>
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
