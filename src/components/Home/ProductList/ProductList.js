import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";
import ProductDefaultImage from "./assets/ProductImg.png";
import "./ProductList.css";
import UserContext from "../../../App.js";
import Notiflix from "notiflix";
import { Button, ButtonBase } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

function ProductList({ title, email, userid, cart }) {
  const [wishList, setWishList] = useState([]);

  const [toggleActive, setToggleActive] = useState("");
  useEffect(() => {
    if (userid) {
      const url = `${process.env.REACT_APP_USER_API}/${userid}/wishlist`;
      axios.get(url).then((res) => {
        setWishList(res.data);
      });
    }
  }, [userid]);

  const productids = [];
  if (wishList) {
    wishList.map(({ productid }) => productids.push(productid));
  }

  const cartids = [];
  if (cart) {
    cart.map(({ productid }) => cartids.push(productid));
  }

  console.log("cartids", cartids);

  const [cards, setcards] = useState();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [data, setData] = useState([]);

  const url = `${process.env.REACT_APP_IMAGE_API}`;

  const getCardNumber = () => {
    const width = document.body.clientWidth;
    if (width <= 320) {
      setcards(1);
    } else if (width <= 425) {
      setcards(2);
    } else if (width <= 768) {
      setcards(2);
    } else if (width <= 1024) {
      setcards(3);
    } else if (width > 1024) {
      setcards(6);
    }
  };
  const history = useHistory();

  const wishlist = (id) => {
    if (userid) {
      if (document.getElementById(id).classList.contains("is-active")) {
        document.getElementById(id).classList.remove("is-active");
        // document.getElementById(id).classList.add("color-gray");
        const removeFromList = `${process.env.REACT_APP_USER_API}/${userid}/products/${id}/removefromlist`;

        axios.post(removeFromList).then((res) => {
          Notiflix.Notify.failure("Item has been removed from wishlist", {
            position: "right-top",
            timeout: 2000,
          });
          console.log(res.data);
        });
      } else {
        document.getElementById(id).classList.add("is-active");
        // document.getElementById(id).classList.remove("color-gray");
        const addToWishlistUrl = `${process.env.REACT_APP_USER_API}/${userid}/products/${id}/addtolist`;
        axios.post(addToWishlistUrl).then((res) => {
          Notiflix.Notify.success("Item has been added to wishlist", {
            position: "right-top",
            timeout: 2000,
          });
          console.log(res.data);
        });
      }
    } else {
      history.push("/userlogin");
    }
  };
  useEffect(() => {
    getCardNumber();
  }, [getCardNumber]);

  const handleAddToCart = (productId) => {
    console.log("productId", productId);
    const url = `${process.env.REACT_APP_USER_API}/${userid}/products/${productId}/addtocart`;
    userid
      ? axios.post(url, {}).then((res) => {
          Notiflix.Report.success(
            "Success",
            "Product Successfully Added to Cart",
            "Okay",
            {
              cancelButtonColor: "#ffffff !important",
              okButtonColor: "#ffffff !important",
              success: {
                svgColor: "#f39c12",
                titleColor: "#1e1e1e",
                messageColor: "#242424",
                buttonBackground: "#f39c12",
                buttonColor: "white",
                backOverlayColor: "rgba(0,0,0,0)",
              },
            }
          );
          window.location.reload();
        })
      : history.push("/userlogin");
  };

  const handleCartRemove = (productId) => {
    console.log(productId);

    Notiflix.Confirm.show(
      "Remove from cart?",
      "Are you sure you want to remove this product from the cart?",
      "Okay",
      "Cancel ",

      // ok button callback
      function () {
        // codes...
        const removeCartUrl = `${process.env.REACT_APP_USER_API}/${userid}/products/${productId}/removefromcart`;
        axios.post(removeCartUrl).then((res) => {
          res.data && window.location.reload();
        });
      },

      // cancel button callback
      function () {
        // codes...
      },

      // extend the init options for this confirm box
      {
        width: "320px",
        borderRadius: "8px",

        cancelButtonColor: "#ffffff !important",
        okButtonColor: "#ffffff !important",
        // etc...
      }
    );
  };

  const productCards = () => {
    return data.map((product) => {
      return (
        <div className="hoverable__product">
          <div
            // className={`heart align-top wish m-1 ${
            className={`heart heart__align m-1 ${
              productids?.includes(product._id) ? "is-active" : ""
            }`}
            id={product._id}
            onClick={() => wishlist(product._id)}
            aria-hidden="true"
          ></div>
          <div className="text-center m-2 mt-4  p-2 product__hover">
            <div className="d-flex justify-content-center productCardImg">
              <Link to={`/productDetails/${product._id}`}>
                <img
                  className="product-img m-1 img-fluid"
                  src={url + product.gridimages[0]}
                  alt="Product_Image"
                  onError={(e) => (e.target.src = ProductDefaultImage)}
                />
              </Link>
            </div>
            <h5 className="Product-name pt-2 mb-1 mt-1">
              {product.product_name}
            </h5>
            <div className="products__hover__price mb-2">
              <p className=" product__price1  ">
                {product.discount ? "₹" + product.discount : ""}
              </p>
              <p className=" product__discount ">
                {product.price ? "₹" + product.price : "Out of Stock"}
              </p>
              <p className=" product__discount__percent m-0 p-0">
                {Math.floor(
                  ((product.price - product.discount) / product.price) * 100
                )}
                %OFF
              </p>
            </div>
            <div className="buttons__hover ">
              {!cartids.includes(product._id) ? (
                <div className="addCart__hover">
                  <button
                    onClick={() => handleAddToCart(product._id)}
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
                  <Link to="/userprofile/mycart">
                    <button className="btnAdd1  d-flex justify-content-center align-items-center ">
                      {/* {buttonText} */}
                      <ShoppingCartOutlinedIcon />
                      {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
                      <p className="mr-3">Go To Cart </p>
                    </button>
                  </Link>
                </div>
              )}

              <div className="addCart__hover">
                <Link to={`/Confirmcheckout/${product._id}/1`}>
                  <button className="buybtn1  d-flex justify-content-center align-items-center p-1">
                    {/* {buttonText} */}
                    {/* <AttachMoneyIcon className="buybtn1__icon" /> */}
                    {/* <AddShoppingCartIcon></AddShoppingCartIcon> */}
                    <p className="buybtn1__text">Buy Now</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center m-2 mt-4  p-2 product__nohover">
            <div className="d-flex justify-content-center productCardImg ">
              <Link to={`/productDetails/${product._id}`}>
                <img
                  className="product-img m-1 img-fluid"
                  src={url + product.gridimages[0]}
                  alt="Product_Image"
                  onError={(e) => (e.target.src = ProductDefaultImage)}
                />
              </Link>
            </div>
            <h5 className="Product-name pt-2 mb-1 mt-1">
              {product.product_name}
            </h5>
            <div className="mt-2 d-flex flex-column justify-content-between align-items-center ">
              <h5 className="Discount  ">
                {product.price ? "₹" + product.price : "Out of Stock"}
              </h5>
              {product.discount ? (
                <h6 className="Product-price  colored  ">
                  UPTO{" "}
                  {Math.floor(
                    ((product.price - product.discount) / product.price) * 100
                  )}
                  {"% OFF"}
                </h6>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_PRODUCT_URL).then((res) => {
      setData(res.data);
    });
    getCardNumber();
  }, []);
  return (
    <div className="mt-3 mb-5 slider-card">
      <div className="d-flex productSliderHdDiv">
        <h4 className="mr-auto m-4 align-middle">
          <strong>{title}</strong>
        </h4>
        <Link to="/productsall">
          <div className="viewAllBtn">View All</div>
        </Link>
      </div>
      <ItemsCarousel
        className="card mt-3"
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={cards}
        slidesToScroll={cards}
        gutter={20}
        leftChevron={
          <i class="fas fa-arrow-circle-left leftarr fa-2x colored"></i>
        }
        rightChevron={<i class="fas fa-arrow-circle-right rightarr fa-2x"></i>}
        chevronWidth={chevronWidth}
      >
        {productCards()}
      </ItemsCarousel>
    </div>
  );
}

export default ProductList;
