'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import TeamMemberCard from '../TeamMemberCard'

export default function OurTeam({ data }) {
    const [Tab_Entry, setTab_Entry] = useState("All Team Member")

    return (
        <>
            <div className="our-team">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="our-team-wrapper">
                                <div className="section-title">
                                    <div className="title-wrap">
                                        <h2 className="title">{data.title}</h2>
                                    </div>
                                    <p>
                                        {data.label}
                                    </p>
                                </div>
                                <div className="tab-wrapper">
                                    <ul className="nav tabs">
                                        {data.tabs && data.tabs.length > 0 ? data.tabs.map((tab_data, index) => (
                                            <li className={`nav-item tab-link ${Tab_Entry === tab_data ? "current" : ''}`} data-tab="tab-5" key={index} onClick={() => setTab_Entry(tab_data)}>
                                                <Link className={`nav-link ${Tab_Entry === tab_data ? "active" : ''}`} aria-current="page" href="javascript:;">{tab_data}</Link>
                                            </li>
                                        )) : null}


                                    </ul>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "All Team Member" ? "current" : ""}`} data-tab="tab-5"></h3>
                                    <div id="tab-5" className={`tab-content ${Tab_Entry === "All Team Member" ? "current" : ""}`}>
                                        <div className="our-team-wrap">
                                            <div className="row">
                                                {data.all_team_member && data.all_team_member.length > 0 ? data.all_team_member.map((team_data, index) => (
                                                    <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                                                        <TeamMemberCard data={team_data} />
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "All Manager" ? "current" : ""}`} data-tab="tab-6"></h3>
                                    <div id="tab-6" className={`tab-content ${Tab_Entry === "All Manager" ? "current" : ""}`}>
                                        <div className="our-team-wrap">
                                            <div className="row">
                                                {data.all_manager && data.all_manager.length > 0 ? data.all_manager.map((list_data, index) => (
                                                    <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                                                        <TeamMemberCard data={list_data} />
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={`nav-item tab-link ${Tab_Entry === "creative Designer" ? "current" : ""}`} data-tab="tab-7"></h3>
                                    <div id="tab-7" className={`tab-content ${Tab_Entry === "creative Designer" ? "current" : ""}`}>
                                        <div className="our-team-wrap">
                                            <div className="row">
                                                {data.creative_designer && data.creative_designer.length > 0 ? data.creative_designer.map((list_data, index) => (
                                                    <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                                                        <TeamMemberCard data={list_data} />
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
