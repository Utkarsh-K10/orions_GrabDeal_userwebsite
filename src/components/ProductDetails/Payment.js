import React, { useState, useEffect, useContext } from "react";
import "./payment.css";
import { TextField } from "@material-ui/core";
import $ from "jquery";
import axios from "axios";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import Footer from "../Shared/Footer/Footer";
import logo from "../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import { useHistory, useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { UserContext } from "../../App";
import AddressForm from "../UserProfile/ManageAddress/AddressForm";
import DeliveryAddressForm from "./DeliveryAddressForm";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import BottomFooter from "../Shared/Footer/BottomFooter";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Payment({ name, setRedirect }) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();
  const { id, quantity, userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${userId}/getuser`;

    axios.get(userURL).then((response) => setUser(response.data));
  }, []);
  useEffect(() => {
    const url = process.env.REACT_APP_PRODUCT_SINGLE + `${id}`;
    axios.get(url).then((res) => {
      setSingleProduct(res.data);
      console.log("singleProduct", res.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (userId === "undefined") {
      console.log("here");
      setRedirect({
        productid: id,
        quantity: quantity,
      });
      history.push("/userlogin");
    }
  });

  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const checkValidation = async (response) => {
      const legit = await axios.post(
        "https://v3materialbuyapi.herokuapp.com/order/user/verification",
        response
      );
      console.log(legit.data.message);
      if (legit.data.message === "OK") {
        const removeCartUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${id}/removefromcart`;

        axios.post(removeCartUrl).then((res) => {
          console.log(res.data);
        });

        history.push("/SuccessOrder");
      }
    };

    const data = await axios
      .post(
        `https://v3materialbuyapi.herokuapp.com/order/user/${userId}/${id}/${quantity}/razorpay`
      )
      .then((t) => t.data);

    console.log(data);

    const options = {
      key: "rzp_test_9kcRVCSSTYIqHg",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "Material Buy",
      description: "",
      image: logo,
      handler: function (response) {
        const userData = {
          productid: id,
          userid: userId,
          qty: quantity,
        };
        const data = { ...response, ...userData };
        console.log(data);
        checkValidation(data);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const [addLine1, setAddLine1] = useState("address Line 1");
  const [addLine2, setAddLine2] = useState("address Line 2");
  const [Bank, setBank] = useState("select");
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(singleProduct.price * quantity);
  const [isLegit, setIsLegit] = useState();
  useEffect(() => {
    $(".box").hide();
    document.body.style.backgroundColor = "#F1F3F6";
    $(document).ready(function () {
      $('input[type="radio"]').click(function () {
        var inputValue = $(this).attr("data");
        var targetBox = $("." + inputValue);
        $(".box").not(targetBox).hide();
        $(targetBox).show();
      });
    });
  });

  useEffect(() => {
    $(".boxcard").hide();
    $(".x").show();
    $(document).ready(function () {
      $('div[type="open"]').click(function () {
        var inputValue = $(this).attr("data-point");
        var targetBox = $("." + inputValue);
        $(".boxcard").not(targetBox).hide();
        $(targetBox).show();
      });
    });
  }, []);

  const payment = (name) => {
    return (
      <div>
        {/* <TopNavbar /> */}
        <PrimarySearchAppBar></PrimarySearchAppBar>

        <CategoryNavbar />
        <ServiceNavbar />
        <div className="container-fluid  mt-4 mb-5">
          <div className="row d-flex justify-content-center mb-5">
            <div className="col-lg-7 col-md-10 mb-lg-0 mb-5 checkout-tab p-2 m-5 ">
              <div className=" justified-content-center">
                {name &&
                  !(
                    <div className="signin m-4">
                      <div
                        className="step-1 d-flex p-3 steps  mt-5  p-3"
                        type="open"
                        data-point="x"
                        onClick={() => {
                          $(".x").show();
                        }}
                      >
                        <h3 className="mr-3 head ml-2">1. LOGIN OR SIGNUP</h3>
                        <FiCheckCircle
                          hidden
                          className="login-complete"
                        ></FiCheckCircle>
                        {/* <i hidden className='fas login-complete fa-check fa-3x'></i> */}
                      </div>
                      <div className="mb-5  ">
                        <div className="card x boxcard">
                          <div className="card-body">
                            <form>
                              <div className="form-group row align-items-center">
                                <label
                                  for="email"
                                  className="col-sm-3 col-form-label"
                                >
                                  Email / Ph. NO.
                                </label>
                                <div className="col-sm-5">
                                  <TextField
                                    variant="standard"
                                    className="email"
                                    label="email"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-group row align-items-center">
                                <label
                                  for="pass"
                                  className="col-sm-3 col-form-label"
                                >
                                  Password
                                </label>
                                <div className="col-sm-5">
                                  <TextField
                                    variant="standard"
                                    className="email"
                                    label="Password"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="form-group row align-items-center">
                                <label
                                  for="submit"
                                  className="col-sm-2 col-form-label"
                                ></label>
                                <div className=" ml-auto">
                                  <button
                                    type="submit"
                                    className="viewAllBtn mr-4"
                                    name="submit"
                                    id="submit"
                                    onClick={(e) => {
                                      e.preventDefault();

                                      $(".login-complete").removeAttr("hidden");
                                      $(".step-2").removeClass("inactive");
                                      $(".step-2").attr("type", "open");
                                      $(".boxcard").hide();
                                      $(".deliveryAdd").show();
                                    }}
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        {/* </form> */}
                      </div>
                    </div>
                  )}
                {name ? (
                  <div className="address m-4">
                    <div
                      className="step-2 active  d-flex  mt-5  p-3"
                      type="close"
                      data-point="deliveryAdd"
                      onClick={() => {
                        let attr = $(".step-2").attr("type");
                        if (attr === "open") console.log(attr === "open");
                        $(".boxcard").hide();
                        $(".deliveryAdd").show();
                      }}
                    >
                      <h3 className=" head ml-2 mr-2 "> DELIVERY ADDRESS</h3>
                      <FiCheckCircle
                        hidden
                        className="login-complete"
                      ></FiCheckCircle>
                      {/* <i hidden className='fas fa-check deliver-add-complete fa-3x'></i> */}
                    </div>
                    <div className="mb-5  deliveryAdd  boxcard">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex">
                            <div>
                              <strong>Username</strong>
                            </div>
                            <div className="ml-5">
                              <h5 className="font-weight-normal">
                                {user?.username}
                              </h5>
                            </div>
                            <div className="ml-auto">
                              <button
                                className="color-r"
                                // onClick={() => {
                                // 	$("#changeAddress").modal();
                                // }}
                                data-toggle="modal"
                                data-target="#changeAddress"
                              >
                                EDIT
                              </button>
                            </div>
                          </div>
                          <div className="p-2 ">
                            <h6 className="font-weight-normal">
                              {user?.address}
                              <br />
                              {user?.city} {user?.state} <br />
                              {user?.pincode}
                            </h6>
                          </div>
                          <div className="">
                            <button
                              className=" d-flex ml-auto mr-4  viewAllBtn mr-4"
                              onClick={(e) => {
                                e.preventDefault();
                                if ($(".step-2").attr("type") === "open")
                                  $(".deliver-add-complete").removeAttr(
                                    "hidden"
                                  );
                                $(".step-3").removeClass("inactive");
                                $(".step-3").attr("type", "open");
                                $(".boxcard").hide();
                                $(".payment").show();
                              }}
                            >
                              Deliver here
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="address m-4">
                    <div
                      className="step-2 inactive  d-flex  mt-5  p-3"
                      type="close"
                      data-point="deliveryAdd"
                      onClick={() => {
                        let attr = $(".step-2").attr("type");
                        if (attr === "open") console.log(attr === "open");
                        $(".boxcard").hide();
                        $(".deliveryAdd").show();
                      }}
                    >
                      <h3 className=" head ml-2 mr-2 "> DELIVERY ADDRESS</h3>
                      <FiCheckCircle
                        hidden
                        className="login-complete"
                      ></FiCheckCircle>
                      {/* <i hidden className='fas fa-check deliver-add-complete fa-3x'></i> */}
                    </div>
                    <div className="mb-5  deliveryAdd  boxcard">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex">
                            <div>
                              <strong>Username</strong>
                            </div>
                            <div className="ml-5">
                              <strong>1234567890</strong>
                            </div>
                            <div className="ml-auto">
                              <button
                                className="color-r"
                                // onClick={() => {
                                // 	$("#changeAddress").modal();
                                // }}
                                data-toggle="modal"
                                data-target="#changeAddress"
                              >
                                EDIT
                              </button>
                            </div>
                          </div>
                          <div className="p-2 ">
                            <p>
                              {addLine1} <br />
                              {addLine2}
                            </p>
                          </div>
                          <div className="">
                            <button
                              className=" d-flex ml-auto mr-4  viewAllBtn mr-4"
                              onClick={(e) => {
                                e.preventDefault();
                                if ($(".step-2").attr("type") === "open")
                                  $(".deliver-add-complete").removeAttr(
                                    "hidden"
                                  );
                                $(".step-3").removeClass("inactive");
                                $(".step-3").attr("type", "open");
                                $(".boxcard").hide();
                                $(".payment").show();
                              }}
                            >
                              Deliver here
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="payment m-4">
                  <div
                    className="step-3 inactive  d-flex mt-5 p-3"
                    type="close"
                    data-point="payment"
                  >
                    <h3 className="mr-3 head ml-2 "> PAYMENT OPTIONS</h3>
                  </div>
                  <div className="mb-5  payment boxcard">
                    <form className="payment-gateway-select mb-5">
                      <div className="netBanking">
                        <div className="d-flex m-4">
                          <div className="radio ml-5">
                            <input
                              type="radio"
                              name="optradio"
                              data="cod-form"
                            />
                          </div>
                          <label id="upi-method" className="ml-3">
                            Cash on Delivery
                          </label>
                        </div>
                        <div className="cod-form box">
                          <div className="text-center m-5">
                            reCaptcha Verification here
                            <br />
                            <button
                              className=" buybtn m-3"
                              onClick={(e) => e.preventDefault()}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                        <div className="netBanking">
                          <div className="d-flex m-4">
                            <div className="radio ml-5">
                              <input
                                type="radio"
                                name="optradio"
                                data="paynow"
                              />
                            </div>
                            <label id="upi-method" className="ml-3">
                              Pay Now
                            </label>
                          </div>
                          <div className="paynow box">
                            <div className="razorpaycheckout text-center m-3">
                              <button
                                className=" buybtn "
                                onClick={(e) => {
                                  e.preventDefault();
                                  showRazorpay();
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Pay now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-10 mb-lg-0 text-center mt-5 checkout-amt pt-5">
              <div className=" mt-4 mb-1 upper  text-center">
                <h2>Price Details</h2>

                <h4 className="colord">order 20</h4>
              </div>
              <hr />
              <div className="amt-detail d-flex">
                <div className="P-2 M-2">
                  <h5 className="p-2 m-2">PRODUCT NAME</h5>
                </div>
                <div className="ml-auto">
                  <h4 className="p-2 m-2">{singleProduct.product_name}</h4>
                </div>
              </div>
              <div className="amt-detail d-flex">
                <div className="P-2 M-2">
                  <h5 className="p-2 m-2"> PRICE (1 Item)</h5>
                </div>
                <div className="ml-auto">
                  <h4 className="p-2 m-2">{singleProduct.price}/-</h4>
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
                  <h5 className="p-2 m-2 color-g">Free</h5>
                </div>
              </div>
              <div className="amt-detail d-flex mb-5">
                <div className="">
                  <h4 className="p-2 m-2">Quantity</h4>
                </div>
                <div className="ml-auto">
                  <h5 className="p-2 m-2 colored">{quantity}</h5>
                </div>
              </div>
              <hr />
              <div className="amt-detail d-flex mt-5">
                <div className="P-2 M-2">
                  <h4 className="p-2 m-2">TOTAL AMT</h4>
                </div>
                <div className="ml-auto">
                  <h4 className="p-2 m-2">
                    {(singleProduct.price - singleProduct.discount) * quantity}
                    /-
                  </h4>
                </div>
              </div>
              <div className="savings m-3">
                <h4 className="color-g">
                  You Saved Rs {singleProduct.discount * quantity}/- on this
                  order
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="changeAddress" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Address</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body flex-column pl-5 pr-5 pb-5">
                {/* <TextField
                  className="text-center mb-5"
                  label="Address line 1"
                  variant="standard"
                  fullWidth
                  value={addLine1}
                  onChange={(e) => {
                    setAddLine1(e.target.value);
                  }}
                />
                <TextField
                  className="text-center mb-5"
                  label="Address line 2"
                  variant="standard"
                  fullWidth
                  value={addLine2}
                  onChange={(e) => {
                    setAddLine2(e.target.value);
                  }}
                /> */}
                {/* <AddressForm></AddressForm> */}
                <DeliveryAddressForm></DeliveryAddressForm>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
        <BottomFooter></BottomFooter>
      </div>
    );
  };
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={logo} alt="not found"></img>
      </div>
    );
  };

  return <>{!loading ? payment(name) : loader()}</>;
}

export default Payment;
