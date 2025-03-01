import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import themeConfig from '@/config/themeConfig'

export default function TeamMemberCard({ data }) {
    return (
        <>
            <div className="swiper-slide-wrap" data-aos="fade-up" data-aos-delay="900"
                data-aos-duration="1500">
                <div className="meet-team-img">
                    <Link href="/our-team" className="img-cover">
                        <Image
                            src={data.image ? data.image : themeConfig.no_found_user}
                            width={130}
                            height={130}
                            alt="" />
                    </Link>
                </div>
                <div className="meet-team-details">
                    <Link href="/our-team">
                        <h3>{data.name}</h3>
                    </Link>
                    <p>{data.position}</p>
                    <div className="footer-social">
                        <ul>
                            {data.social_media && data.social_media.map((data, index) => (
                                <li key={index}>
                                    <Link href={data.link} target="_blank">
                                        <i className={`fab ${data.class}`}></i>
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
