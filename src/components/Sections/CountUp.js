import React from "react";
import CountUp from "react-countup";

export default function Countup({ data }) {
  return (
    <>
      {data ? (
        <div className="count-down">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="count-down-wrapper"
                  style={{ backgroundimage: "url(/image/hero-bg.png)" }}
                >
                  <div className="row">
                    {data.countup && data.countup.length > 0
                      ? data.countup.map((list_data, index) => (
                          <div className="col-12 col-md-6 col-lg-3" key={index}>
                            <div
                              className="count-down-wrap"
                              data-aos="fade-up"
                              data-aos-delay="100"
                              data-aos-duration="1500"
                            >
                              <div className="count-down-icon">
                                <i className="fas fa-users"></i>
                              </div>
                              <div className="count-down-details">
                                <h2>
                                  <span className="timer">
                                    <CountUp
                                      enableScrollSpy={true}
                                      end={list_data.end}
                                    ></CountUp>
                                  </span>
                                  {list_data ? list_data.sign : null}
                                </h2>
                                <p>{list_data.title}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
