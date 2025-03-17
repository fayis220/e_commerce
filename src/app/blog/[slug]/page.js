"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { redirect, useParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";
import BlogSideBar from "@/components/Sections/BlogSideBar";
import themeConfig from "@/config/themeConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

async function fetchData() {
  const res = await fetch("/json/data/blog.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
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

export default function DynamicPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState();
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

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData();
        const foundData = data.find((item) => item.slug === slug);
        if (!foundData) {
          setError("Page not found");
        } else {
          setPageData(foundData);
        }
      } catch (err) {
        setError("Failed to load data");
      }
    }

    loadData();
  }, [slug]);

  if (error) {
    return redirect("/error-404");
  }

  if (!pageData) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="site-content">
        <Breadcrumbs />

        {/* <!-- Blog-Details Start --> */}
        <div className="blog-details">
          <div className="container">
            <div className="row">
              <BlogSideBar data={pageData} />
              <div className="col-lg-9">
                <div className="blog-details-right">
                  <div
                    className="blog-details-img"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    data-aos-duration="1500"
                  >
                    <Link href="" className="img-cover">
                      {" "}
                      <Image
                        src={
                          pageData.image
                            ? pageData.image
                            : themeConfig.no_found_image
                        }
                        width={945}
                        height={444}
                        alt=""
                      />{" "}
                    </Link>
                  </div>
                  <div className="blog-details-right-wrapper">
                    <Link href="">
                      <h2>{pageData.title}</h2>
                    </Link>
                    {/* <div className="blog-time-date">
                      <div className="blog-time">
                        <p>
                          <i className="far fa-clock"></i>
                          {pageData.date}
                        </p>
                      </div>
                      <div className="blog-user">
                        <p>
                          <i className="fas fa-user"></i>
                          {pageData.username}
                        </p>
                      </div>
                    </div> */}
                    <p>{pageData.label}</p>
                    <p>{pageData.detail}</p>
                    <div className="quete-text">
                      <div className="quote-left-icon">
                        <i className="fas fa-quote-left"></i>
                      </div>
                      <p>{pageData.quote}</p>
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
                              {" "}
                              <Image
                                src={
                                  pageData.blog_left_image
                                    ? pageData.blog_left_image
                                    : themeConfig.no_found_image
                                }
                                width={464}
                                height={320}
                                alt=""
                              />{" "}
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="latest-fashion-details">
                            <h4>{pageData.title}</h4>
                            <p>{pageData.label}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="latest-fashion-trend">
                      <div className="row align-items-center">
                        <div className="col-md-6 order-last order-md-first">
                          <div className="latest-fashion-details">
                            <h4>{pageData.title}</h4>
                            <p>{pageData.label}</p>
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
                                  pageData.blog_right_image
                                    ? pageData.blog_right_image
                                    : themeConfig.no_found_image
                                }
                                width={464}
                                height={320}
                                alt=""
                              />{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>{pageData.label}</p>
                    <div className="latest-fashion-categories">
                      <div className="fashion-categories-icon">
                        <i className="fas fa-tags"></i>
                      </div>
                      <div className="latest-fashion-categories-wrap">
                        <ul>
                          {pageData.latest_fashion_categories &&
                          pageData.latest_fashion_categories.length > 0
                            ? pageData.latest_fashion_categories.map(
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
                      <h4>{pageData.what_to_title}</h4>
                      <p>{pageData.what_to_label}</p>
                      <div className="expext-list">
                        <ul>
                          {pageData.expext_list &&
                          pageData.expext_list.length > 0
                            ? pageData.expext_list.map((list_data, index) => (
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
                                type="number" // Use text for better validation
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
        {/* <!-- Blog-Details End --> */}
      </div>
    </>
  );
}
