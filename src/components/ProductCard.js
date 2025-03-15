"use client";
import React, { useState } from "react";
import ReactStars from "react-stars";
import { useCart } from "react-use-cart";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import themeConfig from "@/config/themeConfig";

export default function ProductCard({ data }) {
  const [mini_cart_DropDowon, SetMini_cart_DropDowon] = useState(false);

  const { addItem } = useCart();
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
        <div
          className="our-product-wrap"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <div className="our-product-img img-cover">
            <Image
              src={data.image ? data.image : themeConfig.no_found_image}
              width={data.width}
              height={data.height}
              alt=""
            />
            {/* <div className="sale-btn">
              <Link href="" className="btn btn-primary">
                {data.onsale}
              </Link>
            </div> */}
            {/* <div className="product-cart">
              <div className="product-social">
                <ul>
                  <li>
                    <Link href="" onClick={() => addToWishlist(data)}>
                      <i
                        className={
                          isInWishlist(data)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/product/${data.slug}`}>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                href=""
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(data);
                  handel_mini_cart_DropDowon();
                }}
              >
                {data.add_cart_btn}
              </Link>
            </div> */}
          </div>
          <div className="our-product-details">
            <div className="product-details-wrap" Style="padding-top: 20px">
              <h5>{data.title}</h5>
              {/* <h6>
                ${data.price}
                <span>${data.main_price}</span>
              </h6> */}
            </div>
            {data.rating ? (
              <div className="product-star-rating">
                <ReactStars
                  count={5}
                  value={data.rating}
                  size={18}
                  edit={false} // Set to false for read-only display
                  color2="#ffd700" // Color for the filled stars
                  className="star"
                />
              </div>
            ) : null}
            <p className="proudct-description">{data.label}</p>
            <div className="add-to-cart-view">
              <div className="add-to-cart-view-wrap">
                <Link
                  href=""
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem(data);
                    handel_mini_cart_DropDowon();
                  }}
                >
                  {data.add_cart_btn}
                </Link>
                <div className="product-social">
                  <ul>
                    <li>
                      <Link href="" onClick={() => addToWishlist(data)}>
                        {" "}
                        <i
                          className={
                            isInWishlist(data)
                              ? "fa-solid fa-heart"
                              : "fa-regular fa-heart"
                          }
                        ></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/product/${data.slug}`}>
                        <i className="fas fa-eye"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
