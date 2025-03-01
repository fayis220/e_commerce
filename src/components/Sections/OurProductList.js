"use client";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "react-use-cart";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ProductCard";

export default function OurProductList({ data }) {
  const { wishlist, addToWishlist } = useWishlist();
  const isInWishlist = (item) => {
    return wishlist.find((element) => element.id === item.id);
  };
  const { addItem } = useCart();
  return data ? (
    <div className="our-product">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="our-product-wrapper">
              <div className="section-title">
                <div
                  className="title-wrap"
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  <h2 className="title">{data.our_products_title}</h2>
                </div>
                <Link
                  href="shop"
                  data-aos="fade-left"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  <p>{data.our_product_button}</p>
                </Link>
              </div>
              <div className="our-product-slider">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  loop={true}
                  speed={600}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    el: ".our-product-slider .swiper-pagination",
                    clickable: true,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    576: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Pagination, Autoplay]}
                  className=" mySwiper"
                >
                  {data.our_products_list && data.our_products_list.length > 0
                    ? data.our_products_list.map((list_data, index) => (
                        <SwiperSlide key={index}>
                          <ProductCard data={list_data} />
                        </SwiperSlide>
                      ))
                    : ""}
                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
