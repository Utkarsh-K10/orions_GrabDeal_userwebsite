import React, { useEffect, useState } from "react";
import ProductDefaultImage from "../Home/ProductList/assets/ProductImg.png";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar.js";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar.js";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar.js";
import Footer from "../Shared/Footer/Footer.js";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/Logo-materialBuy.png";
import "./ViewSubSubCategory.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import emptyimg from "../Assets/empty/empty.png";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";

const ViewSubSubCategory = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [heading, setHeading] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const { productId } = useParams();

  // api for all category view and image route is same as the product

  const url = `${process.env.REACT_APP_USER_API}/category/subcategory/${productId}`;
  const imageUrl = process.env.REACT_APP_IMAGE_API;

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log("temp", res.data);
      if (res.data.subsubCategory.length !== 0) {
        setIsEmpty(false);
      }
      setHeading(res.data.name);
      setLoading(false);
    });
  }, []);

  //code By Rohit 20 july 2021
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const CategoryElements = () => {
    return data.subsubCategory.map((category) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 text-center">
          <div className="card1 card-view m-3">
            <div className="card-block">
              <Link to={`/viewProducts/${category._id}`}>
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
                {/* <Link to='*'>
                    Explore more <i className='fas fa-long-arrow-alt-right align-middle'></i>
                  </Link> */}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {loading ? (
        loader()
      ) : (
        <div>
          <PrimarySearchAppBar></PrimarySearchAppBar>

          <CategoryNavbar></CategoryNavbar>
          <ServiceNavbar></ServiceNavbar>
          <div className="d-flex justify-content-between colord m-5 mb-2">
            <div className="text-center mb-0">
              <h2 className="">
                <strong>{heading}</strong>
              </h2>
            </div>
            <div className="text-center mb-0">
              <h5 className=" ">
                View all Sub Sub Categories
                <i className="fas fa-chevron-right align-middle ml-2"></i>
              </h5>
            </div>
          </div>
          <div className="mytextdiv colord ml-5 mr-5 ">
            <h3 className="text-center mr-3">Sub Sub Category</h3>
            <div className="dividercategory "></div>
          </div>
          <div className="container-fluid">
            {isEmpty ? (
              <div className="d-flex flex-column justify-content-center align-items-center mb-5 pb-5">
                <img
                  className="rounded mx-auto d-block mb-5"
                  src={emptyimg}
                  alt=""
                />
                <h3 className="font-weight-bold">
                  Sorry, we couldn't find any results
                </h3>
              </div>
            ) : (
              <div className="row px-lg-2 py-5">{CategoryElements()}</div>
            )}
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default ViewSubSubCategory;
