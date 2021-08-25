import React from "react";
import DeliveryProduct from "./DeliveryProduct";
import DeliveredProduct from "./DeliveredProduct";
import CancelledProducts from "./CancelledProducts";
import { Link, useParams } from "react-router-dom";

const OrderHistory = () => {
  return (
    <div className="MyProfile">
      <div className=" d-flex justify-content-between OrderHistoryHd">
        <h2>Order History</h2>
        <Link to="/">
          <div className=" buybtn p-2">Continue Shopping</div>
        </Link>
      </div>

      {/* <DeliveryProduct/> */}
      <DeliveredProduct />
      {/* <CancelledProducts/> */}
    </div>
  );
};

export default OrderHistory;
