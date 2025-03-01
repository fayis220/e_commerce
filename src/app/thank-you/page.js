'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Page() {
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <SeoData />
            <div className='site-content'>
                <Breadcrumbs />

                <div className="shopping-order">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="thank-you shopping-order-wrapper">
                                    <div className="shopping-cart" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1500">
                                        <div className="shopping-cart-box">
                                            <h2 className="title">1</h2>
                                        </div>
                                        <div className="shopping-cart-title">
                                            <h6>Shopping Cart</h6>
                                            <p>Manager your items</p>
                                        </div>
                                    </div>
                                    <div className="shopping-cart" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1500">
                                        <div className="shopping-cart-box">
                                            <h2 className="title">2</h2>
                                        </div>
                                        <div className="shopping-cart-title">
                                            <h6>Shipping</h6>
                                            <p>Manager your items</p>
                                        </div>
                                    </div>

                                    <div className="thank-you" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1500">
                                        <div className="shopping-cart-box completed-orders-box">
                                            <h2 className="title">3</h2>
                                        </div>
                                        <div className="shopping-cart-title">
                                            <h6>Complete Order</h6>
                                            <p>Manager your items</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="wishlist">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className='card'>
                                    <div><h4 className="fa-solid fa-thumbs-up m-2"></h4> Thank you. Your order has been received.</div>
                                </div>

                                <div className="wishlist-wrap">
                                    <div className="row mb-5 mt-5">
                                        <div className="col-6 col-md-6 col-lg-3">
                                            <div className="order-payment-method">
                                                <h6>Order number:</h6>
                                                <h5>6201</h5>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-3">
                                            <div className="order-payment-method">
                                                <h6>Date:</h6>
                                                <h5>February 4, 2023</h5>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-3">
                                            <div className="order-payment-method">
                                                <h6>Total:</h6>
                                                <h5>$208.00</h5>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-3">
                                            <div className="order-payment-method">
                                                <h6>Payment method:</h6>
                                                <h5>Direct bank transfer</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3>Order details</h3>
                                <div className="wishlist-wrapper" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="cart-product">
                                                        <div className="cart-thumb">
                                                            <Link href=""><Image src="/image/shop1.png" width={50} height={65} alt="blog img 1" /></Link>

                                                        </div>
                                                        <div className="cart-product-title ms-5" >
                                                            <h6 >Round cheir Edition</h6>
                                                            <p>Qty : 1</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>$22.22</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="cart-product">
                                                        <div className="cart-thumb">
                                                            <Link href=""><Image src="/image/shop1.png" width={50} height={65} alt="blog img 1" /></Link>
                                                        </div>
                                                        <div className="cart-product-title ms-5">
                                                            <h6>Round cheir Edition</h6>
                                                            <p>Qty : 1</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="cart-product-title">$22.22</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className='cart-product'>Subtotal</div>
                                                </td>
                                                <td><span>$66.88</span></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className='cart-product'>Shipping</div>

                                                </td>
                                                <td><span>Free Shipping</span></td>
                                            </tr>
                                            <tr>
                                                <td><div className='cart-product'><strong>Total</strong></div></td>
                                                <td><strong>$66.88</strong></td>
                                            </tr>

                                        </tbody>


                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}
