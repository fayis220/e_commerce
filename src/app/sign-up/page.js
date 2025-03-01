// 'use client'
// import React from 'react'
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import Link from 'next/link';
// import Breadcrumbs from '@/components/Breadcrumbs';
// import UseFetchData from '@/hook/usegetdata';
// import themeConfig from '@/config/themeConfig';
// import Loader from '@/components/Loader';
// import Image from 'next/image';
// import SeoData from '@/components/HeadMeta';

// const schema = yup.object().shape({
//     name: yup.string().required('Name is required'),
//     email: yup.string()
//         .email('Email is not valid.')
//         .required('Email is required.').matches(/\S+@\S+\.\S+/, 'Enter a valid email'),

//     phone: yup.string()
//         .required('Phone Number is required.')
//         .matches(/^\d{10}$/, 'Phone Number .'),
//     pinCode: yup.string().required('Pin code is required'),
//     password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// export default function Page() {

//     const { data, isLoading, error } = UseFetchData(themeConfig.api.signinup_url);

//     const { register, handleSubmit, reset, formState: { errors } } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [submitMessage, setSubmitMessage] = useState('');

//     const onSubmit = (data) => {
//         console.log(data);
//         // Handle form submission (e.g., API call)
//         setSubmitMessage('Form submitted successfully!');

//         // Reset the form fields
//         reset();
//     };

//     const handleFocus = () => {
//         setSubmitMessage(''); // Clear the message on focus
//     };

//     if (isLoading) {
//         return <Loader />;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <>
//             <SeoData title={data.signup_title}/>
//             <div className="site-content">
//                 <Breadcrumbs />
//                 <div className="sign-in">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="sign-in-wrapper">
//                                     <div className="row">
//                                         <div className="col-lg-6">
//                                             <div className="sign-in-img img-cover">
//                                                 <Image src={data.image ? data.image : themeConfig.no_found_image} width={620} height={727} alt="" />
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6">
//                                             <div className="sign-in-form-details" data-aos="fade-up" data-aos-delay="100"
//                                                 data-aos-duration="1500">
//                                                 <h2 className="title">{data.signup_title}</h2>
//                                                 <p>{data.label}</p>
//                                                 <div className="form-details">
//                                                     <form onSubmit={handleSubmit(onSubmit)}>
//                                                         <div className="form-row">
//                                                             <div className="form-group col-12">
//                                                                 <input
//                                                                     type="text"
//                                                                     className="form-control"
//                                                                     placeholder="Name"
//                                                                     {...register('name')}
//                                                                     onFocus={handleFocus}
//                                                                 />
//                                                                 {errors.name && <p className="text-danger">{errors.name.message}</p>}
//                                                             </div>
//                                                         </div>
//                                                         <div className="form-row">
//                                                             <div className="form-group col-12">
//                                                                 <input
//                                                                     type="email"
//                                                                     className="form-control"
//                                                                     placeholder="E-mail Address"
//                                                                     {...register('email')}
//                                                                     onFocus={handleFocus}
//                                                                 />
//                                                                 {errors.email && <p className="text-danger">{errors.email.message}</p>}
//                                                             </div>
//                                                         </div>
//                                                         <div className="form-row">
//                                                             <div className="form-group col-md-6">
//                                                                 <input
//                                                                     type="text"
//                                                                     className="form-control"
//                                                                     placeholder="Phone No."
//                                                                     {...register('phone')}
//                                                                     onFocus={handleFocus}
//                                                                 />
//                                                                 {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
//                                                             </div>
//                                                             <div className="form-group col-md-6">
//                                                                 <input
//                                                                     type="text"
//                                                                     className="form-control"
//                                                                     placeholder="Pin Code"
//                                                                     {...register('pinCode')}
//                                                                     onFocus={handleFocus}
//                                                                 />
//                                                                 {errors.pinCode && <p className="text-danger">{errors.pinCode.message}</p>}
//                                                             </div>
//                                                         </div>
//                                                         <div className="form-row">
//                                                             <div className="form-group col-12">
//                                                                 <input
//                                                                     type="password"
//                                                                     className="form-control"
//                                                                     placeholder="Password"
//                                                                     {...register('password')}
//                                                                     onFocus={handleFocus}
//                                                                 />
//                                                                 {errors.password && <p className="text-danger">{errors.password.message}</p>}
//                                                             </div>
//                                                         </div>
//                                                         {submitMessage && <p className="text-success">{submitMessage}</p>}
//                                                         <div className="account-sign-up">
//                                                             <p>{data.signin_link}<Link href="sign-in">{data.sign_in_title}</Link></p>
//                                                             <button type="submit" className="btn btn-primary">{data.signup_title}</button>
//                                                         </div>
//                                                     </form>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }
'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import UseFetchData from '@/hook/usegetdata';
import themeConfig from '@/config/themeConfig';
import Loader from '@/components/Loader';
import Image from 'next/image';
import SeoData from '@/components/HeadMeta';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string()
        .email('Email is not valid.')
        .required('Email is required.').matches(/\S+@\S+\.\S+/, 'Enter a valid email'),
    phone: yup.string()
        .required('Phone Number is required.')
        .matches(/^\d{10}$/, 'Phone Number must be 10 digits'),
    pinCode: yup.string().required('Pin code is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function Page() {
    const router = useRouter();
    const { data, isLoading, error } = UseFetchData(themeConfig.api.signinup_url);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [submitted, setSubmitted] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const onSubmit = async (data) => {
        console.log(data);
        try {
            // Handle form submission (e.g., API call)
            // await api.post('/signup', data);
            setSubmitMessage('Registration successful! ');
            setSubmitted(true);

            // Reset the form fields
            reset();

            // Redirect to sign-in page after a delay
            setTimeout(() => {
                router.push('/sign-in');
            }, 2000); // 2 seconds delay
        } catch (error) {
            console.error('Registration failed:', error);
            setSubmitMessage('Registration failed. Please try again.');
            setSubmitted(false);
        }
    };

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
            <SeoData title={data.signup_title} />
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
                                                <Image src={data.image ? data.image : themeConfig.no_found_image} width={620} height={727} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="sign-in-form-details" data-aos="fade-up" data-aos-delay="100"
                                                data-aos-duration="1500">
                                                <h2 className="title">{data.signup_title}</h2>
                                                <p>{data.label}</p>
                                                <div className="form-details">
                                                    {submitted && (
                                                        <div className="alert alert-success" role="alert">
                                                            {submitMessage}
                                                        </div>
                                                    )}
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="form-row">
                                                            <div className="form-group col-12">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Name"
                                                                    {...register('name')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                                            </div>
                                                        </div>
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
                                                        <div className="form-row">
                                                            <div className="form-group col-md-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Phone No."
                                                                    {...register('phone')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Pin Code"
                                                                    {...register('pinCode')}
                                                                    onFocus={handleFocus}
                                                                />
                                                                {errors.pinCode && <p className="text-danger">{errors.pinCode.message}</p>}
                                                            </div>
                                                        </div>
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
                                                        <div className="account-sign-up">
                                                            <p>{data.signin_link}<Link href="sign-in">{data.sign_in_title}</Link></p>
                                                            <button type="submit" className="btn btn-primary">{data.signup_title}</button>
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
