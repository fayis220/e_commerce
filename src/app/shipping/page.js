'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'

import CheckOut from '@/components/Sections/CheckOut'
export default function Page() {
    const { data } = UseFetchData(themeConfig.api.shipping_url);
  
    return (
        <>

            <SeoData title={data.title}/>
            <div className="site-content">
                <Breadcrumbs />
                <CheckOut data={data} />

            </div>
        </>
    )
}
