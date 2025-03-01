'use client'
import SeoData from '@/components/HeadMeta'
import Loader from '@/components/Loader'
import themeConfig from '@/config/themeConfig'
import UseFetchData from '@/hook/usegetdata'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Page() {
	const { data, isLoading, error } = UseFetchData(themeConfig.api.error_url)
	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}
	return (
		data ?
			<>
				<SeoData title={data.page_data} />
				<div className="site-content">

					<div className="error-404-part">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<div className="error-404-wrapper">
										<div className="error-404-img" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1500">
											<Image src={data.image ? data.image : themeConfig.no_found_image} width={data.width} height={data.height} alt="" />
										</div>
										<div className="error-404-details" style={{ backgroundImage: 'url(/image/error-shaph-2.png)' }}
											data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
											<h2 className="title">{data.title}</h2>
											<p>
												{data.label}
											</p>

											<div className="error-home">
												<Link href="/" className="btn btn-primary">{data.button}</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
			: null
	)
}
