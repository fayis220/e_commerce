import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FurnitureBrands({ data }) {
    return (

        <>
            {data ?
                <section className="wc-brand-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wc-brand-title">
                                    <h2 className="title">{data.brands_title}</h2>
                                </div>
                                <div className="brand-wrapper">
                                    {data.brands_list && data.brands_list.length > 0 ? data.brands_list.map((brand_list_data, index) => (
                                        <div className="brand-column" key={index}>
                                            <div className="content-brand">
                                                <div className="brand-image">
                                                    <Link href="" className="img-cover">
                                                        <Image src={brand_list_data.image_one ? brand_list_data.image_one : themeConfig.no_found_image}
                                                            width={brand_list_data.width_one}
                                                            height={brand_list_data.height_one}
                                                            alt="brand-image" />
                                                    </Link>
                                                </div>
                                                <div className="brand-icon">
                                                    <Image src={brand_list_data.image ? brand_list_data.image : themeConfig.no_found_image}
                                                        width={brand_list_data.width}
                                                        height={brand_list_data.height}
                                                        alt="brand-one" />
                                                </div>
                                            </div>
                                        </div>
                                    )) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                : null}
        </>
    )
}
