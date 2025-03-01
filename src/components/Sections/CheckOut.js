import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCart } from 'react-use-cart'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function CheckOut({ data }) {
    const { totalUniqueItems } = useCart();
    const router = useRouter(); // Initialize the router

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required')
            .matches(/\S+@\S+\.\S+/, 'Enter a valid email'),
        firstName: Yup.string().required('Enter First Name'),
        lastName: Yup.string().required('Enter Last Name'),
        streetAddress: Yup.string().required('Enter Address'),
        apartmentaddress: Yup.string().required('Enter Apartment Address'),
        pinCode: Yup.string()
            .required('Enter Pincode')
            .matches(/^\d{6}$/, 'Must be exactly 6 digits'),
        state: Yup.string().required('Select State'),
        city: Yup.string().required('Select City'),
        country: Yup.string().required('Select Country'),
        note: Yup.string().required('Enter a Note')
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [submitMessage, setSubmitMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (data) => {
        console.log(data);

        setSubmitMessage('Your order is being processed, and you will receive a confirmation email shortly.'); // Success message
        setSubmitted(true); // Set submitted state to true
        reset();
        // Redirect to the Thank You page
        setTimeout(() => {
            router.push('thank-you'); // Redirect to home page
        }, 3000); // 3 seconds delay
    };

    const handleFocus = () => {
        setSubmitMessage(''); // Clear the message on focus
        setSubmitted(false); // Reset submitted state

    };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>

            {totalUniqueItems === 0 ? (
                <>
                    <div className="wishlist">
                        <div className="text-center shopping-btn"  >

                            <h5 className="text-center mt-4"> Your cart is empty </h5>
                            <Link href="/shop" className="btn btn-primary mt-3 ">Continue Shopping</Link>
                        </div>
                    </div>
                </>
            ) : <>
                <div className="shopping-order shipping-order">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">.
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


                <div className="shipping">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {submitted && (
                                <div className="alert alert-success" role="alert">
                                    {submitMessage}
                                </div>
                            )}
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="shipping-left" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1500">
                                        <div className="contact-inforation">
                                            <h2 className="title">Contact Inforation</h2>
                                            <div className="form-details">
                                                <form>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" placeholder="email or phone no."   {...register('email')} onFocus={handleFocus}
                                                        />
                                                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="shipping-details">
                                            <h2 className="title">Shipping Details</h2>
                                            <div className="form-details">
                                                <form>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <input type="text" className="form-control" placeholder="First Name"   {...register('firstName')} onFocus={handleFocus} />
                                                            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}

                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <input type="text" className="form-control" placeholder="Last Name"  {...register('lastName')} onFocus={handleFocus}
                                                            />
                                                            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control"
                                                            placeholder="Apartments , suite , etc. "  {...register('apartmentaddress')} onFocus={handleFocus}
                                                        />
                                                        {errors.apartmentaddress && <span className="text-danger">{errors.apartmentaddress.message}</span>}
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                                                            cols="5" placeholder="Street Address" {...register('streetAddress')} onFocus={handleFocus}
                                                        />
                                                        {errors.streetAddress && <span className="text-danger">{errors.streetAddress.message}</span>}
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">   
                                                            <input type="text" className="form-control" placeholder="Pin Code" {...register('pinCode')} onFocus={handleFocus}
                                                            />
                                                            {errors.pinCode && <span className="text-danger">{errors.pinCode.message}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <select className="form-select" aria-label="Default select example"  {...register('state')} onFocus={handleFocus}
                                                            >
                                                                {data.state_list && data.state_list.length > 0 ? data.state_list.map((list_data, index) => (
                                                                    <option value={list_data} key={index}>{list_data}</option>
                                                                )) : null}

                                                            </select>
                                                            {errors.state && <span className="text-danger">{errors.state.message}</span>}

                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <select className="form-select" aria-label="Default select example"  {...register('city')} onFocus={handleFocus}
                                                            >
                                                                {data.city_list && data.city_list.length > 0 ? data.city_list.map((list_data, index) => (

                                                                    <option value={list_data} key={index}>{list_data}</option>
                                                                )) : null}


                                                            </select>
                                                            {errors.city && <span className="text-danger">{errors.city.message}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <select className="form-select" aria-label="Default select example"{...register('country')} onFocus={handleFocus}
                                                            >
                                                                {data.country_list && data.country_list.length > 0 ? data.country_list.map((list_data, index) => (

                                                                    <option value={list_data} key={index}>{list_data}</option>
                                                                )) : null}


                                                            </select>
                                                            {errors.country && <span className="text-danger">{errors.country.message}</span>}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="shipping-right" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1500">
                                        <div className="order-summery">
                                            <h2 className="title">Order Summery</h2>
                                            <div className="form-details">
                                                <form>
                                                    <div className="form-group">
                                                        <textarea className="form-control" id="exampleFormControlTextarea2" rows="5"
                                                            cols="5" placeholder="Add A Note To Your Order"  {...register('note')} onFocus={handleFocus}
                                                        />
                                                        {errors.note && <span className="text-danger">{errors.note.message}</span>}
                                                    </div>
                                                </form>
                                                <button type="submit" className="btn btn-primary">Submit</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>

            </>}
        </>
    )
}
