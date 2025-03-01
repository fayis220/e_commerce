"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-stars";
import Loader from "@/components/Loader";
import themeConfig from "@/config/themeConfig";


async function fetchData() {

  const res = await fetch("/json/data/product.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function DynamicPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);
  const [Tab_Entry, setTab_Entry] = useState("Discription")
  const { wishlist, addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [mini_cart_DropDowon, SetMini_cart_DropDowon] = useState(false);

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => setQuantity(quantity + 1);

  const { addItem } = useCart();

  const add_cart = (pageData, quantity) => {
    console.log(pageData, quantity)
    addItem(pageData, quantity);
  };
  const isInWishlist = (item) => {
    return wishlist.find((element) => element.id === item.id);
  };
  const isInCart = (item) => {
    return cartItems.find((element) => element.id === item.id);
  };
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData();
        const foundData = data.find((item) => item.slug === slug);
        if (!foundData) {
          setError("Page not found");
        } else {
          setPageData(foundData);
        }
      } catch (err) {
        setError("Failed to load data");
      }
    }

    loadData();
  }, [slug]);

  if (error) {
    return redirect('/error-404');
  }

  if (!pageData) {
    return <Loader/>;
  }
  const handel_mini_cart_DropDowon = () => {
    SetMini_cart_DropDowon(prevChange => !prevChange);
    document.querySelector("body").classList.add("minicart-open");
    document.getElementById('mini-cart-dropdown').classList.add('open');
}

  return (
    <>
      <div className="site-content">
        <Breadcrumbs />

        {/* <!-- Single-Product Start --> */}
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
                      {pageData.product_slider && pageData.product_slider.map((product_data, index) => (
                        <SwiperSlide key={index}>
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
                  <h2 className="title">{pageData.title}</h2>
                  <div className="product-star-rating">
                    <ReactStars
                      count={5}
                      value={pageData.rating}
                      size={18}
                      edit={false} // Set to false for read-only display
                      color2="#ffd700" // Color for the filled stars
                    />
                  </div>
                  <div className="product-price">
                    <h3>${pageData.price}<span>${pageData.main_price}</span></h3>
                  </div>
                  <div className="product-description">
                    <p>
                      {pageData.label}
                    </p>
                  </div>
                  <div className="product-designer">
                    <h4>{pageData.designer}</h4>
                    <p>{pageData.designer_name}</p>
                  </div>
                  <div className="product-color">
                    <h4 className="shop-product-title">{pageData.color_title}</h4>
                    <div className="filter-color-wrap">
                      {pageData.color_list && pageData.color_list.length > 0 ? pageData.color_list.map((list_data, index) => (
                        <div className="filter-color-futures" key={index}>
                          <input type="checkbox" id={list_data.color} />
                          <label className={list_data.class} htmlFor={list_data.color}></label>
                        </div>
                      )) : null}

                    </div>
                  </div>
                  <div className="product-size">
                    <h4 className="shop-product-title">{pageData.size_title}</h4>
                    <div className="filter-color-wrap">
                      {pageData.size_list && pageData.size_list.length > 0 ? pageData.size_list.map((size_data, index) => (
                        <div className="filter-color-futures" key={index}>
                          <input type="checkbox" id={size_data.size_id} />
                          <label className={size_data.class} htmlFor={size_data.size_id}>{size_data.size}</label>
                        </div>
                      )) : null}

                    </div>
                  </div>
                  <div className="product-quantity">
                    <h4 className="shop-product-title">{pageData.quantity}</h4>
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
                          <Link href="" onClick={() => { addToWishlist(pageData); }}>
                            <i className={isInWishlist(pageData) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product-cart-buy-now">
                    <Link href="/shipping" className="btn btn-primary">{pageData.buy_button}</Link>
                    <Link href="" className="btn btn-primary add-to-cart"  onClick={(e) => { e.preventDefault(); add_cart(pageData, quantity); handel_mini_cart_DropDowon(); }} id="mini-cart-dropdown">{pageData.cart_button}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Single-Product End --> */}

        {/* <!-- Tabs Start --> */}
        <div className="tabs-part">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="tab-wrapper">
                                    <ul className="nav tabs">
                                        {pageData.tabs && pageData.tabs.map((tab_data, index) => (
                                            <li className={`nav-item tab-link ${Tab_Entry === tab_data ? "current" : ''}`} data-tab="tab-1" key={index} onClick={() => setTab_Entry(tab_data)}>
                                                <Link className={`nav-link ${Tab_Entry === tab_data ? "active" : ''}`} aria-current="page" href="">{tab_data}</Link>
                                            </li>
                                        ))}

                                    </ul>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "Discription" ? "current" : ""}`} data-tab="tab-1"></h3>
                                    <div id="tab-1" className={`tab-content ${Tab_Entry === "Discription" ? "current" : ""}`}>
                                        <div className="tab-description">
                                            <div className="discription-details">
                                                <p>
                                                    {pageData.detail}
                                                </p>
                                            </div>
                                            <div className="sample-unordered-list">
                                                <h4>{pageData.unorderlist_title}</h4>
                                                <ul>
                                                    {pageData.unorder_list && pageData.unorder_list.length > 0 ? pageData.unorder_list.map((list_data, index) => (
                                                        <li key={index}>{list_data}</li>
                                                    )) : null}

                                                </ul>
                                            </div>
                                            <div className="sample-unordered-list">
                                                <h4>{pageData.orderlist_title}</h4>
                                                <ul>
                                                    {pageData.order_list && pageData.order_list.length > 0 ? pageData.order_list.map((list_data, index) => (
                                                        <li key={index}>{list_data}</li>
                                                    )) : null}

                                                </ul>
                                            </div>
                                            <div className="sample-paragraph-text">
                                                <h4>{pageData.paragraph_text_title}</h4>
                                                <p>
                                                    {pageData.paragraph_text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "Reviews" ? "current" : ""}`} data-tab="tab-2"></h3>
                                    <div id="tab-2" className={`tab-content ${Tab_Entry === "Reviews" ? "current" : ""}`}>
                                        <div className="tab-additional-information">

                                            <div className="sample-paragraph-text">
                                                <h4>{pageData.paragraph_text_title}</h4>
                                                <p>
                                                    {pageData.paragraph_text}
                                                </p>
                                            </div>
                                            <div className="discription-details"></div>
                                            <p>
                                                {pageData.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{pageData.unorderlist_title}</h4>
                                            <ul>
                                                {pageData.unorder_list && pageData.unorder_list.length > 0 ? pageData.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`nav-item tab-link ${Tab_Entry === "Compares" ? "current" : ""}`} data-tab="tab-3"></h3>
                                <div id="tab-3" className={`tab-content ${Tab_Entry === "Compares" ? "current" : ""}`}>
                                    <div className="tab-reviews">
                                        <div className="discription-details">
                                            <p>
                                                {pageData.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{pageData.unorderlist_title}</h4>
                                            <ul>
                                                {pageData.unorder_list && pageData.unorder_list.length > 0 ? pageData.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{pageData.orderlist_title}</h4>
                                            <ul>
                                                {pageData.order_list && pageData.order_list.length > 0 ? pageData.order_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`nav-item tab-link ${Tab_Entry === "Shipping" ? "current" : ""}`} data-tab="tab-4"></h3>
                                <div id="tab-4" className={`tab-content ${Tab_Entry === "Shipping" ? "current" : ""}`}>
                                    <div className="tab-reviews">
                                        <div className="discription-details">
                                            <p>
                                                {pageData.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{pageData.unorderlist_title}</h4>
                                            <ul>
                                                {pageData.unorder_list && pageData.unorder_list.length > 0 ? pageData.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
    </>
  );
}
