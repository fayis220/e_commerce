"use client";

import themeConfig from "@/config/themeConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ title }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const segmentName = capitalizeFirstLetter(segment.replace("-", " "));

    return (
      <span key={href}>
        {!isLast ? (
          <>
            <Link href={href}>{segmentName}</Link>
            <span>
              {" "}
              <i className="fa-solid fa-angle-right"></i>{" "}
            </span>
          </>
        ) : (
          <span>{segmentName}</span>
        )}
      </span>
    );
  });
  return (
    <div
      className="hero-inner-section"
      style={{ backgroundImage: "url(/image/hero-bg.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="hero-inner-section-wrapper">
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="1500"
                // Style={{ color: "white" }}
                Style="color:white"
              >
                {capitalizeFirstLetter(
                  pathSegments[pathSegments.length - 1]?.replace("-", " ")
                ) || themeConfig.breadcrumb_title}
              </h1>
              <div
                className="breadcrumd"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1500"
              >
                <Link href="/">{themeConfig.breadcrumb_title}</Link>
                {breadcrumbItems.length > 0 && (
                  <>
                    <span>
                      {" "}
                      <i className="fa-solid fa-angle-right"></i>{" "}
                    </span>

                    {breadcrumbItems}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
