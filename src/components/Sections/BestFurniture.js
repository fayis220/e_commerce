import React from 'react'

export default function BestFurniture({ data }) {
    return (
        <>
            {data ?
                <div className="best-furniture">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="best-furniture-details" data-aos="fade-right" data-aos-delay="200"
                                    data-aos-duration="1500">
                                    <div className="title-wrap">
                                        <h2 className="title">{data.best_furniture_title}</h2>
                                    </div>
                                    <p>
                                        {data.best_furniture_label}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="skills" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1500">
                                    <div className="skills-bar">
                                        {data.skillbar_list && data.skillbar_list.length > 0 ? data.skillbar_list.map((list_data, index) => (
                                            <div className="bar" key={index}>
                                                <div className="info">
                                                    <span>{list_data.title}</span>
                                                </div>
                                                <div className="progress-line"><span className={list_data.class}></span></div>
                                            </div>
                                        )) : null}

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
