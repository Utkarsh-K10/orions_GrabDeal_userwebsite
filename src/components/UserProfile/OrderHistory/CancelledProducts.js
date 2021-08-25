import React from 'react';
import './OrderHistory.css';
import img from './Assets/OrderProduct.png';

const CancelledProducts=()=>{

    const Cancelled=[
        {
            id:1,
            pro_namme: "PRODUCT CAPTION",
            pro_img: img,
            pro_price: "500/-",
            order_date: "1 April 2019",
            delivery_address: "118 G, Sarvoday Nagar, CP tank, Mumbai, Maharasthra- 440209",
        }
    ]

    return(
        <div className="Ordercard">
        {Cancelled.length>0 && Cancelled.map(props=>
        <div className="OrderHistoryCards">
        <div className="DeliveryStatus">
                <div className="CancelledPro">
                    CANCELLED
                </div>
                <div className="OrderDate">
                    Order Placed <br/>
                    {props.order_date}
                </div>
            </div>
            <div className="OrderedProduct">
                <div className="ProductInfo">
                    <div className="Caption">{props.pro_namme}</div>
                    <img src={props.pro_img} alt="Product Image" className="WishlistImg"/>
                    <div className="Pro_Price">{props.pro_price}</div>
                </div>
                <div className="OrderRow">
                    <div className="Shipping">SHIPPING INFO</div>
                    <div className="ShippingAdd">{props.delivery_address}</div>
                </div>
                <div className="OrderRow">
                    <button disabled  className="CancelledBtn">Track Order</button><br/>
                    <button disabled className="CancelledBtn">Cancel/ Return</button><br/>
                    <button disabled className="CancelledBtn">Get Invoice</button>
                </div>
            </div>
        </div>)}
           
        </div>)
}

export default CancelledProducts;