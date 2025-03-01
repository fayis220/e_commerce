import themeConfig from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogSideBar({ data }) {
  return (
    <>
      {data ? (
        <div className="col-lg-3">
          <div className="blog-left blog-details-left">
            {/* <div className="blog-user-wrapper">
              <div className="blog-user-img">
                <Link href="" className="img-cover">
                  {" "}
                  <Image
                    src={
                      data.admin_image
                        ? data.admin_image
                        : themeConfig.no_found_user
                    }
                    width={data.width}
                    height={data.height}
                    alt=""
                  />{" "}
                </Link>
              </div>
              <div className="blog-user-details">
                <h5>{data.name}</h5>
                <Link href="mailto:michelle1209@lorem.com">{data.email}</Link>
              </div>
            </div> */}
            <div className="product-categories">
              <h4 className="shop-product-title">{data.categories}</h4>
              <ul>
                {data.category_list && data.category_list.length > 0
                  ? data.category_list.map((category_data, index) => (
                      <li key={index}>
                        <Link href={`/category/${category_data.slug}`}>
                          {category_data.title}
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            {/* <div className="latest-post">
                            <h4 className="shop-product-title">{data.latest_post_title}</h4>
                            <div className="latest-post-wrapper">
                                {data.latest_post_list && data.latest_post_list.length > 0 ? data.latest_post_list.map((post_data, index) => (
                                    <div className="latest-post-wrap" key={index}>
                                        <div className="latest-post-img">
                                            <Link href="" className="img-cover"><Image src={post_data.image ? post_data.image : themeConfig.no_found_image} width={post_data.width} height={post_data.height} alt="" /></Link>
                                        </div>
                                        <div className="latest-post-title">
                                            <h6>{post_data.date}</h6>
                                            <h5>{post_data.title}</h5>
                                        </div>
                                    </div>
                                )) : null}

                            </div>
                        </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
