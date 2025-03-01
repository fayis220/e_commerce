'use client'
import Breadcrumbs from '@/components/Breadcrumbs';
import SeoData from '@/components/HeadMeta';
import Loader from '@/components/Loader';
import OurTeam from '@/components/Sections/OurTeam';
import TeamMemberCard from '@/components/TeamMemberCard';
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import Link from 'next/link';
import React, { useState } from 'react'

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.our_team_url);
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
                <OurTeam data={data} />
               
            </div>
        </>
    )
}
