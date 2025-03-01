'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function TabViewPart({ data }) {
    const [Tab_Entry, setTab_Entry] = useState("Discription")

    return (
        <>
            {data ?
                <div className="tabs-part">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="tab-wrapper">
                                    <ul className="nav tabs">
                                        {data.tabs && data.tabs.map((tab_data, index) => (
                                            <li className={`nav-item tab-link ${Tab_Entry === tab_data ? "current" : ''}`} data-tab="tab-1" key={index} onClick={() => setTab_Entry(tab_data)}>
                                                <Link className={`nav-link ${Tab_Entry === tab_data ? "active" : ''}`} aria-current="page" href="">{tab_data}</Link>
                                            </li>
                                        ))}

                                    </ul>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "Discription" ? "current" : ""}`} data-tab="tab-1"></h3>
                                    <div id="tab-1" className={`tab-content ${Tab_Entry === "Discription" ? "current" : ""}`}>
                                        <div className="tab-description">
                                            <div className="discription-details">
                                                <p>
                                                    {data.detail}
                                                </p>
                                            </div>
                                            <div className="sample-unordered-list">
                                                <h4>{data.unorderlist_title}</h4>
                                                <ul>
                                                    {data.unorder_list && data.unorder_list.length > 0 ? data.unorder_list.map((list_data, index) => (
                                                        <li key={index}>{list_data}</li>
                                                    )) : null}

                                                </ul>
                                            </div>
                                            <div className="sample-unordered-list">
                                                <h4>{data.orderlist_title}</h4>
                                                <ul>
                                                    {data.order_list && data.order_list.length > 0 ? data.order_list.map((list_data, index) => (
                                                        <li key={index}>{list_data}</li>
                                                    )) : null}

                                                </ul>
                                            </div>
                                            <div className="sample-paragraph-text">
                                                <h4>{data.paragraph_text_title}</h4>
                                                <p>
                                                    {data.paragraph_text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "Reviews" ? "current" : ""}`} data-tab="tab-2"></h3>
                                    <div id="tab-2" className={`tab-content ${Tab_Entry === "Reviews" ? "current" : ""}`}>
                                        <div className="tab-additional-information">

                                            <div className="sample-paragraph-text">
                                                <h4>{data.paragraph_text_title}</h4>
                                                <p>
                                                    {data.paragraph_text}
                                                </p>
                                            </div>
                                            <div className="discription-details"></div>
                                            <p>
                                                {data.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{data.unorderlist_title}</h4>
                                            <ul>
                                                {data.unorder_list && data.unorder_list.length > 0 ? data.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`nav-item tab-link ${Tab_Entry === "Compares" ? "current" : ""}`} data-tab="tab-3"></h3>
                                <div id="tab-3" className={`tab-content ${Tab_Entry === "Compares" ? "current" : ""}`}>
                                    <div className="tab-reviews">
                                        <div className="discription-details">
                                            <p>
                                                {data.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{data.unorderlist_title}</h4>
                                            <ul>
                                                {data.unorder_list && data.unorder_list.length > 0 ? data.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{data.orderlist_title}</h4>
                                            <ul>
                                                {data.order_list && data.order_list.length > 0 ? data.order_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`nav-item tab-link ${Tab_Entry === "Shipping" ? "current" : ""}`} data-tab="tab-4"></h3>
                                <div id="tab-4" className={`tab-content ${Tab_Entry === "Shipping" ? "current" : ""}`}>
                                    <div className="tab-reviews">
                                        <div className="discription-details">
                                            <p>
                                                {data.detail}
                                            </p>
                                        </div>
                                        <div className="sample-unordered-list">
                                            <h4>{data.unorderlist_title}</h4>
                                            <ul>
                                                {data.unorder_list && data.unorder_list.length > 0 ? data.unorder_list.map((list_data, index) => (
                                                    <li key={index}>{list_data}</li>
                                                )) : null}
                                            </ul>
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
