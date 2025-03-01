import themeConfig from '@/config/themeConfig'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogGrid({ data }) {
    return (
        <>
            {data ?

                <div className="news-letter-type" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                    <div className="news-letter-img">
                        <Link href={`/blog/${data.slug}`} className="img-cover"><Image src={data.image ? data.image : themeConfig.no_found_image} width={data.width} height={data.height}
                            alt="" /></Link>
                        <div className="news-letter-date">
                            <Link href={`/blog/${data.slug}`} className="btn btn-primary">{data.date}</Link>
                        </div>
                    </div>
                    <div className="news-letter-details">
                        <h3><Link href={`/blog/${data.slug}`}>{data.title}</Link></h3>
                        <p>{data.label}
                        </p>
                        <Link href={`/blog/${data.slug}`} className="btn btn-primary">{data.read_button}</Link>
                    </div>
                </div>

                : null}
        </>
    )
}
