import React, { useContext } from "react";
import "./CancelOrder.css";
import img from "./Assets/OrderProduct.png";
import { UserContext } from "../../../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Cancelled = [
  {
    id: 1,
    pro_namme: "PRODUCT CAPTION",
    pro_img: img,
    pro_price: "500/-",
    order_date: "1 April 2019",
    delivery_address:
      "118 G, Sarvoday Nagar, CP tank, Mumbai, Maharasthra- 440209",
  },
];

const CancelOrder = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orders, setOrders] = useState({});
  const [custom, setCustom] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user.loginSuccess._id;
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState();

  const imageUrl = `https://v3materialbuyapi.herokuapp.com/admin/image/`;
  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${userId}/orders`;
    axios.get(url).then((res) => setOrders(res.data.orders));
  }, []);
  const handleCancelOrder = (e, orderId) => {
    e.preventDefault();
    console.log("orderId", orderId);
    const url = `https://v3materialbuyapi.herokuapp.com/order/user/${userId}/${orderId}/cancel`;
    console.log(orderId);
    axios.post(url).then((res) => {
      console.log(res.data);
      setMessage(res.data.message);
      setSelected(orderId);
    });
  };
  const handleCustom = (orderId) => {
    orderId && setCustom(true);
  };
  console.log("cancel", orders);
  return (
    <div className="MyProfile">
      {/* <h1 className="profileHd"></h1> */}
      <h2>Cancel Order</h2>
      {orders.length > 0 &&
        orders.map((odr) => (
          <div>
            <div className="CancelMain">
              <div className="CancelProDetails">
                <div className="OrderedProduct">
                  <div className="ProductInfo">
                    <div className="Caption">{odr.productName}</div>
                    <img
                      src={imageUrl + odr.productImg[0]}
                      alt="Product Image"
                      className="WishlistImg"
                    />
                    <div className="Pro_Price">₹ {odr.productPrice}</div>
                  </div>
                  <div className="OrderRow">
                    <div className="Shipping">SHIPPING INFO</div>
                    <div className="ShippingAdd">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Neque, quasi!
                    </div>
                  </div>
                  <div className="OrderRow">
                    <button className="OrderDetailBtn">Order Details</button>
                    <br />
                    <button className="GoBackBtn">Go Back</button>
                    <br />
                  </div>
                </div>
              </div>
              <div className="ReasonDiv">
                <div className="ReasonHd">
                  ENTER REASON FOR CANCELLING THE ORDER
                </div>
                <form onSubmit={(e) => handleCancelOrder(e, odr._id)}>
                  <label className="CancelForm">
                    <input type="radio" name="key" value="another-value" />
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Wrong product recieved
                    </span>
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="key" value="another-value" />
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Damaged Product
                    </span>
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="key" value="another-value" />
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Product not upto the mark
                    </span>
                  </label>
                  <br />
                  <label>
                    <input type="radio" name="key" value="another-value" />
                    <span
                      onClick={() => handleCustom(odr._id)}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Custom...
                    </span>
                  </label>
                  <br />
                  <button className="CancelOrderBtn">Cancel Order</button>
                  {selected === odr._id ? (
                    <p className="text-danger font-weight-bold">{message}</p>
                  ) : (
                    ""
                  )}
                </form>
              </div>
              <hr />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CancelOrder;
