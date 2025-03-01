'use client'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Image from 'next/image';
import UseFetchData from '@/hook/usegetdata';
import themeConfig from '@/config/themeConfig';
import Loader from '@/components/Loader';
import SeoData from '@/components/HeadMeta';


const schema = yup.object().shape({
    orderID: yup.string().required('Order ID is required.'),
    email: yup.string()
        .email('Please enter a valid email address.')
        .required('Billing email is required.').matches(/\S+@\S+\.\S+/, 'Enter a valid email'),
});
export default function Page() {

    const { data, isLoading, error } = UseFetchData(themeConfig.api.signinup_url);
    // Setup react-hook-form with Yup validation
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log('Form data:', data);
        // Process the data (e.g., submit to an API)
        reset();
    };
    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div> Error: {error}</div>
    }
    return (
        <>
        <SeoData title={data.page_data}/>
            <div className="site-content">

                <div className="track-order">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 order-last order-lg-first">
                                <form className="track-order-details" data-aos="fade-up" data-aos-delay="100"
                                    data-aos-duration="1500" onSubmit={handleSubmit(onSubmit)}>
                                    <p>
                                       {data.track_label}
                                    </p>
                                    <div className="form-details">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-row">
                                                <div className="form-group col-12">
                                                    <label htmlFor="orderID" className="form-label">Order ID</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="orderID"
                                                        placeholder="Found in your order confirmation email"
                                                        {...register('orderID')}
                                                    />

                                                    {errors.orderID && <p className="text-danger">{errors.orderID.message}</p>}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-12">
                                                    <label htmlFor="billingEmail" className="form-label">Billing Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="billingEmail"
                                                        placeholder="Email you used during checkout"
                                                        {...register('email')}
                                                    />

                                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                </div>
                                            </div>
                                          
                                        </form>
                                    </div>
                                    {/* <Link href="shipping" className="btn btn-primary">Track Order</Link> */}
                                    <button type="submit" className="btn btn-primary">Track Order</button>
                                </form>
                            </div>
                            <div className="col-lg-4 order-first order-lg-last">
                                <div className="track-img" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1500">
                                    <Image src={data.track_order_image ? data.track_order_image : themeConfig.no_found_image} width={403} height={325} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Track-Order End --> */}
            </div>
        </>
    )
}
