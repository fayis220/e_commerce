'use client'
import themeConfig from '@/config/themeConfig';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

let Isotope;

if (typeof window !== "undefined") {
  Isotope = require("isotope-layout");
}
export default function GalleryImages({ data }) {
  const isotope = useRef();
  const [showmore, setShowmore] = useState(11);
  const [galleryData, setGalleryData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".grid", {
        itemSelector: ".grid-item",
      });
      // cleanup
      return () => isotope.current.destroy();
    }, 100);
  }, []);

  useEffect(() => {
    if (data && data.gallery_list) {
      setGalleryData(data.gallery_list);
    }
  }, [data]);

  const handleShowMore = (e) => {
    e.preventDefault();
    setShowmore((prev) => prev + 3);
  };

  const handleShowLess = (e) => {
    e.preventDefault();
    setShowmore((prev) => (prev - 5 > 0 ? prev - 5 : 5));
  };

  const handlePopupImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <>

      {data ?
        <div className="gallery">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="gallery-wrapper">
                  <div className="grid" >
                    {galleryData.length &&
                      galleryData.slice(0, showmore).map((gallery_data, index) => {
                        return gallery_data.image ? (
                          <div className={`grid-item ${gallery_data.class}`} data-aos-delay={gallery_data.delay} data-aos-duration="1500" key={index}>
                            <div className="gallery-box">
                              <Link href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePopupImageClick(index);
                                }}>
                                <Image
                                  src={gallery_data.image ? gallery_data.image : themeConfig.no_found_image}
                                  width={gallery_data.width}
                                  height={gallery_data.height}
                                  alt={gallery_data.alt}
                                />
                              </Link>
                            </div>
                          </div>
                        ) : null;
                      })}

                  </div>
                  <div className="gallery-load-more" data-aos="fade-up" data-aos-delay="1200"
                    data-aos-duration="1500">
                    {galleryData.length > 0 && (
                      <>
                        {showmore < galleryData.length ? (
                          <Link href="" className="btn btn-primary" onClick={handleShowMore}>Load More</Link>
                        ) : (
                          showmore > 5 && (
                            <Link href="" className="btn btn-primary" onClick={handleShowLess}>Show Less</Link>
                          )
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isPopupOpen && (
                <div className="popup-modal">
                  <div className="popup-content">
                    <button className="x-mark" onClick={closePopup}>
                      &times;
                    </button>
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      modules={[Navigation, Pagination]}
                      initialSlide={selectedImageIndex}
                      loop={true}
                      className="swiper-container"
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                    >
                      {galleryData.map((data, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={data.image ? data.image : themeConfig.no_found_image}
                            alt={data.alt}
                            width={data.width}
                            height={data.height}
                            layout="responsive"

                          />
                        </SwiperSlide>
                      ))}
                      <div className="swiper-button-prev">
                        <i className="fa-solid fa-arrow-left" style={{ color: '#fff' }}></i>
                      </div>
                      <div className="swiper-button-next">

                        <i className="fa-solid fa-arrow-right" style={{ color: '#fff' }}></i>

                      </div>
                      <div className="gallery-slider-arrow">

                      </div>
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        : null}
    </>
  )
}
