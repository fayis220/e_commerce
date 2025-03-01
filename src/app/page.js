"use client";
import SeoData from "@/components/HeadMeta";
import Loader from "@/components/Loader";
import BlogAndNews from "@/components/Sections/BlogAndNews";
import FurnitureBrands from "@/components/Sections/FurnitureBrands";
import Hero from "@/components/Sections/Hero";
import HomeServicesList from "@/components/Sections/HomeServicesList";
import HomeVideo from "@/components/Sections/HomeVideo";
import OurBesrOffers from "@/components/Sections/OurBesrOffers";
import OurProductList from "@/components/Sections/OurProductList";
import Testimonial from "@/components/Sections/Testimonial";
import themeConfig from "@/config/themeConfig";
import UseFetchData from "@/hook/usegetdata";

export default function Home() {
  const { data, isLoading, error } = UseFetchData(themeConfig.api.homepage_url);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SeoData />
      <div className="site-content">
        <Hero hero_data={data} />
        <HomeServicesList data={data} />
        <OurProductList data={data} />
        <BlogAndNews data={data} />
        <OurBesrOffers data={data} />
        <HomeVideo data={data} />
        <Testimonial data={data} />
        <FurnitureBrands data={data} />
      </div>
    </>
  );
}
