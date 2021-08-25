import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import loaderImg from "../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import "./hireProfessionas.css";
import { Link } from "react-router-dom";
import BottomFooter from "../Shared/Footer/BottomFooter";

const ProfessionalDetails = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const url = `${process.env.REACT_APP_USER_API}/category/show`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const Works = () => {
    return data.map((category) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 text-center">
          <div className="card1 card-view m-3">
            <div className="card-block">
              <img
                className="card-img-top mb-2 p-2 img-fluid card-img"
                src={process.env.REACT_APP_IMAGE_API + category.gridimages}
                alt="403 error"
              />
              <div className="p-3">
                <h4 className="card-title mb-2 .pro_name">Name</h4>
                <h6 className="card-subtitle text-muted mb-1">Dessc</h6>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {loading ? (
        loader()
      ) : (
        <div>
          <TopNavbar />
          <CategoryNavbar />
          <ServiceNavbar />
          <div>
            <section id="about" class="about">
              <div class="container" data-aos="fade-up">
                <div class="section-title">
                  <h2>About</h2>
                  <p>
                    I’m a software developer, and I specialize in efficient
                    React apps and CSS & HTML that just work across all
                    platforms and browsers. For the backend, I mostly use
                    Node.js. I care deeply about building software that are
                    usable and helpful for the most number of people possible.
                  </p>
                </div>

                <div class="d-flex flex-row justify-content-center">
                  <div class="col-md-4 text-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/thumbnails/001/503/756/small/boy-face-avatar-cartoon-free-vector.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="col-md-8 pt-4 pt-lg-0 content">
                    <h3>Software Engineer</h3>
                    <p class="font-italic">
                      I’d introduce myself as a dreamer. I dream of working on
                      applications billions of people use, having an impact on
                      the world with my work.
                    </p>
                    <div class="row">
                      <div class="col-lg-6">
                        <ul>
                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>Name:</strong> Name
                          </li>
                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>Phone:</strong> +123 456 7890
                          </li>
                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>City:</strong> City : Mumbai, India
                          </li>
                        </ul>
                      </div>
                      <div class="col-lg-6">
                        <ul>
                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>Age:</strong> 20
                          </li>
                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>Experiance:</strong> 999
                          </li>

                          <li>
                            <i class="icofont-rounded-right"></i>{" "}
                            <strong>Status:</strong> Available
                          </li>
                        </ul>
                      </div>
                      <div className="text-center m-3">
                        <button className="AddtoCartBtn btnAdd compareBtn pl-5 pr-5">
                          <a href="mailto:materialbuy@gmail.com">
                            <strong>Hire Me</strong>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" class="about">
              <div class="container" data-aos="fade-up">
                <div class="section-title">
                  <h2>My Works</h2>
                </div>
                <div className="container-fluid">
                  <div className="row px-lg-2 py-5">{Works()}</div>
                </div>
              </div>
            </section>
          </div>
          <BottomFooter />
        </div>
      )}
    </>
  );
};

export default ProfessionalDetails;
