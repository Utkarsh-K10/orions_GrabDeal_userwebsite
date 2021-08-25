import React, { useEffect, useState } from "react";
import ProductDefaultImage from "../Home/ProductList/assets/ProductImg.png";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar.js";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar.js";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar.js";
import Footer from "../Shared/Footer/Footer.js";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/Logo-materialBuy.png";
import axios from "axios";
import { Link } from "react-router-dom";
const SubCategoryAll = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // api for all subcategory view and image route is same as the product
  const url = `${process.env.REACT_APP_SUBCATEGORY_URL}`;
  const imageUrl = process.env.REACT_APP_IMAGE_API;

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, []);

  //code by Rohit
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const SubCategoryElements = () => {
    return data.map((category) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 text-center">
          <div className="card1 card-view m-3">
            <div className="card-block">
              <Link to={`viewSubSubcategory/${category._id}`}>
                <img
                  className="card-img-top mb-4 img-fluid card-img"
                  src={imageUrl + category.gridimages}
                  alt="403 error"
                  onError={(e) => (e.target.src = ProductDefaultImage)}
                />
              </Link>
              <div className="p-3">
                <h4 className="card-title mb-3 .pro_name">{category.name}</h4>
                <h6 className="card-subtitle text-muted mb-4">
                  {category.subtitle}
                </h6>
                {/* <Link to='*'>Explore more</Link> */}
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
          <TopNavbar></TopNavbar>
          <CategoryNavbar></CategoryNavbar>
          <ServiceNavbar></ServiceNavbar>
          <div className="d-flex justify-content-between colord m-5 mb-2">
            <div className="text-center mb-0">
              <h2 className="">
                <strong>All Subcategory</strong>
              </h2>
            </div>
            <div className="text-center mb-0">
              <h5 className=" ">
                View all Products
                <i className="fas fa-chevron-right align-middle ml-2"></i>
              </h5>
            </div>
          </div>
          <div className="mytextdiv colord ml-5 mr-5 ">
            <h3 className="text-center mr-3">Products</h3>
            <div className="dividercategory "></div>
          </div>
          <div className="container-fluid">
            <div className="row px-lg-2 py-5">{SubCategoryElements()}</div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default SubCategoryAll;
