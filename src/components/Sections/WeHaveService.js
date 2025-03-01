import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function WeHaveService({ data }) {
    return (
        <>
            {data ?
                <div className="everything-need">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="everything-need-details" data-aos="fade-up" data-aos-delay="100"
                                    data-aos-duration="1500">
                                    <div className="title-wrap">
                                        <h2 className="title">{data.wehave_title}</h2>
                                        <p>{data.detail}</p>
                                        <div className="sample-unordered-list">
                                            <h4>{data.unorderlist_title}</h4>
                                            <ul>
                                                {data.unorder_list && data.unorder_list.length > 0 ? data.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}

                                            </ul>
                                        </div>
                                        <Link href="/contact-us" className="btn btn-primary">{data.button}</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="everything-need-img img-cover" data-aos="zoom-in" data-aos-delay="100"
                                    data-aos-duration="1500">
                                    <Image src={data.image ? data.image : themeConfig.no_found_image} width={626} height={532} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}
