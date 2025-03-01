'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import Loader from '@/components/Loader'
import Countup from '@/components/Sections/CountUp'
import WeHaveService from '@/components/Sections/WeHaveService'
import WhatWeDoService from '@/components/Sections/WhatWeDoService'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.service_url);
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

                <WhatWeDoService data={data} />

                <Countup data={data} />

                <WeHaveService data={data} />
            </div>
        </>
    )
}
