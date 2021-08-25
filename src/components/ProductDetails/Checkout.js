import React, { useContext, useEffect, useState } from "react";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import axios from "axios";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import UserContext from "../../App";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import BottomFooter from "../Shared/Footer/BottomFooter";
function Checkout({ userId }) {
  const [loading, setLoading] = useState(true);
  const { id, qty } = useParams();
  const [quantity, setquantity] = useState(qty);
  const minQty = 5;
  const [singleProduct, setSingleProduct] = useState({});
  const [couponData, setCouponData] = useState({});
  const [Discount, setDiscount] = useState("0");
  const [CouponName, setCouponName] = useState("");

  console.log(singleProduct);
  useEffect(() => {
    axios //Load both products data using product API
      .all([
        axios.get(process.env.REACT_APP_PRODUCT_SINGLE + `${id}`),
        axios.get(`${process.env.REACT_APP_USER_API}/showpromo`),
      ])
      .then(
        axios.spread(async (data1, data2) => {
          // output of request
          // console.log("data1", data1, "data2", data2);
          await setSingleProduct(data1.data);
          await setCouponData(data2.data);

          setLoading(false);
        })
      );
  }, []);
  const imageUrl =
    typeof singleProduct.gridimages == `object`
      ? process.env.REACT_APP_IMAGE_API + `${singleProduct.gridimages[0]}`
      : process.env.REACT_APP_IMAGE_API + `${singleProduct.gridimages}`;

  const BrowserHistory = useHistory();

  const goToPreviousPath = (e) => {
    e.preventDefault();
    BrowserHistory.goBack();
  };

  const checkout = () => {
    return (
      <>
        {/* <TopNavbar /> */}
        <PrimarySearchAppBar></PrimarySearchAppBar>

        <CategoryNavbar />
        <ServiceNavbar />
        {singleProduct ? (
          <div className="container-fluid  mt-4 mb-5">
            <div className="row d-flex justify-content-center mb-5">
              <div className="col-lg-7 col-md-10 mb-lg-0  col-xs-12 col-xs-12 mb-5 checkout-tab p-5 m-5 ">
                <div className="m-3 ">
                  <h2 className="CheckoutHd">C</h2>
                </div>
                <div className="step-3 priceintab active  d-flex mt-5  pl-2">
                  <h4 className="mr-3 head ml-2 pt-5 pb-5">
                    ESTIMATED COST - {singleProduct.price}&nbsp;/-
                  </h4>
                  <h4 className="ml-auto text-center head mr-3 pt-4">
                    Estimated Delivery <br /> 30 July 2021
                  </h4>
                </div>
                <div className="mb-5  boxcard">
                  <div className="card ">
                    <div className="card-body  p-5">
                      <div className="row mb-3">
                        <img
                          className="img-fluid col-sm-3 col-md-3 m-3"
                          src={imageUrl}
                        ></img>
                        <div className="  col-sm-5 col-md-5">
                          <h3 className="colored">
                            {singleProduct.product_name}
                          </h3>
                          {/* <h5 className="decription">
                            
                            { dangerouslySetInnerHTML = {{__html: singleProduct.description}
                              ? dangerouslySetInnerHTML = {{__html: singleProduct.description}}
                              : "No Description Available"}}
                          </h5> */}

                          {/* <div  { dangerouslySetInnerHTML = {{__html: singleProduct.description}> */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: singleProduct.description,
                            }}
                          ></div>
                          {/* </div> */}

                          {/* <h5 className='decription'>Porcelain Encaustic Floor Tile</h5> */}
                          <p className="mt-2 mb-2  text-muted">
                            item - #123456 &nbsp; model - #789456
                          </p>
                        </div>
                        <div className="col-sm-3 col-md-3">
                          <button>
                            <h6 className=" statusinfo ">
                              <strong
                                data-toggle="modal"
                                data-target="#CouponsModal"
                              >
                                {CouponName === ""
                                  ? "Apply Coupon"
                                  : `${CouponName} is Applied`}
                              </strong>
                            </h6>
                          </button>
                        </div>
                      </div>
                      <div className="row m-3">
                        <div className="col-sm-8 col-md-8">
                          <div className="qty d-flex flex-column">
                            <div className="quantiy d-flex ml-auto m-2 mb-0">
                              <div
                                className="mt-2"
                                onClick={() => {
                                  if (quantity > minQty)
                                    setquantity(quantity - 1);
                                }}
                              >
                                <button>
                                  <h3>-</h3>
                                </button>
                              </div>
                              <div className="p-3  bordered selectQuantity">
                                <h5>{quantity}</h5>
                              </div>
                              <div
                                className="m-1 mt-2"
                                onClick={() => {
                                  if (quantity >= minQty)
                                    setquantity(quantity + 1);
                                }}
                              >
                                <button>
                                  <h3>+</h3>
                                </button>
                              </div>
                            </div>
                            <div className="text-center ml-auto mr-5 ">
                              <h5 className="color-gray">QTY</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4 col-md-4 mt-3 text-center">
                          <button
                            onClick={goToPreviousPath}
                            className=" btn-colored pl-4 pr-4 compareBtn"
                            style={{ fontSize: "20px" }}
                          >
                            Remove Items
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-8 col-md-10 col-xs-12 mb-lg-0 text-center mt-5 checkout-amt p-5">
                <div className=" mt-4 mb-1 upper  text-center">
                  <h3>
                    <strong>Price Details</strong>
                  </h3>

                  <h4 className="colord">order 20</h4>
                </div>
                <hr />
                <div className="amt-detail d-flex">
                  <div className="P-2 M-2">
                    <h5 className="p-2 m-2"> PRICE (1 Item)</h5>
                  </div>
                  <div className="ml-auto">
                    <h5 className="p-2 m-2">{singleProduct.price}/-</h5>
                  </div>
                </div>
                <div aria-disabled="true" className="amt-detail d-flex">
                  <div className="P-2 M-2">
                    <h5 className="p-2 m-2"> DISCOUNT</h5>
                  </div>
                  <div className="ml-auto">
                    <h5 className="p-2 m-2">{singleProduct.discount}/-</h5>
                  </div>
                </div>
                <div className="amt-detail d-flex">
                  <div className="P-2 M-2">
                    <h5 className="p-2 m-2">
                      DELIVERY
                      <br /> CHARGES
                    </h5>
                  </div>
                  <div className="ml-auto">
                    <h4 className="p-2 m-2 color-g">Free</h4>
                  </div>
                </div>
                <div className="amt-detail d-flex mb-5">
                  <div className="P-2 M-2">
                    <h5 className="p-2 m-2">Coupon Discount</h5>
                    <button
                      data-toggle="modal"
                      data-target="#CouponsModal"
                      className="color-r"
                    >
                      {CouponName === ""
                        ? "Apply Coupon"
                        : `${CouponName} is Applied`}
                    </button>
                  </div>
                  <div className="ml-auto">
                    <h4 className="p-2 m-2 color-g">{Discount} /-</h4>
                  </div>
                </div>
                <hr />
                <div className="amt-detail d-flex mt-5">
                  <div className="P-2 M-2">
                    <h4 className="p-2 m-2">TOTAL AMOUNT</h4>
                  </div>
                  <div className="ml-auto">
                    <h4 className="p-2 m-2">
                      <strong>
                        {singleProduct.price * quantity - Discount}/-
                      </strong>
                    </h4>
                  </div>
                </div>
                <div className="savings m-3">
                  <h5 className="color-g">
                    You Saved Rs {singleProduct.discount * quantity}/- on this
                    order
                  </h5>
                </div>
                <Link to={`/checkout/${id}/${quantity}/${userId}`}>
                  <button className="  p-3 buybtn">Place Order</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading ... </p>
        )}
        {/* <Footer /> */}
        <BottomFooter></BottomFooter>
        <div class="modal" id="CouponsModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <i class="fas fa-2x p-2 fa-ticket-alt"></i>
                <h4 className="m-2">Coupons</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                {couponData.map((coupon) => {
                  return (
                    <>
                      <div
                        className="btn-default d-flex m-4"
                        onClick={() => {
                          setDiscount(
                            (singleProduct.price * quantity * coupon.discount) /
                              100
                          );
                          setCouponName(coupon.codename);
                        }}
                      >
                        <div
                          className="dicount_text"
                          // class='close'
                          data-dismiss="modal"
                        >
                          <button>
                            <h5 className="colord">Coupon Name</h5>
                          </button>
                          <p>{`This Coupon Gives discount of ${coupon.discount} on Min Order of ${coupon.min_order_amount}`}</p>
                        </div>
                        <button
                          data-dismiss="modal"
                          onClick={() => {
                            setDiscount(
                              (singleProduct.price *
                                quantity *
                                coupon.discount) /
                                100
                            );
                            setCouponName(coupon.codename);
                          }}
                          className="ml-auto p-3 color-r coupon__text"
                        >
                          {coupon.codename}
                        </button>
                      </div>
                      <hr />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };
  return <>{!loading ? checkout() : loader()}</>;
}

export default Checkout;
