'use client'
import themeConfig from '@/config/themeConfig';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import ReactStars from 'react-stars';
import { useCart } from 'react-use-cart';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SingleProduct({ data }) {
    const { wishlist, addToWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const [mini_cart_DropDowon, SetMini_cart_DropDowon] = useState(false);

    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
    const increaseQuantity = () => setQuantity(quantity + 1);

    const { addItem } = useCart();

    const add_cart = (data, quantity) => {
        console.log(data, quantity)
        addItem(data, quantity);
    };
    const isInWishlist = (item) => {
        return wishlist.find((element) => element.id === item.id);
    };
    const isInCart = (item) => {
        return cartItems.find((element) => element.id === item.id);
    };
    const handel_mini_cart_DropDowon = () => {
        SetMini_cart_DropDowon(prevChange => !prevChange);
        document.querySelector("body").classList.add("minicart-open");
        document.getElementById('mini-cart-dropdown').classList.add('open');
    }
    return (
        <>
            {data ?
                <div className="single-product">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="single-product-left">
                                    <div className="project-slider">
                                        <Swiper
                                            slidesPerView={1}
                                            loop={true}
                                            speed={600}
                                            autoplay={{
                                                delay: 5000,
                                                disableOnInteraction: false,
                                            }}
                                            modules={[Autoplay]}
                                            className=" mySwiper"
                                        >
                                            {data.product_slider && data.product_slider.map((product_data, id) => (
                                                <SwiperSlide key={id}>
                                                    <div className="project-box">
                                                        <div className="project-img img-cover">
                                                            <Image src={product_data.image ? product_data.image : themeConfig.no_found_image} width={product_data.width} height={product_data.height} alt="" />
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="single-product-right">
                                    <h2 className="title">{data.title}</h2>
                                    <div className="product-star-rating">
                                        <ReactStars
                                            count={5}
                                            value={data.rating}
                                            size={18}
                                            edit={false} // Set to false for read-only display
                                            color2="#ffd700" // Color for the filled stars
                                        />
                                    </div>
                                    <div className="product-price">
                                        <h3>${data.price}<span>${data.main_price}</span></h3>
                                    </div>
                                    <div className="product-description">
                                        <p>
                                            {data.label}
                                        </p>
                                    </div>
                                    <div className="product-designer">
                                        <h4>{data.designer}</h4>
                                        <p>{data.designer_name}</p>
                                    </div>
                                    <div className="product-color">
                                        <h4 className="shop-product-title">{data.color_title}</h4>
                                        <div className="filter-color-wrap">
                                            {data.color_list && data.color_list.length > 0 ? data.color_list.map((list_data, index) => (
                                                <div className="filter-color-futures" key={index}>
                                                    <input type="checkbox" id={list_data.color} />
                                                    <label className={list_data.class} htmlFor={list_data.color}></label>
                                                </div>
                                            )) : null}

                                        </div>
                                    </div>
                                    <div className="product-size">
                                        <h4 className="shop-product-title">{data.size_title}</h4>
                                        <div className="filter-color-wrap">
                                            {data.size_list && data.size_list.length > 0 ? data.size_list.map((size_data, index) => (
                                                <div className="filter-color-futures" key={index}>
                                                    <input type="checkbox" id={size_data.size_id} />
                                                    <label className={size_data.class} htmlFor={size_data.size_id}>{size_data.size}</label>
                                                </div>
                                            )) : null}

                                        </div>
                                    </div>
                                    <div className="product-quantity">
                                        <h4 className="shop-product-title">{data.quantity}</h4>
                                        <div className="plus-minus-input">
                                            <input className="input-group-field" type="number" name="quantity" value={quantity} readOnly />
                                            <div className="input-group-button button-minus">
                                                <button type="button" className="button hollow circle" data-quantity="minus"
                                                    data-field="quantity" onClick={() => decreaseQuantity()}>
                                                    <i className="fas fa-chevron-down"></i>
                                                </button>
                                            </div>
                                            <div className="input-group-button button-plus">
                                                <button type="button" className="button hollow circle" data-quantity="plus"
                                                    data-field="quantity" onClick={() => increaseQuantity()}>
                                                    <i className="fas fa-chevron-up"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="product-social">
                                            <ul>
                                                <li>
                                                    <Link href="" onClick={() => { addToWishlist(data); }}>
                                                        <i className={isInWishlist(data) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-cart-buy-now">
                                        <Link href="/shipping" className="btn btn-primary">{data.buy_button}</Link>
                                        <Link href="" className="btn btn-primary add-to-cart" id="mini-cart-dropdown" onClick={(e) => { e.preventDefault(); add_cart(data,quantity); handel_mini_cart_DropDowon(); }}>{data.cart_button}</Link>
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
