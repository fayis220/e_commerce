"use client";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import BlogSideBar from "./BlogSideBar";
import Link from "next/link";
import Image from "next/image";
import themeConfig from "@/config/themeConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required.")
    .matches(/\S+@\S+\.\S+/, "Enter a valid email"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .required("Phone No. is required"),
  message: Yup.string().required("Message is required"),
});

export default function BlogDetail({ data }) {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    setSuccessMessage("Your comment has been sent successfully!");
    reset(); // Reset the form after submission
  };

  const handleFocus = (event) => {
    event.target.classList.add("focused");
    setSuccessMessage(""); // Clear success message on focus
  };

  return (
    <>
      {data ? (
        <div className="blog-details">
          <div className="container">
            <div className="row">
              <BlogSideBar data={data} />
              <div className="col-lg-9">
                <div className="blog-details-right">
                  <div
                    className="blog-details-img"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    data-aos-duration="1500"
                  >
                    <Link href="" className="img-cover">
                      <Image
                        src={
                          data.image ? data.image : themeConfig.no_found_image
                        }
                        width={945}
                        height={444}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="blog-details-right-wrapper">
                    <Link href="">
                      <h2>{data.title}</h2>
                    </Link>
                    <div className="blog-time-date">
                      <div className="blog-time">
                        <p>
                          <i className="far fa-clock"></i>
                          {data.date}
                        </p>
                      </div>
                      <div className="blog-user">
                        <p>
                          <i className="fas fa-user"></i>
                          {data.username}
                        </p>
                      </div>
                    </div>
                    <p>{data.label}</p>
                    <p>{data.detail}</p>
                    <div className="quete-text">
                      <div className="quote-left-icon">
                        <i className="fas fa-quote-left"></i>
                      </div>
                      <p>{data.quote}</p>
                    </div>
                    <div className="latest-fashion-trend">
                      <div className="row align-items-center">
                        <div className="col-md-6 pr-3 pr-md-0">
                          <div
                            className="latest-fashion-img"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                            data-aos-duration="1500"
                          >
                            <Link href="" className="img-cover">
                              <Image
                                src={
                                  data.blog_left_image
                                    ? data.blog_left_image
                                    : themeConfig.no_found_image
                                }
                                width={464}
                                height={320}
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="latest-fashion-details">
                            <h4>{data.title}</h4>
                            <p>{data.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="latest-fashion-trend">
                      <div className="row align-items-center">
                        <div className="col-md-6 order-last order-md-first">
                          <div className="latest-fashion-details">
                            <h4>{data.title}</h4>
                            <p>{data.label}</p>
                          </div>
                        </div>
                        <div className="col-md-6 pl-3 pl-md-0 order-first order-md-last">
                          <div
                            className="latest-fashion-img"
                            data-aos="zoom-in"
                            data-aos-delay="300"
                            data-aos-duration="1500"
                          >
                            <Link href="" className="img-cover">
                              <Image
                                src={
                                  data.blog_right_image
                                    ? data.blog_right_image
                                    : themeConfig.no_found_image
                                }
                                width={464}
                                height={320}
                                alt=""
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>{data.label}</p>
                    <div className="latest-fashion-categories">
                      <div className="fashion-categories-icon">
                        <i className="fas fa-tags"></i>
                      </div>
                      <div className="latest-fashion-categories-wrap">
                        <ul>
                          {data.latest_fashion_categories &&
                          data.latest_fashion_categories.length > 0
                            ? data.latest_fashion_categories.map(
                                (list_data, index) => (
                                  <li key={index}>
                                    <Link href="/gallery">{list_data}</Link>
                                  </li>
                                )
                              )
                            : null}
                        </ul>
                      </div>
                    </div>
                    <div className="what-to-expext">
                      <h4>{data.what_to_title}</h4>
                      <p>{data.what_to_label}</p>
                      <div className="expext-list">
                        <ul>
                          {data.expext_list && data.expext_list.length > 0
                            ? data.expext_list.map((list_data, index) => (
                                <li key={index}>{list_data}</li>
                              ))
                            : null}
                        </ul>
                      </div>
                    </div>
                    <div className="leave-comments">
                      <h3>Leave Comments</h3>
                      <div
                        className="form-details"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="1500"
                      >
                        {/* Display Success Message */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {successMessage && (
                            <div
                              className="alert alert-success mt-3"
                              role="alert"
                            >
                              {successMessage}
                            </div>
                          )}
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                {...register("fullName")}
                                onFocus={handleFocus}
                              />
                              {errors.fullName && (
                                <div className="error text-danger">
                                  {errors.fullName.message}
                                </div>
                              )}
                            </div>
                            <div className="form-group col-md-6">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="E-mail Address"
                                {...register("email")}
                                onFocus={handleFocus}
                              />
                              {errors.email && (
                                <div className="error text-danger">
                                  {errors.email.message}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <input
                                type="text" // Use text for better validation
                                className="form-control"
                                placeholder="Phone No."
                                {...register("phone")}
                                onFocus={handleFocus}
                              />
                              {errors.phone && (
                                <div className="error text-danger">
                                  {errors.phone.message}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              type="text"
                              className="form-control"
                              rows="10"
                              cols="5"
                              placeholder="Message"
                              {...register("message")}
                              onFocus={handleFocus}
                            ></textarea>
                            {errors.message && (
                              <div className="error text-danger">
                                {errors.message.message}
                              </div>
                            )}
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
