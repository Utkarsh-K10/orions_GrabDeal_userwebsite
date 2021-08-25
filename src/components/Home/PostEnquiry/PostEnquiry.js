import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../../App";
import BottomFooter from "../../Shared/Footer/BottomFooter";
import Footer from "../../Shared/Footer/Footer";
import CategoryNavbar from "../../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import TopNavbar from "../../Shared/Navbars/TopNavbar/TopNavbar";
import PrimarySearchAppBar from "../../Shared/Navbars/TopNavBar2/TopNavBar2";
import "./enquiry.css";

function Enquiry() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();

  const INPUT_VALIDATOR = /[ `0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const City_VALIDATOR = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const EMAIL_VALIDATOR =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  const [disableButton, setDisableButton] = useState(false);

  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [qtyError, setQtyError] = useState(false);

  const [error, setError] = useState(
    "please fill the following details to post your Enquiry"
  );

  const user = JSON.parse(sessionStorage.getItem("userinfo"));

  const [Firstname, setFirstname] = useState("");
  const [LastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setPincode] = useState();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState();
  const [formData, setFormData] = useState({});
  const [formSuccessText, setFormSuccessText] = useState("");

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(url).then((res) => {
      setFirstname(res.data.firstname);
      setLastName(res.data.lastname);
      setMobile(res.data.phone);
      setEmail(res.data.email);
    });
  }, [loggedInUser._id]);
  const storeData = () => {
    setFormData({
      Firstname: Firstname,
      LastName: LastName,
      mobilenum: mobile,
      email: email,
      city: city,
      state: state,
      landmark: landmark,
      pincode: pincode,
      product: product,
      quantity: quantity,
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#F1F3F6";
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    storeData();

    const url = `${process.env.REACT_APP_USER_API}/enquiry/create`;
    axios
      .post(url, {
        fname: Firstname,
        lname: Firstname,
        product: product,
        quantity: quantity,
        email: email,
        phone: mobile,
        city: city,
        pincode: pincode,
        landmark: landmark,
        state: state,
      })
      .then((res) => {
        console.log(res.data);
        setFormSuccessText(res.data.message);
        setCity("");
        setState("");
        setlandmark("");
        setPincode("");
        setProduct("");
        setQuantity("");
        setFormData("");
        history.push("/enquirysuccess");
      });
  };
  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>

      <CategoryNavbar></CategoryNavbar>
      <ServiceNavbar></ServiceNavbar>
      <div className="container card mt-5 mb-5 outerbox">
        <div className="container pt-3">
          <h1 className="h1 mt-5 p-1">
            <strong>Post Your Enquiry</strong>
          </h1>
          <p className="color-r p-1">{error}</p>

          <form className="container mt-5 mb-4" onSubmit={handleSubmit}>
            <div class="form-group">
              <div class="form-row align-items-center">
                <div class="col-md-6 mb-3">
                  <label for="Fname">First Name</label>
                  <input
                    type="text"
                    class={`form-control ${fnameError ? "text-danger" : ""}`}
                    name="Fname"
                    value={Firstname}
                    onChange={(e) => {
                      if (INPUT_VALIDATOR.test(e.target.value)) {
                        setFnameError(true);
                        setDisableButton(true);
                        setError(
                          "Cannot contain special characters or numbers"
                        );
                      } else {
                        if (
                          mobileError ||
                          cityError ||
                          emailError ||
                          lnameError ||
                          pincodeError ||
                          stateError
                        ) {
                          if (lnameError || cityError || stateError) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }
                          if (mobileError) {
                            setError("Enter a valid mobile number");
                          }
                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                          if (pincodeError) {
                            setError("Enter a valid Pin Code");
                          }
                        } else {
                          setDisableButton(false);

                          setError("");
                        }
                        setFnameError(false);
                      }
                      setFirstname(e.target.value);
                    }}
                    placeholder="Ishan"
                    required
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="Lname">Last Name</label>
                  <input
                    type="text"
                    class={`form-control ${lnameError ? "text-danger" : ""}`}
                    name="Lname"
                    placeholder="Sharma"
                    value={LastName}
                    onChange={(e) => {
                      if (INPUT_VALIDATOR.test(e.target.value)) {
                        setLnameError(true);
                        setDisableButton(true);

                        setError(
                          "Cannot contain special characters or numbers"
                        );
                      } else {
                        if (
                          mobileError ||
                          cityError ||
                          emailError ||
                          fnameError ||
                          pincodeError ||
                          stateError
                        ) {
                          if (fnameError || cityError || stateError) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }
                          if (mobileError) {
                            setError("Enter a valid mobile number");
                          }
                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                          if (pincodeError) {
                            setError("Enter a valid Pin Code");
                          }
                        } else {
                          setError("");
                          setDisableButton(false);
                        }
                        setLnameError(false);
                      }
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-row align-items-center">
                <div class="col-md-6 mb-3">
                  <label for="mobile">Mobile</label>
                  <input
                    type="number"
                    class={`form-control ${mobileError ? "text-danger" : ""}`}
                    name="Mobile"
                    placeholder="9834897825"
                    value={mobile}
                    onChange={(e) => {
                      if (
                        e.target.value.length > 10 ||
                        e.target.value.length < 10
                      ) {
                        setError("Enter a valid mobile number");
                        setDisableButton(true);

                        setMobileError(true);
                      } else {
                        if (
                          lnameError ||
                          cityError ||
                          emailError ||
                          fnameError ||
                          pincodeError ||
                          stateError
                        ) {
                          if (
                            fnameError ||
                            lnameError ||
                            cityError ||
                            stateError
                          ) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }

                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                          if (pincodeError) {
                            setError("Enter a valid Pin Code");
                          }
                        } else {
                          setError("");
                          setDisableButton(false);
                        }
                        setMobileError(false);
                      }
                      setMobile(e.target.value);
                    }}
                    required
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class={`form-control ${emailError ? "text-danger" : ""}`}
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      if (EMAIL_VALIDATOR.test(e.target.value)) {
                        if (fnameError || lnameError || mobileError) {
                          if (fnameError) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }
                          if (lnameError) {
                            setError("Enter a valid mobile number");
                          }
                          if (mobileError) {
                            setError("Enter a valid email address");
                          }
                        } else {
                          setError("");
                          setDisableButton(false);
                        }
                        setEmailError(false);
                      } else {
                        setEmailError(true);
                        setDisableButton(true);
                        setError("Enter a valid email address");
                      }
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <input
                type="text"
                class="form-control"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => {
                  if (e.target.value.trim().length != 0) {
                    if (fnameError || lnameError || mobileError) {
                      if (fnameError) {
                        setError(
                          "Cannot contain special characters or numbers"
                        );
                      }
                      if (lnameError) {
                        setError("Enter a valid mobile number");
                      }
                      if (mobileError) {
                        setError("Enter a valid email address");
                      }
                    } else {
                      setError("");
                      setDisableButton(false);
                    }
                    setAddressError(false);
                  } else {
                    setAddressError(true);
                    setDisableButton(true);
                    setError("Address cannot be empty");
                  }
                  setAddress(e.target.value);
                }}
                required
              />
            </div>

            <div class="form-group">
              <div class="form-row align-items-center">
                <div class="col-md-6 mb-3">
                  <label for="city">City</label>
                  <input
                    type="text"
                    class={`form-control ${cityError ? "text-danger" : ""}`}
                    name="city"
                    value={city}
                    onChange={(e) => {
                      if (City_VALIDATOR.test(e.target.value)) {
                        setCityError(true);
                        setDisableButton(true);
                        setError("Cannot contain special characters ");
                      } else {
                        if (
                          lnameError ||
                          mobileError ||
                          emailError ||
                          fnameError ||
                          pincodeError ||
                          stateError
                        ) {
                          if (lnameError || fnameError || stateError) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }

                          if (mobileError) {
                            setError("Enter a valid mobile number");
                          }
                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                          if (pincodeError) {
                            setError("Enter a valid Pin Code");
                          }
                        } else {
                          setDisableButton(false);

                          setError("");
                        }
                        setCityError(false);
                      }
                      setCity(e.target.value);
                    }}
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="state">State</label>
                  <input
                    type="text"
                    class={`form-control ${stateError ? "text-danger" : ""}`}
                    name="state"
                    placeholder="Enter your state"
                    value={state}
                    onChange={(e) => {
                      if (INPUT_VALIDATOR.test(e.target.value)) {
                        setStateError(true);
                        setDisableButton(true);
                        setError(
                          "Cannot contain special characters or numbers"
                        );
                      } else {
                        if (
                          lnameError ||
                          mobileError ||
                          emailError ||
                          fnameError ||
                          cityError ||
                          pincodeError
                        ) {
                          if (lnameError || fnameError || cityError) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }
                          if (mobileError) {
                            setError("Enter a valid mobile number");
                          }
                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                          if (pincodeError) {
                            setError("Enter a valid Pin Code");
                          }
                        } else {
                          setDisableButton(false);
                          setError("");
                        }
                        setStateError(false);
                      }
                      setState(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="form-row align-items-center">
                <div class="col-md-6 mb-3">
                  <label for="landmark">Landmark</label>
                  <input
                    type="text"
                    class="form-control"
                    name="landmark"
                    placeholder="landmark"
                    value={landmark}
                    onChange={(e) => setlandmark(e.target.value)}
                    required
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="pincode">Pin Code</label>
                  <input
                    type="number"
                    class={`form-control ${pincodeError ? "text-danger" : ""}`}
                    name="pincode"
                    placeholder="440037"
                    value={pincode}
                    onChange={(e) => {
                      if (
                        e.target.value.length < 6 ||
                        e.target.value.length > 6
                      ) {
                        setPincodeError(true);
                        setDisableButton(true);
                        setError("Enter a valid Pin Code");
                      } else {
                        if (
                          lnameError ||
                          mobileError ||
                          emailError ||
                          fnameError ||
                          cityError ||
                          stateError
                        ) {
                          if (
                            lnameError ||
                            fnameError ||
                            cityError ||
                            stateError
                          ) {
                            setError(
                              "Cannot contain special characters or numbers"
                            );
                          }
                          if (mobileError) {
                            setError("Enter a valid mobile number");
                          }
                          if (emailError) {
                            setError("Enter a valid email address");
                          }
                        } else {
                          setDisableButton(false);
                          setError("");
                        }
                        setPincodeError(false);
                      }
                      setPincode(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="container color-g d-flex mb-4">
              <div class="col-md-3 mb-3">
                <label for="product">Product&nbsp;/&nbsp;Service</label>
                <input
                  type="text"
                  class="form-control"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  name="product"
                  placeholder=""
                  required
                />
              </div>
              <div class="col-md-3 mb-3">
                <label for="quantity">QTY</label>
                <input
                  type="number"
                  class="form-control"
                  value={quantity}
                  onChange={(e) => {
                    if (e.target.value <= 0) {
                      setQtyError(true);
                      setDisableButton(true);
                      setError("Quantity cannot be zero or negative");
                    } else {
                      if (
                        lnameError ||
                        mobileError ||
                        emailError ||
                        fnameError ||
                        cityError ||
                        stateError
                      ) {
                        if (
                          lnameError ||
                          fnameError ||
                          cityError ||
                          stateError
                        ) {
                          setError(
                            "Cannot contain special characters or numbers"
                          );
                        }
                        if (mobileError) {
                          setError("Enter a valid mobile number");
                        }
                        if (emailError) {
                          setError("Enter a valid email address");
                        }
                      } else {
                        setDisableButton(false);
                        setError("");
                      }
                      setQtyError(false);
                    }
                    setQuantity(e.target.value);
                  }}
                  name="quantity"
                  placeholder="10"
                  required
                />
              </div>
            </div>
            <div className="d-flex mr-5 mb-5">
              <button
                type="submit"
                className={` btn-danger btn-lg ml-auto ${
                  disableButton ? "bg-secondary" : ""
                }`}
                disabled={disableButton}
              >
                Post Enquiry
              </button>
            </div>
            <p className="d-flex justify-content-end text-success  align-items-center font-weight-bold ">
              {formSuccessText}
            </p>
          </form>
        </div>
      </div>
      <BottomFooter />
    </>
  );
}

export default Enquiry;
