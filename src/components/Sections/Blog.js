"use client";
import React, { useState, useEffect } from "react";
import BlogGrid from "../BlogGrid";
import BlogSideBar from "./BlogSideBar";
import Link from "next/link";

export default function Blog({ data }) {
  const [showmore, setShowmore] = useState(6);
  const [blogData, setBlogData] = useState([]);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowmore((prev) => prev + 5);
  };

  const handleShowLess = (e) => {
    e.preventDefault();
    setShowmore((prev) => (prev - 5 > 0 ? prev - 5 : 5));
  };

  useEffect(() => {
    if (data && data.blog_list) {
      setBlogData(data.blog_list);
    }
  }, [data]);
  return (
    <>
      {data ? (
        <div className="blog-part">
          <div className="container">
            <div className="row">
              <BlogSideBar data={data} />
              <div className="col-lg-9">
                <div className="blog-right">
                  <div className="blog-grid">
                    {blogData.length > 0 &&
                      blogData
                        .slice(0, showmore)
                        .map((data, index) => (
                          <BlogGrid data={data} key={index} />
                        ))}
                  </div>
                  <div
                    className="gallery-load-more"
                    data-aos="fade-up"
                    data-aos-delay="500"
                    data-aos-duration="1500"
                  >
                    {blogData.length > 0 && (
                      <>
                        {showmore < blogData.length ? (
                          <Link
                            href=""
                            className="btn btn-primary"
                            onClick={handleShowMore}
                          >
                            Load More
                          </Link>
                        ) : (
                          showmore > 5 && (
                            <Link
                              href=""
                              className="btn btn-primary"
                              onClick={handleShowLess}
                            >
                              Show Less
                            </Link>
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
      ) : null}
    </>
  );
}
