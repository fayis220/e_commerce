'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductCard';
import ShopSideBar from './ShopSideBar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Shopgrid({ data }) {
    const [showmore, setShowmore] = useState(6);
    const [shopData, setshopData] = useState([]);


    const handleShowMore = (e) => {
        e.preventDefault();
        setShowmore(prev => prev + 5);
    }

    const handleShowLess = (e) => {
        e.preventDefault();
        setShowmore(prev => (prev - 5 > 0 ? prev - 5 : 5));
    }

    useEffect(() => {
        if (data && data.product_list) {
            setshopData(data.product_list);
        }
    }, [data]);
    const [productView, setProductView] = useState(true);


    const router = useRouter();
    const searchParams = useSearchParams();

    const currentFilters = {
        filter: searchParams.get('filter') || '',
        sort: searchParams.get('sort') || '',
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const currentParams = new URLSearchParams(window.location.search);

        if (selectedValue === "") {
            // If "Sort by date" is selected, remove the filter from the URL
            currentParams.delete('filter');
        } else {
            // Otherwise, set the selected filter
            currentParams.set('filter', selectedValue);
        }

        // Push the updated URL to the router
        router.push(`?${currentParams.toString()}`);
    };

    useEffect(() => {
        const selectElement = document.getElementById('filter-select');
        if (selectElement) {
            selectElement.value = currentFilters.filter; // Set the selected value based on URL
        }
    }, [currentFilters.filter]);

    const [miniCartOpen, setMiniCartOpen] = useState(false);

    const handleMiniCartToggle = () => {
        setMiniCartOpen(!miniCartOpen);
    };

    return (
        <>
            {data ?
                <div className="shop">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="grid-list-view">
                                    <div className="grid-list-view-wrapper">
                                        <div className="grid-view-wrap">
                                            <Link className="grid-view"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setProductView(true);
                                                }} href="">
                                                <i className="fas fa-th"></i>
                                            </Link>
                                        </div>
                                        <div className="list-view-wrap">
                                            <Link className="list-view"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setProductView(false);
                                                }} href="">
                                                <i className="fas fa-list"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="grid-list-select">

                                        <select className="form-select" aria-label="Default select example" id="filter-select" onChange={handleSelectChange}>
                                            <option value="">Sort by feature</option>
                                            {data.options && data.options.map((list_data, index) => (
                                                <option value={list_data.value} key={index}>{list_data.label}</option>
                                            ))}
                                        </select>

                                        <div>
                                            {data.filteredData && data.filteredData.map(item => (
                                                <div key={item.id}>{item.name}</div> // Display item name
                                            ))}
                                        </div>

                                    </div>
                                </div>
                                <div className="shop-product">
                                    <div className="row">

                                        <ShopSideBar data={data} />

                                        <div className="col-12 col-md-8 col-lg-9">
                                            <div className={`shop-product-right grid-view ${productView ? "" : "list-view"}`}>
                                                {shopData.length > 0 && shopData.slice(0, showmore).map((data, id) => (
                                                    <ProductCard data={data} key={id} handleMiniCartToggle={handleMiniCartToggle} />
                                                ))}

                                            </div>
                                            <div className="load-more-btn" data-aos="fade-up" data-aos-delay="900"
                                                data-aos-duration="1500">
                                                {shopData.length > 0 && (
                                                    <>
                                                        {showmore < shopData.length ? (
                                                            <Link href="" className="btn btn-primary" onClick={handleShowMore}>Load More</Link>
                                                        ) : (
                                                            showmore > 5 && (
                                                                <Link href="" className="btn btn-primary" onClick={handleShowLess}>Show Less</Link>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                : null}
        </>
    )
}
