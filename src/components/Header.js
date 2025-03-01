"use client";
import themeConfig from "@/config/themeConfig";
import UseFetchData from "@/hook/usegetdata";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import Loader from "./Loader";

export default function Header() {
  const { data, isLoading, error } = UseFetchData(themeConfig.api.header_url);
  const [mini_cart_DropDowon, SetMini_cart_DropDowon] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFixed, setIsFixed] = useState();
  const router = useRouter();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState(null);
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  // Update localStorage whenever the search term changes
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  // Update search term based on URL changes
  useEffect(() => {
    const url = new URL(window.location);
    const currentSearchTerm = url.pathname.split("/search/")[1];
    if (currentSearchTerm) {
      setSearchTerm(decodeURIComponent(currentSearchTerm.replace(/-/g, " ")));
    } else {
      setSearchTerm(""); // Clear search term if URL does not contain a search term
    }
  }, []); // Listen for changes in the URL path

  const Search_Form = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim().replace(/\s+/g, "-");
    if (trimmedSearchTerm === "") {
      router.push("/search");
    } else {
      router.push(
        `/search/${encodeURIComponent(trimmedSearchTerm.toLowerCase())}`
      );
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handel_mini_cart_DropDowon = () => {
    SetMini_cart_DropDowon((prevChange) => !prevChange);
    document.querySelector("body").classList.add("minicart-open");
  };

  const handleremoveToCart = (e, item) => {
    e.preventDefault();
    removeItem(item.id);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newValue = !prev;

      if (newValue) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
      return newValue;
    });
  };

  const { items, totalUniqueItems, updateItemQuantity, removeItem } = useCart();

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handelSearchbar = () => {
    setSearchbar((prevSearch) => !prevSearch);
  };

  const handleDropdownToggle = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <header className={`main-header ${isFixed === true ? "sticky" : ""}`}>
        <div
          className="overflow"
          onClick={() => {
            handel_mini_cart_DropDowon(),
              document.querySelector("body").classList.remove("minicart-open");
          }}
        ></div>
        {/* <div className="container">
          <div className="header-wrapper">
            <div className="topbar">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={
                      data.logo_image
                        ? data.logo_image
                        : themeConfig.no_found_logo
                    }
                    width={data.width}
                    height={data.height}
                    alt=""
                  />
                </Link>
              </div>
              <div className="header-search-bar">
                <form
                  className="input-group"
                  onSubmit={Search_Form}
                  id="search-forms"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail2"
                    placeholder="Search for products...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="header-button-right">
                <div className="header-button search-form-wrap">
                  <Link
                    className="search-icon"
                    href=""
                    onClick={() => handelSearchbar()}
                  >
                    <Image
                      src={
                        data.search_icon
                          ? data.search_icon
                          : themeConfig.no_found_image
                      }
                      width={22}
                      height={23}
                      alt="search"
                    />
                  </Link>
                  <div
                    className={`search-form ${
                      searchbar === true ? "search-open" : ""
                    }`}
                  >
                    <form
                      className="input-group"
                      onSubmit={Search_Form}
                      id="search-forms"
                    >
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-search"></i>
                      </button>
                    </form>
                    <Link
                      className="search-close"
                      href=""
                      onClick={() => handelSearchbar()}
                    >
                      {" "}
                      <i className="fas fa-times"></i>
                    </Link>
                  </div>
                </div>
                <div className="header-button">
                  {data.list_button &&
                    data.list_button.map((list_data, index) => (
                      <Link
                        href={list_data.link}
                        className={list_data.class}
                        key={index}
                      >
                        <Image
                          src={
                            list_data.image
                              ? list_data.image
                              : themeConfig.no_found_image
                          }
                          width={list_data.width}
                          height={list_data.height}
                          alt="user icon"
                        />
                      </Link>
                    ))}
                </div>

                <div className="header-button">
                  <button
                    name="cart"
                    className="cart-icon"
                    onClick={() => handel_mini_cart_DropDowon()}
                  >
                    <Image
                      src={
                        data.cart_icon
                          ? data.cart_icon
                          : themeConfig.no_found_image
                      }
                      width={20}
                      height={20}
                      alt="cart icon"
                    />
                  </button>
                </div>
                <div className="header-button toggle-btn">
                  <Link
                    href=""
                    onClick={toggleMenu}
                    className={isMenuOpen ? "menu-active" : ""}
                  >
                    <Image
                      src={
                        data.toggle_menu_icon
                          ? data.toggle_menu_icon
                          : themeConfig.no_found_image
                      }
                      width={16}
                      height={10}
                      alt="toggle-icon"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="header-navbar">
          <div className="container">
            <div
              className={`header-bottom ${isMenuOpen ? "left-menu-open" : ""}`}
            >
              <div className="mobile-brand">
                <div className="site-brand">
                  <Link href="/">
                    <Image
                      src={
                        data.logo_image
                          ? data.logo_image
                          : themeConfig.no_found_logo
                      }
                      width={153}
                      height={35}
                      alt="logo"
                    />
                    {/* <Image src={themeConfig.no_found_logo} width={153} height={35} alt="logo" /> */}
                  </Link>
                </div>
                <div className="toggle-btn close-btn">
                  <Link
                    href=""
                    className={`active ${isMenuOpen ? "menu-active" : ""}`}
                    onClick={toggleMenu}
                  >
                    <i className="fa fa-times"></i>
                  </Link>
                </div>
              </div>

              <div className="logo">
                <Link href="/">
                  <Image
                    src={
                      data.logo_image
                        ? data.logo_image
                        : themeConfig.no_found_logo
                    }
                    width={data.width}
                    height={data.height}
                    alt=""
                  />
                </Link>
              </div>

              <div className="header-menu">
                {/* {JSON.stringify(data.logo_image)}ddasdasdasdsd */}
                <ul>
                  {data.header_menu &&
                    data.header_menu.map((header_data, index) => {
                      return (
                        <li
                          className={`${header_data.class}`}
                          key={index}
                          onClick={() => {
                            handleDropdownToggle(header_data.title);
                          }}
                        >
                          <Link
                            href={header_data.slug}
                            className={
                              pathname === header_data.slug ? "active" : ""
                            }
                          >
                            {header_data.title}
                            <i
                              className={`fas ${
                                header_data.class ? "fa-chevron-down" : ""
                              }`}
                            ></i>
                            {isMenuOpen && (
                              <span
                                className={`caret-arrow ${
                                  isMenuOpen ? "sub-active" : ""
                                }`}
                              ></span>
                            )}
                          </Link>

                          {header_data.sub_menu &&
                            header_data.sub_menu.length > 0 && (
                              <ul
                                className={`sub-menu ${
                                  isMenuOpen ? "main-sub-menu" : ""
                                } `}
                                style={{
                                  display:
                                    activeDropdown === header_data.title
                                      ? "block"
                                      : "none",
                                }}
                                onClick={toggleMenu}
                              >
                                {header_data.sub_menu.map(
                                  (sub_menu_data, index) => (
                                    <li
                                      className={`menu-item ${
                                        isMenuOpen ? "sub-active" : ""
                                      }`}
                                      key={index}
                                    >
                                      <Link
                                        href={sub_menu_data.slug}
                                        className={
                                          pathname === sub_menu_data.slug
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        {sub_menu_data.title}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="header-icon">
                <Link href="/gallery">Explore</Link>
              </div>

              <div className="menu-social">
                <Link href="/sign-in">Sign-in</Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- mini cart dropdown --> */}
        <div
          id="mini-cart-dropdown"
          className={`mini-cart-dropdown ${
            mini_cart_DropDowon === true ? "open" : ""
          }`}
        >
          {/* <!-- mini cart close --> */}
          <div
            className="mini-cart-close"
            onClick={() => {
              handel_mini_cart_DropDowon();
              document.querySelector("body").classList.remove("minicart-open");
            }}
          >
            <Link
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <i className="fas fa-xmark"></i>
            </Link>
          </div>

          <div className="cart-dropdown-wrapper">
            {/* <!-- Order summary --> */}
            <div className="order-summary">
              <h3 className="account-title">Cart</h3>
              {totalUniqueItems === 0 ? (
                <>
                  <div className="text-center shopping-btn">
                    <h5 className=" mt-4"> Your cart is empty </h5>
                    <Link
                      href="/shop"
                      className=" text-center btn btn-primary mt-4"
                      onClick={() => {
                        handel_mini_cart_DropDowon();
                        document
                          .querySelector("body")
                          .classList.remove("minicart-open");
                      }}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="summary-product-list">
                    {items &&
                      items.map((item_data, index) => {
                        return (
                          <div
                            className="cart-product cart-summary-product"
                            key={index}
                          >
                            <div className="cart-thumb">
                              <Link href="single-product">
                                {" "}
                                <Image
                                  src={
                                    item_data.image
                                      ? item_data.image
                                      : themeConfig.no_found_image
                                  }
                                  width={70}
                                  height={70}
                                  alt="img_1"
                                />{" "}
                              </Link>
                            </div>
                            <div className="cart-product-title">
                              <div className="remove">
                                <Link
                                  href=""
                                  onClick={(e) =>
                                    handleremoveToCart(e, item_data)
                                  }
                                >
                                  <i className="fas fa-xmark"></i>
                                </Link>
                              </div>
                              <h6>
                                <Link href="/single-product">
                                  {item_data.title}
                                </Link>{" "}
                              </h6>
                              <div className="product-qty variation-quantity">
                                <div className="quantity">
                                  <div className="plus-minus-input">
                                    <input
                                      className="input-group-field"
                                      type="number"
                                      name="quantity"
                                      value={item_data.quantity}
                                      onChange={(e) => e.target.value}
                                      min="0"
                                      readOnly
                                    />
                                    <div className="input-group-button button-minus">
                                      <button
                                        type="button"
                                        className="button hollow circle"
                                        data-quantity="minus"
                                        data-field="quantity"
                                        onClick={() =>
                                          updateItemQuantity(
                                            item_data.id,
                                            (item_data.quantity ?? 0) - 1
                                          )
                                        }
                                      >
                                        <i className="fas fa-chevron-down"></i>
                                      </button>
                                    </div>
                                    <div className="input-group-button button-plus">
                                      <button
                                        type="button"
                                        className="button hollow circle"
                                        data-quantity="plus"
                                        data-field="quantity"
                                        onClick={() =>
                                          updateItemQuantity(
                                            item_data.id,
                                            (item_data.quantity ?? 0) + 1
                                          )
                                        }
                                      >
                                        <i className="fas fa-chevron-up"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="price">
                                  $
                                  {financial(
                                    item_data.quantity * item_data.price
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* <!-- mini cart button--> */}
                  <div className="mini-cart-buttons">
                    <Link
                      href="/shopping-cart"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        handel_mini_cart_DropDowon();
                        document
                          .querySelector("body")
                          .classList.remove("minicart-open");
                      }}
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/shop"
                      className="btn btn-primary"
                      onClick={() => {
                        handel_mini_cart_DropDowon();
                        document
                          .querySelector("body")
                          .classList.remove("minicart-open");
                      }}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <!-- end mini cart dropdown --> */}
      </header>
    </>
  );
}
