'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import Loader from '@/components/Loader'
import BlogDetail from '@/components/Sections/BlogDetail';
import SeoData from '@/components/HeadMeta';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('E-mail Address is required'),
    phone: Yup.string().required('Phone No. is required'),
    message: Yup.string().required('Message is required'),
});

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.blog_details_url);

    const formRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(formRef.current);
        const values = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        // Validate using Yup
        try {
            await validationSchema.validate(values, { abortEarly: false });
            console.log('Form data:', values);
            // Handle successful form submission here
            formRef.current.reset();

            setErrors({});
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <SeoData title={data.page_data}/>
            <div className="site-content">
                <Breadcrumbs />

                <BlogDetail data={data} />
            </div>
        </>
    )
}
