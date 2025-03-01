'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import Loader from '@/components/Loader'
import About from '@/components/Sections/About'
import AboutOurTeam from '@/components/Sections/AboutOurTeam'
import BestFurniture from '@/components/Sections/BestFurniture'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'

export default function Page() {
  const { data, isLoading, error } = UseFetchData(themeConfig.api.about_us_url);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <SeoData title={data.title} />
      <div className="site-content">
        <Breadcrumbs />
        <About data={data} />
        <BestFurniture data={data} />
        <AboutOurTeam data={data} />
      </div>
    </>
  )
}
