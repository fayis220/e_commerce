"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function HomeVideo({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlePopupImageClick = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      {data ? (
        <div
          className="wc-video-section"
          style={{ backgroundImage: "url(/image/counter-bg-h2.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="wc-video-content">
                  <Link
                    onClick={handlePopupImageClick}
                    className="play-icon"
                    href=""
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    data-aos-duration="1500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35.616"
                      height="46.797"
                      viewBox="0 0 35.616 46.797"
                    >
                      <g
                        id="Group_1007"
                        data-name="Group 1007"
                        transform="translate(0 0)"
                      >
                        <path
                          id="Path_20"
                          data-name="Path 20"
                          d="M244.069,146.859l-35.616-23.4c.047,35.276,0,17.965,0,46.8Z"
                          transform="translate(-208.453 -123.46)"
                          fill="#fff"
                        ></path>
                      </g>
                    </svg>
                  </Link>
                  <h2 className="title">{data.video_title} </h2>
                  <p>{data.video_detail}</p>
                  <Link href="/gallery" className="btn btn-primary">
                    {data.video_btn}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isPopupOpen && (
            <div className="video-modal-overlay">
              <div className="video-modal">
                <button className="close-modal" onClick={closePopup}>
                  X
                </button>
                <iframe
                  width="100%"
                  height="400"
                  //   src="https://www.youtube.com/embed/a3ICNMQW7Ok"
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          <div className="video-column-wrapper">
            {data.list && data.list.length > 0
              ? data.list.map((list_data, index) => (
                  <div className="wdt-column" key={index}>
                    <h3>{list_data.title}</h3>
                    <p>{list_data.content}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
