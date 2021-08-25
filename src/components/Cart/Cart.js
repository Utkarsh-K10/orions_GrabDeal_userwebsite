import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import MoreIcon from "@material-ui/icons/MoreVert";

import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import Notiflix from "notiflix";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import BottomFooter from "../Shared/Footer/BottomFooter";
import { UserContext } from "../../App";

const Cart = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [quantity, setquantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const user1 = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user1.loginSuccess._id;
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [totalSum, setTotalSum] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [quantities, setQuantities] = useState([]);
  const [data, setData] = useState();
  const imageUrl = process.env.REACT_APP_IMAGE_API;

  const handleCartRemove = (productId) => {
    console.log("productId", productId);
    const removeCartUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/removefromcart`;
    window.confirm(`Are you sure you want to delete this product?`);
    axios.post(removeCartUrl).then((res) => {
      // setDeleteSuccess("Successfully Removed !");
      res.data && window.location.reload();
    });
  };
  const [user, setUser] = useState();

  const handledecqty = (id) => {
    console.log(id);
    let oldstateitems = [];
    cart.map((item) => {
      if (item.productid === id) {
        oldstateitems = { ...item };
        console.log(oldstateitems);
        if (oldstateitems.qty === 1) {
          return;
        }
        oldstateitems.qty--;
      }
    });
    const updatedCart = cart.map((item) => {
      if (item.productid === id) {
        return oldstateitems;
      } else {
        return item;
      }
    });
    console.log("updatedCart", updatedCart);
    setCart(updatedCart);
  };

  const handleincqty = (id) => {
    console.log(id);
    let oldstateitems = [];
    cart.map((item) => {
      if (item.productid === id) {
        oldstateitems = { ...item };
        console.log(oldstateitems);
        oldstateitems.qty++;
      }
    });
    const updatedCart = cart.map((item) => {
      if (item.productid === id) {
        return oldstateitems;
      } else {
        return item;
      }
    });
    console.log("updatedCart", updatedCart);
    setCart(updatedCart);
  };

  useEffect(() => {
    const userUrl = `${process.env.REACT_APP_USER_API}/${userId}/getuser`;
    axios.get(userUrl).then((response) => {
      console.log(response.data.cart);
      setUser(response.data);
      setCart(response.data.cart);

      setLoading(false);
      if (response.data.cart.length !== 0) {
        setIsEmpty(false);
      }
    });
  }, [userId]);

  useEffect(() => {
    let sum = 0;
    let discount = 0;

    const content = cart?.map((product, index) => {
      sum += product.qty * product.productprice;
      discount += 670;

      return (
        <div className="cart__product">
          <div className="cart__productLeft">
            <h6>{product.name}</h6>
            <div className="cart__productLeftContent">
              <div className="d-flex  mr-3">
                <img
                  className="cart__productLeftImage"
                  src={imageUrl + product.productimage[0]}
                  alt=""
                />
              </div>

              <div className="cart__productLeftFeatures">
                <p className="cart__productLeftFeature">Brand:AgriPro</p>
                <p className="cart__productLeftFeature">
                  Type of Product: Power Sprayers
                </p>
                <p className="cart__productLeftFeature">Engine Type: TU26 </p>
                <p className="cart__productLeftFeature">
                  Features: Capable of very high press{" "}
                </p>
                <button
                  onClick={() => handleCartRemove(product.productid)}
                  className="cart__productLeftFeature text-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="cart__productMid">
            <div className="cart__productqty">
              <button
                onClick={() => handledecqty(product.productid)}
                className="cart__productqtybtn btnleftadd"
              >
                -
              </button>
              <p className="cart__productqtynum">{product.qty}</p>
              <button
                onClick={() => handleincqty(product.productid)}
                className="cart__productqtybtn btnleftsub"
                id="addqtybtn"
              >
                +
              </button>
            </div>
          </div>
          <div className="cart__productRight">
            <div className="cart__productRightContent">
              <h5>Rs. {product.productprice}</h5>
              <div className="cart__productPriceContainer">
                <div className="d-flex justify-content-between">
                  <span className="cart__productPrice">Price:</span>
                  <span className="cart__productPrice ">
                    {product.qty * product.productprice}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="cart__productPrice">Bulk Discount:</span>
                  <span className="cart__productPrice "> -Rs670</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="cart__productPrice">GST@!2%:</span>
                  <span className="cart__productPrice "> +2,169</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="cart__productPrice"> Final Price:</span>
                  <span className="cart__productPrice ">
                    {" "}
                    Rs. {product.qty * product.productprice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    setData(content);
    setTotalSum(sum);
    setTotalDiscount(discount);
  }, [cart]);

  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <CategoryNavbar></CategoryNavbar>
      <ServiceNavbar></ServiceNavbar>
      <div className=" d-flex justify-content-between">
        <div className="container  cart__left ">
          <div className="cart__container ">
            <h2 className="cart__containerHeading">My Cart</h2>
            <div className="cart__heading">
              <p className="cart__headingtxt">Item</p>
              <p className="cart__headingtxt">Quantity</p>
              <p className="cart__headingtxt">Price</p>
            </div>
            <div className="cart__products">{data}</div>
            <div className="cart__productsFooter mt-2">
              <Link to="/">
                <div className="  p-3 mr-4 continueShoppingbtn">
                  +Continue Shopping
                </div>
              </Link>

              <div className=" buybtn p-2 mr-4">Place Order</div>
            </div>
          </div>
        </div>
        <div className="container cart__right">
          <div className="cart__container  ">
            <div className="d-flex flex-column ">
              <div className="cart__rightTop">
                <h1 className="cart__rightheading">Payment Summary</h1>
                <div className="cart__rightTopContent p-3">
                  <div className="d-flex justify-content-between">
                    <span className="cart__productPrice1">SubTotal:</span>
                    <span className="cart__productPrice ">Rs. {totalSum}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="cart__productPrice1">Total Discount:</span>
                    <span className="cart__productPrice text-success">
                      {" "}
                      Rs. -{totalDiscount}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="cart__productPrice1">
                      Shipping Charges:
                    </span>
                    <span className="cart__productPrice text-success">
                      Free
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="cart__productPriceTotal">
                      Total Price:
                    </span>
                    <span className="cart__productPriceTotal text-danger ">
                      Rs. {totalSum - totalDiscount}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="cart__rightTopFooter">
                    Shipping Charges may apply
                  </h2>
                </div>
              </div>

              <div className="cart__rightBottom mt-4">
                <h1 className="cart__rightheading">Offer Available</h1>
                <div className="cart__rightTopContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomFooter />
    </>
  );
};

export default Cart;
