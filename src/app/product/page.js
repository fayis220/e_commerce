'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'
import Loader from '@/components/Loader'
import SingleProduct from '@/components/Sections/SingleProduct'
import TabViewPart from '@/components/Sections/TabViewPart'
import SeoData from '@/components/HeadMeta'

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.single_product_url)

   

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <SeoData/>
            <div className="site-content">
                <Breadcrumbs />


              <SingleProduct data={data}/>

               
               <TabViewPart data={data}/>
            </div >
        </>
    )
}
