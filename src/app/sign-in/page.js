'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Breadcrumbs from '@/components/Breadcrumbs';
import Loader from '@/components/Loader';
import UseFetchData from '@/hook/usegetdata';
import themeConfig from '@/config/themeConfig';
import Image from 'next/image';
import SeoData from '@/components/HeadMeta';
import { useRouter } from 'next/navigation'; // Import useRouter

// Validation schema using Yup
const schema = yup.object().shape({
    email: yup.string()
        .email('Email is not valid.')
        .required('Email is required')
        .matches(/\S+@\S+\.\S+/, 'Enter a valid email'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export default function Page() {
    const router = useRouter(); // Initialize useRouter
    const { data, isLoading, error } = UseFetchData(themeConfig.api.signinup_url);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [submitMessage, setSubmitMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // On form submission
    const onSubmit = async (data) => {
        console.log('Form data:', data);
        setSubmitMessage('Login successful! '); // Success message
        setSubmitted(true); // Set submitted state to true

        // Reset the form fields after submission
        reset();

        // Redirect to home page after a delay
        setTimeout(() => {
            router.push('/'); // Redirect to home page
        }, 2000); // 2 seconds delay
    };

    // Handle input focus to clear the message
    const handleFocus = () => {
        setSubmitMessage(''); // Clear the message on focus
        setSubmitted(false); // Reset submitted state
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <SeoData title={data.sign_in_title} />
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
                                                <Image src={data.image ? data.image : themeConfig.no_found_image} width={626} height={615} alt="Sign in" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="sign-in-form-details" data-aos="fade-up" data-aos-delay="100"
                                                data-aos-duration="1500">
                                                <h2 className="title">{data.sign_in_title}</h2>
                                                <p>{data.label}</p>
                                                <div className="form-details">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        {submitMessage && (
                                                            <div className="alert alert-success" role="alert">
                                                                {submitMessage}
                                                            </div>
                                                        )}
                                                        {/* Email Field */}
                                                        <div className="form-row">
                                                            <div className="form-group col-12">
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    placeholder="E-mail Address"
                                                                    {...register('email')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                            </div>
                                                        </div>

                                                        {/* Password Field */}
                                                        <div className="form-row">
                                                            <div className="form-group col-12">
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    {...register('password')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                            </div>
                                                        </div>

                                                        {/* Remember Me and Forgot Password */}
                                                        <div className="sign-in-remember">
                                                            <div className="remember">
                                                                <input type="checkbox" id="remember" {...register('remember')} onFocus={handleFocus} />
                                                                <label htmlFor="remember">{data.sign_in_remember}</label>
                                                            </div>
                                                            <Link href="forgot-password">Forgot Password?</Link>
                                                        </div>




                                                        {/* Sign In Button */}
                                                        <div className="account-sign-up">
                                                            <p>{data.signin_link}<Link href="sign-up">{data.signup_title}</Link></p>
                                                            <button type="submit" className="btn btn-primary">{data.sign_in_title}</button>
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
    );
}
