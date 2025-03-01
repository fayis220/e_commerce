'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import Loader from '@/components/Loader'
import Blog from '@/components/Sections/Blog'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'

export default function Page() {
  const { data, isLoading, error } = UseFetchData(themeConfig.api.blogs_url);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <SeoData title={data.title}/>
      <div className="site-content">

        <Breadcrumbs />
        <Blog data={data} />
      </div>
    </>
  )
}
