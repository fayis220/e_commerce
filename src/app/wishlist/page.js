'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeoData from '@/components/HeadMeta';
import Loader from '@/components/Loader';
import themeConfig from '@/config/themeConfig';
import { useWishlist } from '@/context/WishlistContext';
import UseFetchData from '@/hook/usegetdata';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { useCart } from 'react-use-cart';

const Page = () => {
	const { data, isLoading, error } = UseFetchData(themeConfig.api.wishlist_url);
	const { addItem, items: cartItems } = useCart();
	const isInCart = (item) => {
		return cartItems.find((element) => element.id === item.id);
	}
	const {
		wishlistCount,
		wishlist,
		removeFromWishlist,
	} = useWishlist();
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
				{/* <!-- Wishlist Start --> */}
				<div className="wishlist">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="wishlist-wrapper" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
									{(wishlistCount === 0) ? (<>
										<div className="text-center shopping-btn"  >

											<h5 className="text-center mt-3"> Your wishlist is empty </h5>
											<Link href="/shop" className="btn btn-primary mt-3 ">Continue Shopping</Link>

										</div></>) : <>
										<div className="wishlist-wrap">
											<table className="table">
												<thead>
													<tr>
														{data.table_head && data.table_head.length > 0 ? data.table_head.map((list_data, index) => (
															<th key={index}>{list_data}</th>
														)) : null}

													</tr>
												</thead>
												<tbody>
													{wishlist.map((item, index) => {
														return (
															<tr key={index}>
																<td>
																	<div className="wishlist-product-wrap">
																		<div className="wishlist-product-img img-cover">
																			<Image src={item.image ? item.image : themeConfig.no_found_image} width={65} height={100} alt="" />
																		</div>
																		<div className="wishlist-product-details">
																			<h5>{item.title}</h5>
																			<p>{data.label}</p>
																		</div>
																	</div>
																</td>
																<td>
																	<div className="wishlist-price">
																		<h5>${item.price}</h5>
																	</div>
																</td>
																<td>
																	<div className="wishlist-stock">
																		<h5>in Stock</h5>
																	</div>
																</td>
																<td>
																	<div className="wishlist-cart">
																		<Link href="/shopping-cart" onClick={() => { addItem(item) }}>

																			<i className={isInCart(item) ? "fa-solid fa-cart-arrow-down" : "fa-solid fa-cart-shopping"}></i>
																		</Link>
																	</div>
																</td>
																<td>
																	<div className="trash-icon">
																		<Link href="" onClick={() => { removeFromWishlist(item.id) }}><i className="fas fa-trash-alt"></i> </Link>
																	</div>
																</td>
															</tr>
														)
													})}

												</tbody>
											</table>
										</div>
										<div className="shopping-btn ">
											<Link href="/shop" className="btn btn-primary mt-3">{data.shop_button}</Link>
										</div>
									</>}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- Wishlist End --> */}
			</div>
		</>
	)
}
export default Page
