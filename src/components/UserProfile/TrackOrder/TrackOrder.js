import React, { useState } from "react";
import "./TrackOrder.css";
import img from "./Assets/OrderProduct.png";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    height: 400,
  },
});

const DeliveryProductList = [
  {
    id: 1,
    pro_namme: "PRODUCT CAPTION",
    pro_img: img,
    pro_price: "500/-",
    order_date: "1 June 2019",
    delivey_date: "6 June 2021",
    delivery_address:
      "118 G, Sarvoday Nagar, CP tank, Mumbai, Maharasthra- 440209",
  },

  {
    id: 2,
    pro_namme: "PRODUCT CAPTION",
    pro_img: img,
    pro_price: "500/-",
    order_date: "1 June 2019",
    delivey_date: "6 June 2021",
    delivery_address:
      "118 G, Sarvoday Nagar, CP tank, Mumbai, Maharasthra- 440209",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const marks = [
  {
    value: 100,
    label: "Order Placed",
  },
  {
    value: 66,
    label: "Processing",
  },
  {
    value: 33,
    label: "Shipped",
  },
  {
    value: 0,
    label: "Delivered",
  },
];

const TrackOrder = () => {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user.loginSuccess._id;
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState();

  const handleCancel = (e, orderId) => {
    const url = `https://v3materialbuyapi.herokuapp.com/order/user/${userId}/${orderId}/cancel`;
    console.log(orderId);
    axios.post(url).then((res) => {
      console.log(res.data);
      setMessage(res.data.message);
      setSelected(orderId);
    });
  };

  return (
    <div className="MyProfile">
      {/* <div className="TrackOrderHd">TRACK ORDER</div> */}
      <h2>Track Order</h2>

      {DeliveryProductList.length > 0 &&
        DeliveryProductList.map((props) => (
          <div className="TrackContainer">
            <div className="TrackRow SliderCol">
              <React.Fragment>
                <div className={classes.root}>
                  <Slider
                    disabled
                    orientation="vertical"
                    defaultValue={[66, 100]}
                    aria-labelledby="vertical-slider"
                    getAriaValueText={valuetext}
                    marks={marks}
                  />
                </div>
              </React.Fragment>
            </div>

            <div className="TrackRow">
              <div className="VerticalRow" />
            </div>

            <div className="OrderDetailRow">
              <a className="TrackOrderDetail" href="#">
                Order Details
              </a>
              <div className="TrackProCaption">{props.pro_namme}</div>
              <div className="TrackOrderImgRow">
                <div>
                  <img
                    src={props.pro_img}
                    alt="Product Image"
                    className="WishlistImg"
                  />
                </div>
                <div className="TrackOrderShippingAddressRow">
                  <div className="Shipping">SHIPS TO</div>
                  <div className="ShippingAdd">{props.delivery_address}</div>
                </div>
              </div>
              <div className="TrackBtn">
                <button className="Track OrdBtn">Track Order</button>
                <button onClick={handleCancel} className="Cancel OrdBtn">
                  Cancel Order
                </button>
              </div>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default TrackOrder;
