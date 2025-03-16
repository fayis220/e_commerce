"use client";
import themeConfig from "@/config/themeConfig";
import UseFetchData from "@/hook/usegetdata";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const { data } = UseFetchData(themeConfig.api.footer_url);
  return (
    <>
      <footer className="footer-part">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-part-wrapper">
                <div className="footer-wrap">
                  <div className="row">
                    <div className="col-12 col-md-5 col-lg-3">
                      {/* <div className="footer-logo">
                                                <Link href="/">
                                                  
                                                        <Image src={data.image ? data.image : themeConfig.no_found_image}  width={191} height={44} alt="" />
                                                                                                         
                                                </Link>
                                            </div> */}
                      <div className="footer-contact-wrap">
                        {data.contact &&
                          data.contact.map((contact_data, index) => (
                            <Link href={contact_data.link} key={index}>
                              <i className={`fas ${contact_data.class}`}></i>
                              {contact_data.title}
                            </Link>
                          ))}
                      </div>
                      <div className="footer-social">
                        <ul>
                          {data.social_media &&
                            data.social_media.map((link_data, index) => (
                              <li key={index}>
                                <Link href={link_data.link} target="_blank">
                                  <i className={`fab ${link_data.class}`}></i>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    {data.menu_list && data.menu_list.length > 0
                      ? data.menu_list.map((footer_data, index) => {
                          return (
                            <div
                              className="col-12 col-md-4 col-lg-3"
                              key={index}
                            >
                              <div className="information">
                                <h3 className="footer-title">
                                  {footer_data.title}
                                </h3>
                                {footer_data.sub_menu ? (
                                  <ul>
                                    {footer_data.sub_menu &&
                                      footer_data.sub_menu.map(
                                        (sub_menu_data, index) => (
                                          <li key={index}>
                                            <Link href={sub_menu_data.slug}>
                                              {sub_menu_data.title}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                ) : null}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
                <div className="copyright-text">
                  <p>{data.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
