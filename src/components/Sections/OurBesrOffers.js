"use client";
import themeConfig from "@/config/themeConfig";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

export default function OurBesrOffers({ data }) {
  const [mini_cart_DropDowon, SetMini_cart_DropDowon] = useState(false);

  const { addItem, items: cartItems } = useCart();
  const isInCart = (item) => {
    return cartItems.find((element) => element.id === item.id);
  };
  const { wishlist, addToWishlist } = useWishlist();
  const isInWishlist = (item) => {
    return wishlist.find((element) => element.id === item.id);
  };
  const handel_mini_cart_DropDowon = () => {
    SetMini_cart_DropDowon((prevChange) => !prevChange);
    document.querySelector("body").classList.add("minicart-open");
    document.getElementById("mini-cart-dropdown").classList.add("open");
  };
  return (
    <>
      {data ? (
        <div className="our-best-offer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="our-best-offer-wrapper">
                  <div className="section-title">
                    <div
                      className="title-wrap"
                      data-aos="fade-right"
                      data-aos-delay="200"
                      data-aos-duration="1500"
                    >
                      <h2 className="title">{data.our_offer_title}</h2>
                    </div>
                    <Link
                      href="/shop"
                      data-aos="fade-left"
                      data-aos-delay="200"
                      data-aos-duration="1500"
                    >
                      <p>{data.our_product_button}</p>
                    </Link>
                  </div>
                  <div className="our-best-offer-wrap">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div
                          className="our-best-offer-left"
                          data-aos="zoom-in"
                          data-aos-delay="200"
                          data-aos-duration="1500"
                        >
                          <Image
                            src={
                              data.image
                                ? data.image
                                : themeConfig.no_found_image
                            }
                            alt=""
                            width={409}
                            height={409}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div
                          className="our-best-offer-right"
                          data-aos="fade-up"
                          data-aos-delay="200"
                          data-aos-duration="1500"
                        >
                          <h3>{data.title}</h3>
                          <p>{data.detail}</p>
                          {/* <h6>
                            $ {data.price} -<span> $ {data.main_price}</span>
                          </h6> */}
                          {/* <div className="best-offer-social">
                                                        <ul>
                                                            <li>
                                                                <Link href="" onClick={(e) => { e.preventDefault(); addItem(data); handel_mini_cart_DropDowon(); }} id="mini-cart-dropdown">
                                                                    <i className={isInCart(data) ? "fa-solid fa-cart-arrow-down" : "fa-solid fa-cart-shopping"}></i>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link href="" onClick={() => addToWishlist(data)}>
                                                                    <i className={isInWishlist(data) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                                                </Link>
                                                            </li>
                                                            <li
                                                            ><Link href={`/product/${data.slug}`}><i className="fas fa-eye"></i>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div> */}
                        </div>
                      </div>
                    </div>
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
