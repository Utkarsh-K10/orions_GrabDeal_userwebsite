import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import { UserContext } from "../../App";
import axios from "axios";
import Notiflix from "notiflix";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import BottomFooter from "../Shared/Footer/BottomFooter";

function BulkQuantityQuotation({ setRedirect }) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [formSuccessText, setFormSuccessText] = useState("");

  const INPUT_VALIDATOR = /[ `0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
    " please fill the following details to get Quotation for Bulk Orders"
  );
  const { productId, productName } = useParams();
  const [Firstname, setFirstname] = useState("");
  const [LastName, setLastName] = useState("");
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState();
  const [office, setOffice] = useState("");
  const [itemReq, setItemReq] = useState(productName);
  const [quantity, setQuantity] = useState();
  const [formData, setFormData] = useState({});
  // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();

  // useEffect(() => {
  //   if (loggedInUser._id === undefined) {
  //     setRedirect({
  //       productid: productId,
  //       productName: productName,
  //     });
  //     history.push("/userlogin");
  //   }
  // }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(url).then((res) => {
      setFirstname(res.data.firstname);
      setLastName(res.data.lastname);
      setMobile(res.data.phone);
      setEmail(res.data.email);
      setAddress(
        res.data.address + ", " + res.data.city + ", " + res.data.state
      );
    });
  }, [loggedInUser._id]);
  const storeData = () => {
    setFormData({
      userId: loggedInUser._id,
      firstName: Firstname,
      lastName: LastName,
      mobileNum: mobile,
      email: email,
      address: address,
      officeName: office,
      itemRequired: productName,
      productId: productId,
      pincode: pincode,
      quantity: quantity,
    });
    console.log(formData);
    // history.push('/bulkquotationsuccess');
  };

  const sendData = async () => {
    if (loggedInUser._id === undefined)
      return alert("Please Login before continuing");
    if (formData === {}) storeData();
    await storeData();
    await axios
      .post(process.env.REACT_APP_BULK_QUANTITY_QUOTATION, formData)
      .then((res) => {
        console.log(res.data);
        setFormSuccessText("Successfully submitted");
        Notiflix.Report.success(
          "Success",
          "Quotation Submitted Successfully",
          "Okay"
        );
        setPincode("");
        // setItemReq("");
        setQuantity("");
        setOffice("");
        // setFormData("");
        history.push("/bulkquotationsuccess");
      });
  };

  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>

      <CategoryNavbar></CategoryNavbar>
      <ServiceNavbar></ServiceNavbar>
      <div className="container card mt-5 mb-5 outerbox">
        <div className="container pt-3">
          <h1 className="h1 mt-5 p-1">
            <strong>Get Quotation for Bulk Orders</strong>
          </h1>

          <p className="color-r p-1">{error}</p>

          <form
            className="container mt-5 mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendData();
            }}
          >
            <div className="form-group">
              <div className="form-row align-items-center">
                <div className="col-md-6 mb-3">
                  <label for="Fname">First Name</label>
                  {/* <input
                    type="text"
                    className="form-control"
                    name="Fname"
                    value={Firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Ishan"
                    required
                  /> */}
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

                <div className="col-md-6 mb-3">
                  <label for="Lname">Last Name</label>
                  {/* <input
                    type="text"
                    className="form-control"
                    name="Lname"
                    placeholder="Sharma"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  /> */}
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

            <div className="form-group ">
              <div className="form-row align-items-center">
                <div className="col-md-6 mb-3">
                  <label for="mobile">Mobile</label>
                  {/* <input
                    type="number"
                    className="form-control"
                    name="Mobile"
                    placeholder="9834897825"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  /> */}
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

                <div className="col-md-6 mb-3">
                  <label for="email">Email</label>
                  {/* <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Sharma@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  /> */}
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
            <div className="form-group ">
              <div className="form-row align-items-center">
                <div className="col-md-6 ">
                  <label for="Fname">Office</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Fname"
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    placeholder="ABC Industries"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-row align-items-center">
                <div className="col-md-6 mb-3">
                  <label for="item-req">Item Req.</label>
                  <input
                    type="text"
                    className="form-control"
                    name="item-req"
                    value={itemReq}
                    // onChange={(e) => setItemReq(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label for="quantity">Quantity</label>
                  {/* <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    // style={{width:}}
                    placeholder="100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="10"
                    required
                  /> */}
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
            </div>

            <div className="form-group mt-4">
              <label for="address">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="30,Shri Ram Darshan soc, Andheri Mumbai"
                value={address}
                // onChange={(e) => setAddress(e.target.value)}
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

            <div className="form-group mb-5">
              <div className="form-row align-items-center">
                <div className="col-md-5 mb-3">
                  <label for="pincode">Pin Code</label>
                  {/* <input
                    type="number"
                    className="form-control"
                    name="pincode"
                    placeholder="440037"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  /> */}
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
            <div className="d-flex mr-5 mb-5">
              {/* <button type="submit" className=" btn-danger btn-lg ml-auto">
                Ask Quotation
              </button> */}
              <button
                type="submit"
                className={` btn-danger btn-lg ml-auto ${
                  disableButton ? "bg-secondary" : ""
                }`}
                disabled={disableButton}
              >
                Ask Quotation
              </button>
            </div>
            <p className="d-flex justify-content-end text-success  align-items-center font-weight-bold ">
              {formSuccessText}
            </p>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
      <BottomFooter></BottomFooter>
    </div>
  );
}

export default BulkQuantityQuotation;
