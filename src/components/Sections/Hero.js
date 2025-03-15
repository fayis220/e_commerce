import themeConfig from "@/config/themeConfig";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero({ hero_data }) {
  return (
    <>
      {hero_data && (
        <div className="hero-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div
                  className="hero-section-left"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  <h1>{hero_data.hero_title}</h1>
                  <p>{hero_data.label}</p>
                  <Link href="/shop" className="btn btn-primary">
                    {hero_data.button}
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="hero-section-right"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  <Image
                    Style="border-radius:30px"
                    src={
                      hero_data.hero_image
                        ? hero_data.hero_image
                        : themeConfig.no_found_image
                    }
                    width={hero_data.width}
                    height={hero_data.height}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
