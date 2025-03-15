"use client";
import Loader from "@/components/Loader";
import Shopgrid from "@/components/Sections/Shopgrid";
import themeConfig from "@/config/themeConfig";
import UseFetchData from "@/hook/usegetdata";
import { usePathname } from "next/navigation";

export default function Page({ params }) {
  const { data, isLoading, error } = UseFetchData(themeConfig.api.shop_url);
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="site-content">
      <div
        className="hero-inner-section"
        style={{ backgroundImage: "url(/image/hero-bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-inner-section-wrapper">
                <h1
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="1500"
                  // Style="color:white"
                >
                  Search :{" "}
                  {capitalizeFirstLetter(
                    pathSegments[pathSegments.length - 1]?.replace("-", " ")
                  )}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Shopgrid data={data} />
    </div>
  );
}
