import React, { useState } from "react";
import "./VendorRegister.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PasswordChecker from "./PasswordStrengthBar/PasswordChecker";
import { FaUserAlt } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { RiFileList3Fill, RiLock2Fill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImPhone } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import { ImOffice } from "react-icons/im";

const VendorRegister = () => {
  const [triggered, setTriggered] = useState(false);
  const [buttonText, setButtonText] = useState("Create Account");

  const [disableButton, setDisableButton] = useState(false);
  const [inputError, setInputError] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    GST: false,
    address: false,
  });
  const [addUser, setAddUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    GST: "",
    address: "",
    company: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState({});
  const [passError, setPassError] = useState("");
  const history = useHistory();
  const INPUT_VALIDATOR = /[`0-9!@#$%^&*()_+\-=\[\]{};':"|,.<>?~]/;
  const EMAIL_VALIDATOR =
    /^(("[\w-]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  const handleSubmit = (e) => {
    setButtonText("loading...");
    e.preventDefault();
    axios
      .post("https://v3materialbuyapi.herokuapp.com/vendor/new-auth/signup", {
        name: addUser.name,
        address: addUser.address,
        phoneNumber: addUser.phoneNumber,
        email: addUser.Email,
        password: addUser.password,
        GST: addUser.GST,
        company: addUser.company,
      })
      .then((res) => {
        if (res.data.message === "Mail Exists") {
          setError("Email already registered ! Please Login !");
          setButtonText("Create Account");
        } else {
          setLoginSuccess(res.data);
          console.log("loginSuccess", res.data);
          history.push("/vendorregistersuccess");
        }
      });
  };

  // console.log("hi", loginSuccess.username);
  // if (loginSuccess.username) {
  //   sessionStorage.setItem("userinfo", JSON.stringify({ loginSuccess }));
  // }
  // if (loginSuccess.username) {
  //   history.push("/vendorregistersuccess");
  // }

  const handleChange = (e) => {
    if (e.target.id === "password") {
      setTriggered(true);
    }
    const newAddUser = { ...addUser };
    // console.log("id is...", e.target.id);

    if (e.target.id === "name") {
      if (INPUT_VALIDATOR.test(e.target.value)) {
        if (e.target.id === "name") {
          setError("Cannot contain special characters");
          setInputError({
            ...inputError,
            name: true,
          });
        }
        setDisableButton(true);
      } else {
        if (e.target.id === "name") {
          if (inputError.name || inputError.email) {
            if (inputError.name) {
              setError("Cannot contain special characters");
            } else {
              setError("Not a valid email");
            }
          } else {
            setError("");
            setDisableButton(false);
          }
          setInputError({
            ...inputError,
            name: false,
          });
        }
      }
    }

    if (e.target.id == "Email") {
      if (EMAIL_VALIDATOR.test(e.target.value)) {
        if (inputError.name) {
        } else {
          setDisableButton(false);
          setError("");
          setInputError({
            ...inputError,
            email: false,
          });
        }
      } else {
        setDisableButton(true);
        setError("Not a valid email");
        setInputError({
          ...inputError,
          email: true,
        });
      }
    }
    if (e.target.id === "phoneNumber") {
      if (e.target.value.length < 10 || e.target.value.length > 10) {
        setDisableButton(true);
        setError("Not a valid mobile number");
        setInputError({
          ...inputError,
          mobile: true,
        });
      } else {
        if (inputError.name || inputError.email) {
          if (inputError.name) {
            setError("Cannot contain special characters");
          } else {
            setError("Not a valid email");
          }
        } else {
          setDisableButton(false);
          setError("");
          setInputError({
            ...inputError,
            email: false,
          });
        }
      }
    }
    newAddUser[e.target.id] = e.target.value;
    setAddUser(newAddUser);
  };
  // console.log("addUser.gst", addUser.gst);
  const validatePassword = (e) => {
    console.log(e.target.value);
    if (addUser.password !== e.target.value) {
      setPassError(`Password didn't match!`);
    } else {
      setPassError("");
    }
  };
  return (
    <div className="UserSignUpPortal">
      <div className="PortalImgBackground"></div>
      <div className="SignUpFormSection">
        <div className="SignUpForm">
          <div className="FormHd">VENDOR SIGNUP</div>
          <div className="FormSubHd">to continue with us</div>
          <form onSubmit={handleSubmit} className="UserSignUpForm">
            <label>
              <FaUserAlt className="SignUpIco " />
            </label>
            <input
              type="name"
              placeholder="Enter your Name"
              className={`signupInput mb-3 ${
                inputError.name ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              id="name"
              value={addUser.name}
              required
              autoComplete
            />
            <br />

            {/* <label>
              <FaUserAlt className="SignUpIco" />
            </label>
            <input
              type="name"
              placeholder="Last Name"
              className={`signupInput mb-3 ${
                inputError.lname ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              id="lname"
              value={addUser.lname}
              required
              autoComplete
            />
            <br /> */}
            <label>
              <IoMail className="SignUpIco" />
            </label>
            <input
              type="email"
              placeholder="Email"
              className={`signupInput mb-3 ${
                inputError.email ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              value={addUser.Email}
              id="Email"
              required
              autoComplete
            />
            <br />
            <label>
              <FaAddressCard className="SignUpIco " />
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              className={`signupInput mb-3 ${
                inputError.fname ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              id="address"
              value={addUser.address}
              required
              autoComplete
            />
            <br />
            <label>
              <ImPhone className="SignUpIco" />
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              className="signupInput mb-3"
              onChange={(e) => handleChange(e)}
              value={addUser.phone}
              id="phoneNumber"
              required
              autoComplete
            />
            <br />
            <RiFileList3Fill className="SignUpIco" />
            <input
              type="number"
              placeholder="GST Number"
              className="signupInput"
              onChange={(e) => handleChange(e)}
              id="GST"
              value={addUser.gst}
            />
            <br />
            <label>
              <ImOffice className="SignUpIco " />
            </label>
            <input
              type="name"
              placeholder="Company Name"
              className={`signupInput mb-3 ${
                inputError.fname ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              id="company"
              value={addUser.company}
              required
              autoComplete
            />
            <br />
            <label>
              <RiLock2Fill className="SignUpIco" />
            </label>
            <input
              type="password"
              className="signupInput mb-3"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              value={addUser.password}
              id="password"
              required
            />
            <br />
            <PasswordChecker
              password={addUser.password}
              className="pswdChecker"
              trigger={triggered}
            />
            <br />
            <label>
              <RiLock2Fill className="SignUpIco" />
            </label>
            <input
              type="password"
              className="signupInput mb-3"
              placeholder="Confirm password"
              onChange={(e) => validatePassword(e)}
              value={addUser.confirmPassword}
              required
            />
            <br />
            <p className="text-danger">{passError}</p>
            <button
              className={`loginbtn ${disableButton ? "bg-secondary" : ""}`}
              type="submit"
              disabled={disableButton}
            >
              {buttonText}
            </button>
            <p className="text-danger">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
