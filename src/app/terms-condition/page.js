'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta'
import Loader from '@/components/Loader'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import React from 'react'

export default function Page() {
    const { data, isLoading, error } = UseFetchData(themeConfig.api.termsandprivacypolicy_url);
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
        <SeoData data={data.page_data}/>
            <div className="site-content">
                <Breadcrumbs />
                <section className="wc-privacy-police">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {data.terms_condition && data.terms_condition.map((data, index) => (
                                    <div className="cms-content" key={index}>
                                        <h4>{data.title}</h4>
                                        <div>
                                            {data.content ? (
                                                <>
                                                    <p>{data.content}</p>
                                                    {data.content_1 && <p>{data.content_1}</p>}
                                                    {data.content_2 && <p>{data.content_2}</p>}
                                                </>
                                            ) : (
                                                <ul>
                                                    {data.list && data.list.map((listData, index) => (
                                                        <li key={index}>{listData}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
