import React, { useState, useEffect } from "react";
import loaderImg from "../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import Footer from "../Shared/Footer/Footer";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import BottomFooter from "../Shared/Footer/BottomFooter";

const HireProfessionals = () => {
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

  const Professionals = () => {
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
              <div className="text-center mt-auto align-bottom">
                <button className="pl-5 compareBtn pr-5 mb-1">
                  <Link to={`/hire/${category._id}`}>
                    <strong>View Works</strong>
                  </Link>
                </button>
              </div>
              <div className="text-center mt-auto align-bottom">
                <button className=" compareBtn pl-5 pr-5">
                  <a href="mailto:materialbuy@gmail.com">
                    <strong>Hire Me</strong>
                  </a>
                </button>
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
          {/* <TopNavbar></TopNavbar>
					<CategoryNavbar></CategoryNavbar>
					<ServiceNavbar></ServiceNavbar> */}
          <PrimarySearchAppBar></PrimarySearchAppBar>

          <CategoryNavbar></CategoryNavbar>
          <ServiceNavbar></ServiceNavbar>
          <div className="colord m-5 mb-2">
            <div className="text-center mb-0">
              <h2 className="text-center">
                <strong>Hire Professionals</strong>
              </h2>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row px-lg-2 py-5">{Professionals()}</div>
          </div>
          {/* <Footer></Footer> */}
          <BottomFooter></BottomFooter>
        </div>
      )}
    </>
  );
};

export default HireProfessionals;
