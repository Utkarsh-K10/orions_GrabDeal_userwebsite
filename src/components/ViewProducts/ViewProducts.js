import React, { useContext, useEffect, useState } from "react";
import ProductDefaultImage from "../Home/ProductList/assets/ProductImg.png";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar.js";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar.js";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar.js";
import Footer from "../Shared/Footer/Footer.js";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/Logo-materialBuy.png";
import "./ViewProducts.css";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import Notiflix from "notiflix";
import { UserContext } from "../../App";
import emptyimg from "../Assets/empty/empty.png";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";

const ViewProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [wishlistids, setWishListids] = useState([]);

  const [isEmpty, setIsEmpty] = useState(true);

  const [elements, setElements] = useState();

  const [heading, setHeading] = useState("");
  const { productId } = useParams();
  console.log("productId", productId);
  const history = useHistory();
  // api for all category view and image route is same as the product

  const url = `${process.env.REACT_APP_USER_API}/category/subcategory/subsubcategory/${productId}`;
  const imageUrl = process.env.REACT_APP_IMAGE_API;
  useEffect(() => {
    if (loggedInUser._id) {
      const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/wishlist`;
      axios.get(url).then((res) => {
        const temp = res.data.map(({ productid }) => productid);
        setWishListids(temp);
      });
    }
  }, [loggedInUser._id]);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      if (res.data.product.length !== 0) {
        setIsEmpty(false);
      }
      setHeading(res.data.name);
      setLoading(false);
    });
  }, []);

  const wishlist = (id) => {
    console.log("wishliasts id", id);
    // console.log("userid", userid);
    if (id) {
      if (document.getElementById(id).classList.contains("is-active")) {
        document.getElementById(id).classList.remove("is-active");
        // document.getElementById(id).classList.add("color-gray");
        const removeFromList = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${id}/removefromlist`;

        axios.post(removeFromList).then((res) => {
          Notiflix.Notify.failure("Item has been removed from wishlist", {
            position: "right-bottom",
            timeout: 2000,
          });
          console.log(res.data);
        });
      } else {
        document.getElementById(id).classList.add("is-active");
        // document.getElementById(id).classList.remove("color-gray");
        const addToWishlistUrl = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${id}/addtolist`;
        axios.post(addToWishlistUrl).then((res) => {
          Notiflix.Notify.success("Item has been added to wishlist", {
            position: "right-bottom",
            timeout: 2000,
          });
          console.log(res.data);
        });
      }
    } else {
      history.push("/userlogin");
    }
  };

  //code By Rohit 20 july 2021
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const CategoryElements = () => {
    return data.product.map((category) => {
      return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 text-center">
          <div className="card1">
            <Link to={`/productDetails/${category._id}`}>
              <img
                className="card-img card-view card-img-top mb-4 img-fluid"
                src={imageUrl + category.gridimages[0]}
                alt="403 error"
                onError={(e) => (e.target.src = ProductDefaultImage)}
              />
            </Link>
            <div
              className={`heart  wish m-1
                ${wishlistids?.includes(category._id) ? "is-active" : ""}
              `}
              id={category._id}
              onClick={() => wishlist(category._id)}
              aria-hidden="true"
            ></div>
            <div className="p-3 card__info">
              <h2 className="card-title mb-3">{category.product_name}</h2>
              <h6 className="card-subtitle text-muted mb-4">
                {category.price}
              </h6>
              <h6 className="card-subtitle text-muted mb-4">
                {category.discount}
              </h6>
              {/* <Link to='*'>
                    Explore more <i className='fas fa-long-arrow-alt-right align-middle'></i>
                  </Link> */}
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
                <strong>{heading} Products</strong>
              </h2>
            </div>
            <div className="text-center mb-0">
              <h5 className=" ">
                View all Products
                <i className="fas fa-chevron-right align-middle ml-2"></i>
              </h5>
            </div>
          </div>

          <>
            <div className="mytextdiv colord ml-5 mr-5 ">
              <h3 className="text-center mr-3">Products</h3>
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
          </>

          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
