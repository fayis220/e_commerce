'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '@/components/Breadcrumbs';
import UseFetchData from '@/hook/usegetdata';
import themeConfig from '@/config/themeConfig';
import Loader from '@/components/Loader';
import SeoData from '@/components/HeadMeta';

const schema = yup.object().shape({
    email: yup.string()
        .email('Email is not valid.')
        .required('Email is required')
        .matches(/\S+@\S+\.\S+/, 'Enter a valid email'),

});

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.signinup_url);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [submitMessage, setSubmitMessage] = useState('');

    const onSubmit = (data) => {
        console.log(data);

        setSubmitMessage('You will receive a password reset link shortly.');

        // Reset the form fields
        reset();
    };

    const handleFocus = () => {
        setSubmitMessage(''); // Clear the message on focus
    };
    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <SeoData title={data.page} />
            <div className="site-content">
                <Breadcrumbs />
                <div className="sign-in">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="sign-in-wrapper">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="sign-in-img img-cover">
                                                <Image src={data.image ? data.image : themeConfig.no_found_image} width={620} height={533} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="sign-in-form-details" data-aos="fade-up" data-aos-delay="100"
                                                data-aos-duration="1500">
                                                <h2 className="title">Forgot Password</h2>
                                                <div className="form-details">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        {submitMessage && (
                                                            <div className="alert alert-success" role="alert">
                                                                You will receive a password reset link shortly.
                                                            </div>
                                                        )}
                                                        <div className="form-row">
                                                            <div className="form-group col-12">
                                                                <input type="email" className="form-control"
                                                                    placeholder="Enter your username or email" {...register('email')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="account-sign-up">
                                                            <p>{data.detail}<Link href="/sign-up">Sign up</Link></p>
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
