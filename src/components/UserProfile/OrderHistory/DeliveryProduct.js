import React, { useContext, useEffect } from "react";
import "./OrderHistory.css";
import img from "./Assets/OrderProduct.png";
import { UserContext } from "../../../App";
import { useState } from "react";
import axios from "axios";

const DeliveryProduct = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState({});
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user.loginSuccess._id;

  const imageUrl = process.env.REACT_APP_IMAGE_API;
  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${userId}/orders`;
    axios.get(url).then((res) => setOrders(res.data.orders));
  }, []);
  return (
    <div className="Ordercard">
      {orders.length > 0 &&
        orders.map((odr) => (
          <div className="OrderHistoryCards">
            <div className="DeliveryStatus">
              <div className="DeliveryPro">EXPECTED DELIVERY- {}</div>

              <div className="OrderDate">
                Order Placed <br />
                {}
              </div>
            </div>
            <div className="OrderedProduct">
              <div className=" ProductInfo">
                <div className="Caption">{odr.productname}</div>
                <img src={img} alt="Product Image" className="WishlistImg" />
                <div className="Pro_Price">{odr.amount / 100}</div>
              </div>
              <div className="OrderRow ">
                <div className="Shipping">SHIPPING INFO</div>
                <div className="ShippingAdd">221 Baker Street, New York</div>
              </div>
              <div className="OrderRow ml-5">
                <button className="Track">Processing</button>
                <br />
                <button className="Cancel">Cancel Order</button>
                <br />
                <button className="Invoice">Get Invoice</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeliveryProduct;
