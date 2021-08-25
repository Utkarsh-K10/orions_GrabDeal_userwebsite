import React, { useContext, useEffect, useState } from "react";
import "./OrderHistory.css";
import img from "./Assets/OrderProduct.png";
import DeliveryProduct from "./DeliveryProduct";
import axios from "axios";
import { UserContext } from "../../../App";

const DeliveredProduct = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState({});
  const [productImage, setProductImage] = useState({});
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user.loginSuccess._id;

  const imageUrl = process.env.REACT_APP_IMAGE_API;
  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${userId}/orders`;
    axios.get(url).then((res) => setOrders(res.data.orders));
  }, []);
  console.log("orders", orders);
  const handleProduct = (pdId) => {
    const url = process.env.REACT_APP_PRODUCT_SINGLE + `${pdId}`;
    console.log(pdId, url);
    axios.get(url).then((res) => setProductImage(res.data.gridimages[0]));
  };
  console.log(productImage);
  // console.log(orders)
  return (
    <div className="Ordercard">
      {orders.length > 0 &&
        orders.map((odr) => (
          <div className="OrderHistoryCards">
            <div className="DeliveryStatus">
              <div className="DeliveredPro">
                <i className="fas fa-truck mr-3"></i>
                <span> EXPECTED DELIVERY- 25th July</span>
              </div>
              <div className="OrderDate">
                <i className="far fa-clock mr-3"></i>Order Placed <br />
                {new Date(odr.createdAt).toDateString("dd/MM/yyyy")}
              </div>
            </div>
            <div className="OrderedProduct">
              <div className=" ProductInfo">
                <div className="Caption">{odr.productName}</div>
                <div onLoad={() => handleProduct(odr.product_id)}>
                  <img
                    src={imageUrl + odr.productImg[0]}
                    alt="Product"
                    className="WishlistImg"
                  />
                </div>
                {/* {console.log(imageUrl+productImage)} */}
                <div className="Pro_Price">₹ {odr.productPrice}</div>
              </div>
              <div className="OrderRow">
                <div className="Shipping">SHIPPING INFO</div>
                <div className="ShippingAdd">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div className="OrderRow">
                <button className="Track">Track Order</button>
                <br />
                <button className="Cancel">{odr.order_status}</button>
                <br />
                <button className="Invoice">Get Invoice</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeliveredProduct;
