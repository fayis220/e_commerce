import React from 'react'

export default function LocationMap({ data }) {
    return (

        <>
            {data ?
                <div className="google-maps" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1500">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <iframe
                                    src={data.map_link}
                                    style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}
