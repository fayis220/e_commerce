import React, { useState, useEffect } from 'react'
import BlogSideBar from './BlogSideBar';
import Link from 'next/link';
import Image from 'next/image';
import themeConfig from '@/config/themeConfig';

export default function BlogClassicGrid({ data }) {
    const [showmore, setShowmore] = useState(4);
    const [blogData, setBlogData] = useState([]);

    const handleShowMore = (e) => {
        e.preventDefault();
        setShowmore(prev => prev + 5);
    }

    const handleShowLess = (e) => {
        e.preventDefault();
        setShowmore(prev => (prev - 5 > 0 ? prev - 5 : 5));
    }

    useEffect(() => {
        if (data && data.blog_list) {
            setBlogData(data.blog_list);
        }
    }, [data]);
    return (
        <>
            {data ?
                <div className="blog-part">
                    <div className="container">
                        <div className="row">
                            <BlogSideBar data={data} />
                            <div className="col-lg-9">
                                <div className="blog-right">
                                    {blogData.length > 0 && blogData.slice(0, showmore).map((data, index) => (
                                        <div className="blog-type" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500" key={index}>
                                            <div className="blog-img">
                                                <Link href={`/blog/${data.slug}`} className="img-cover"><Image src={data.image ? data.image : themeConfig.no_found_image} width={data.width} height={data.height} alt="" /></Link>
                                            </div>
                                            <div className="blog-details-wrapper">
                                                <Link href={`/blog/${data.slug}`}>
                                                    <h4>{data.title}</h4>
                                                </Link>
                                                <div className="blog-time-date">
                                                    <div className="blog-time">
                                                        <p><i className="far fa-clock"></i>{data.date}</p>
                                                    </div>
                                                    <div className="blog-user">
                                                        <p><i className="fas fa-user"></i>{data.name}</p>
                                                    </div>
                                                </div>
                                                <p>
                                                    {data.label}
                                                </p>
                                                <Link href={`/blog/${data.slug}`} className="blog-view-more">{data.read_button}</Link>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="gallery-load-more" data-aos="fade-up" data-aos-delay="500"
                                        data-aos-duration="1500">
                                        {blogData.length > 0 && (
                                            <>
                                                {showmore < blogData.length ? (
                                                    <Link href="" className="btn btn-primary" onClick={handleShowMore}>Load More</Link>
                                                ) : (
                                                    showmore > 5 && (
                                                        <Link href="" className="btn btn-primary" onClick={handleShowLess}>Show Less</Link>
                                                    )
                                                )}
                                            </>
                                        )}
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
