import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BlogGrid from '../BlogGrid'

export default function BlogAndNews({ data }) {
    return (
        <>
            {data ?
                <div className="news-letter">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="news-letter-wrapper">
                                    <div className="section-title">
                                        <div className="title-wrap" data-aos="fade-right" data-aos-delay="200"
                                            data-aos-duration="1500">
                                            <h2 className="title">{data.blog_title}</h2>
                                        </div>
                                        <p data-aos="fade-left" data-aos-delay="200" data-aos-duration="1500">{data.blog_label}
                                        </p>
                                    </div>
                                    <div className="news-letter-wrap">
                                        <div className="row">
                                            {data.blog_list && data.blog_list.length > 0 ? data.blog_list.map((blog_data, index) => (
                                                <div className="col-md-4" key={index}>
                                                    <BlogGrid data={blog_data} />
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