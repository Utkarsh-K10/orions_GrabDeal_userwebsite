import React, { useContext, useEffect, useState } from "react";
import ProductDefaultImage from "../Home/ProductList/assets/ProductImg.png";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar.js";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar.js";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar.js";
import Footer from "../Shared/Footer/Footer.js";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import "./ProductsAll.css";
import axios from "axios";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

import { Link, useHistory, useParams } from "react-router-dom";
import Notiflix from "notiflix";
import { UserContext } from "../../App";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import BottomFooter from "../Shared/Footer/BottomFooter";

const ProductsAll = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [wishlistids, setWishListids] = useState([]);

  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(userURL).then((response) => {
      setCart(response.data.cart);
    });
  }, []);
  const cartids = [];
  if (cart) {
    cart.map(({ productid }) => cartids.push(productid));
  }

  const history = useHistory();
  // api for all category view and image route is same as the product

  const url = `${process.env.REACT_APP_PRODUCT_URL}`;
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

      setLoading(false);
    });
  }, []);

  const wishlist = (id) => {
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
    return data.map((category) => {
      console.log(category);
      return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 text-center   hoverable__productall">
          <div
            // className={`heart align-top wish m-1 ${
            className={`heart heart__align m-1 ${
              wishlistids?.includes(category._id) ? "is-active" : ""
            }`}
            id={category._id}
            onClick={() => wishlist(category._id)}
            aria-hidden="true"
          ></div>
          <div className="card1 productall__hover">
            <div className="d-flex justify-content-center productCardImg">
              <Link to={`/productDetails/${category._id}`}>
                <img
                  className="product-img m-1 img-fluid"
                  src={imageUrl + category.gridimages[0]}
                  alt="Product_Image"
                  onError={(e) => (e.target.src = ProductDefaultImage)}
                />
              </Link>
            </div>

            <h5 className="Product-name pt-2 mb-1 mt-1">
              {category.product_name}
            </h5>
            <div className="products__hover__price mb-2">
              <p className=" product__price1  ">
                {category.discount ? "₹" + category.discount : ""}
              </p>
              <p className=" product__discount ">
                {category.price ? "₹" + category.price : "Out of Stock"}
              </p>
            </div>
            {/* <p>{category.description}</p> */}
            <p className=" product__discount__percent mb-5 p-0">Upto 10% OFF</p>
          </div>

          <div className="card1 productall__nohover">
            <div className="d-flex justify-content-center productCardImg">
              <Link to={`/productDetails/${category._id}`}>
                <img
                  className="product-img m-1 img-fluid"
                  src={imageUrl + category.gridimages[0]}
                  alt="Product_Image"
                  onError={(e) => (e.target.src = ProductDefaultImage)}
                />
              </Link>
            </div>

            <h5 className="Product-name pt-2 mb-1 mt-1">
              {category.product_name}
            </h5>
            {/* <div className="products__hover__price mb-2">
              <p className=" product__price1  ">
                {category.discount ? "₹" + category.discount : ""}
              </p>
              <p className=" product__discount ">
                {category.price ? "₹" + category.price : "Out of Stock"}
              </p>
              <p className=" product__discount__percent m-0 p-0">
                Upto 10% OFF
              </p>
            </div> */}

            <div className="buttons__hover pb-3 ">
              {!cartids.includes(category._id) ? (
                <div className="addCart__hover">
                  <button
                    // onClick={() => handleAddToCart(category._id)}
                    className="btnAdd1  d-flex justify-content-center align-items-center "
                  >
                    {/* {buttonText} */}
                    <ShoppingCartOutlinedIcon />
                    {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
                    <p>Add to Cart</p>
                  </button>
                </div>
              ) : (
                <div className="addCart__hover">
                  <button
                    // onClick={() => handleCartRemove(product._id)}
                    className="btnAdd1  d-flex justify-content-center align-items-center "
                  >
                    {/* {buttonText} */}
                    <ShoppingCartOutlinedIcon />
                    {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
                    <p className="mr-3">Remove </p>
                  </button>
                </div>
              )}

              <div className="addCart__hover">
                <Link to={`/Confirmcheckout/${category._id}`}>
                  <button className="buybtn1  d-flex justify-content-center align-items-center ">
                    {/* {buttonText} */}
                    <AttachMoneyIcon className="buybtn1__icon" />
                    {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
                    <p className="buybtn1__text">Buy Now</p>
                  </button>
                </Link>
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
                <strong>All Products</strong>
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
            <div className="row px-lg-2 py-5 justify-content-center">
              {CategoryElements()}
            </div>
            {/* <div className="row px-lg-2 py-5">{productCards()}</div> */}
          </div>
          {/* <Footer></Footer> */}
          <BottomFooter></BottomFooter>
        </div>
      )}
    </div>
  );
};

export default ProductsAll;
