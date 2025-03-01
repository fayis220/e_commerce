'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta';
import ContactForm from '@/components/Sections/ContactForm';
import LocationMap from '@/components/Sections/LocationMap';
import themeConfig from '@/config/themeConfig';
import UseFetchData from '@/hook/usegetdata';
import React from 'react';



export default function Page() {
    const { data } = UseFetchData(themeConfig.api.contactus_url);


    return (
        <>
            <SeoData data={data.page_data} />
            <div className="site-content">
                <Breadcrumbs />


                <ContactForm data={data} />

                <LocationMap data={data} />
            </div>
        </>
    )
}
