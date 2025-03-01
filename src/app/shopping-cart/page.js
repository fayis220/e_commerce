'use client'
import { useState, useEffect } from 'react'
import Image from "next/image";
import { useCart } from "react-use-cart";
import Loader from '@/components/Loader';
import Breadcrumbs from '@/components/Breadcrumbs';
import UseFetchData from '@/hook/usegetdata';
import themeConfig from '@/config/themeConfig';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SeoData from '@/components/HeadMeta';

const Page = () => {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.shoppingcart_url);


    const validationSchema = Yup.object().shape({
        couponCode: Yup.string()
            .required('Coupon code is required')
            .max(5, 'Coupon code must be at least 5 characters'),

    });

    // Initialize the form
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log("Coupon code applied:", data.couponCode);
        // Add your coupon application logic here
        reset();
    };
    const [isMounted, setIsMounted] = useState(false);
    const {
        emptyCart,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal
    } = useCart();



    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <>
            <SeoData title={data.title} />
            <div className="site-content">
                <Breadcrumbs />

                {/* <!-- Shopping-Order Start --> */}
                <div className="shopping-order">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="shopping-order-wrapper">
                                    {data.shopping_order_list && data.shopping_order_list.length > 0 ? data.shopping_order_list.map((list_data, index) => (
                                        <div className={list_data.class} data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1500" key={index}>
                                            <div className={list_data.sub_class}>
                                                <h2 className="title">{list_data.sign}</h2>
                                            </div>
                                            <div className={list_data.title_class}>
                                                <h6>{list_data.title}</h6>
                                                <p>{list_data.label}</p>
                                            </div>
                                        </div>
                                    )) : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wishlist">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wishlist-wrapper">
                                    {totalUniqueItems === 0 ? (<>
                                        <div className="text-center shopping-btn"  >

                                            <h5 className="text-center mt-4"> Your cart is empty </h5>
                                            <Link href="/shop" className="btn btn-primary mt-3 ">Continue Shopping</Link>

                                        </div>
                                    </>
                                    ) : <>
                                        <div className="wishlist-wrap" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        {data.table_head && data.table_head.map((list_data, index) => (
                                                            <th key={index}>{list_data}</th>

                                                        ))}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, id) => (
                                                        <tr key={id}>
                                                            <td>
                                                                <div className="wishlist-product-wrap">
                                                                    <div className="wishlist-product-img img-cover">
                                                                        <Image src={item.image ? item.image : themeConfig.no_found_image} width={65} height={100} alt="" />
                                                                    </div>
                                                                    <div className="wishlist-product-details">
                                                                        <h5>{item.title}</h5>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="wishlist-price">
                                                                    <h5>${item.price}</h5>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="quantity">
                                                                    <div className="plus-minus-input">
                                                                        <input className="input-group-field" type="number" name="quantity"
                                                                            value={item.quantity}
                                                                            onChange={e => e.target.value} readOnly />
                                                                        <div className="input-group-button button-minus">
                                                                            <button type="button" className="button hollow circle"
                                                                                data-quantity="minus" data-field="quantity" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}>
                                                                                <i className="fas fa-chevron-down"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="input-group-button button-plus">
                                                                            <button type="button" className="button hollow circle"
                                                                                data-quantity="plus" data-field="quantity" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}>
                                                                                <i className="fas fa-chevron-up"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </td>
                                                            <td>
                                                                <div className="total-price">
                                                                    <h5>${financial(item.price * item.quantity)}</h5>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="trash-icon">
                                                                    <Link href="" onClick={() => removeItem(item.id)}><i className="fas fa-trash-alt"></i></Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="btn-wrap " data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500" >
                                            {data.buttons.map((button, index) => {
                                                if (button.onClick) {
                                                    return (
                                                        <button key={index} className="btn btn-primary mt-3" onClick={emptyCart}>
                                                            {button.label}
                                                        </button>
                                                    );
                                                }
                                                return (
                                                    <Link key={index} href={button.href} className="btn btn-primary">
                                                        {button.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        <div className="shopping-cart-wrap" data-aos="fade-up" data-aos-delay="200"
                                            data-aos-duration="1500">

                                            <div className="discount-code">
                                                <h2 className="title">{data.discount_title}</h2>
                                                <div className="coupen-code-box">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <input   {...register('couponCode')} type="text" className="form-control" placeholder="" />
                                                        {errors.couponCode && <div className="text-danger">{errors.couponCode.message}</div>}
                                                        <button type='sunbit' className="btn btn-primary">{data.discount_btn}</button>
                                                    </form>
                                                </div>
                                                <p>{data.discount_label}</p>
                                            </div>
                                            <div className="cart-order-summery">
                                                <div className="sub-total">
                                                    <h6>{data.sub_total}</h6>
                                                    <h6>$ {financial(cartTotal)} /-</h6>
                                                </div>
                                                <div className="grand-total">
                                                    <h3>{data.sub_total}</h3>
                                                    <h3>$ {financial(cartTotal)} /-</h3>
                                                </div>
                                                <p>{data.label}</p>
                                                <Link href="/shipping" className="btn btn-primary">{data.checkout_btn}</Link>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Wishlist End --> */}
            </div>
        </>
    )
}
export default Page