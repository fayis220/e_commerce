'use client'
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
export default function ContactForm({ data }) {
    const formRef = useRef();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required.'),
        email: Yup.string()
            .email('Email is not valid.')
            .required('Email is required.').matches(/\S+@\S+\.\S+/, 'Enter a valid email'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Enter valid Phone Number.')
            .required('Phone Number is required.'),
        subject: Yup.string().required('Subject is required.'),
        message: Yup.string().required('Message is required.')
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: undefined 
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false });
           
            console.log('Form submitted:', formData);
            setSubmitted(true);

            // Reset the form data
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setErrors({});
        } catch (validationErrors) {
            const newErrors = {};
            validationErrors.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    const handleFocus = () => {
        setSubmitted(false);
    };

    return (
        data ?
            <>
                <div className="get-in-touch">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="get-in-touch-wrapper" data-aos="fade-up" data-aos-delay="100"
                                    data-aos-duration="1500">
                                    <div className="section-title">
                                        <div className="title-wrap">
                                            <h2 className="title">{data.title}</h2>
                                        </div>
                                        <p>{data.label}</p>
                                    </div>
                                    <div className="form-details">

                                        {submitted && (
                                            <div className="alert alert-success" role="alert">
                                                Thank you for contacting us! We will get back to you shortly.
                                            </div>
                                        )}
                                        <form ref={formRef} onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Full Name"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                    />
                                                    {errors.fullName && <div className="error text-danger">{errors.fullName}</div>}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="E-mail Address"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                    />
                                                    {errors.email && <div className="error text-danger">{errors.email}</div>}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Phone No."
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                    />
                                                    {errors.phone && <div className="error text-danger">{errors.phone}</div>}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Subject"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        onFocus={handleFocus}
                                                    />
                                                    {errors.subject && <div className="error text-danger">{errors.subject}</div>}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    type="textarea"
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="10"
                                                    cols="5"
                                                    placeholder="Message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    onFocus={handleFocus}
                                                ></textarea>
                                                {errors.message && <div className="error text-danger">{errors.message}</div>}
                                            </div>
                                            <button type='submit' className="btn btn-primary">Send Message</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-us">
                    <div className="container-fluid">
                        <div className="row">

                            {data.contact_list && data.contact_list.length > 0 ? data.contact_list.map((item, index) => (
                                <div className="col-12 col-md-6 col-xl-3" key={index}>
                                    <div className="contact-us-wrap" data-aos="fade-up" data-aos-delay={item.dataAosDelay} data-aos-duration="1500">
                                        <div className="contact-us-icon">
                                            <i className={item.icon}></i>
                                        </div>
                                        <div className="contact-us-details">
                                            {item.type === "phone" ? (
                                                item.details.map((phoneDetail, phoneIndex) => (
                                                    <Link key={phoneIndex} href={`tel:${phoneDetail.number}`}>
                                                        {phoneDetail.number} ({phoneDetail.time})
                                                    </Link>
                                                ))
                                            ) : item.type === "email" ? (
                                                item.details.map((email, emailIndex) => (
                                                    <Link key={emailIndex} href={`mailto:${email}`}>
                                                        {email}
                                                    </Link>
                                                ))
                                            ) : Array.isArray(item.details) ? (
                                                item.details.map((detail, detailIndex) => (
                                                    <p key={detailIndex}>{detail}</p>
                                                ))
                                            ) : (
                                                <p>{item.details}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )) : null}
                        </div>

                    </div>
                </div>
            </>
            : null
    )
}
