import React, { useState } from "react";
import "./UserRegister.css";
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

const UserRegister = () => {
  const [triggered, setTriggered] = useState(false);
  const [buttonText, setButtonText] = useState("Create Account");

  const [disableButton, setDisableButton] = useState(false);
  const [inputError, setInputError] = useState({
    fname: false,
    lname: false,
    email: false,
    mobile: false,
  });
  const [addUser, setAddUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    Email: "",
    password: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState({});
  const [passError, setPassError] = useState("");
  const history = useHistory();
  const INPUT_VALIDATOR = /[ `0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const EMAIL_VALIDATOR =
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

  const handleSubmit = (e) => {
    setButtonText("loading...");
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_USER_API}/register`, {
        firstname: addUser.fname,
        lastname: addUser.lname,
        phone: addUser.phone,
        email: addUser.Email,
        password: addUser.password,
      })
      .then((res) => {
        if (res.data === "Email Exists") {
          setError("Email already registered ! Please Login !");
          setButtonText("Create Account");
        } else {
          setLoginSuccess(res.data);
        }
      });
  };
  console.log(loginSuccess.username);
  if (loginSuccess.username) {
    sessionStorage.setItem("userinfo", JSON.stringify({ loginSuccess }));
  }
  if (loginSuccess.username) {
    history.push("/registersuccess");
  }

  const handleChange = (e) => {
    if (e.target.id === "password") {
      setTriggered(true);
    }
    const newAddUser = { ...addUser };
    // console.log("id is...", e.target.id);

    if (e.target.id === "fname" || e.target.id === "lname") {
      if (INPUT_VALIDATOR.test(e.target.value)) {
        if (e.target.id === "fname") {
          setError("Cannot contain special characters");
          setInputError({
            ...inputError,
            fname: true,
          });
        } else {
          setError("Cannot contain special characters");
          setInputError({
            ...inputError,
            lname: true,
          });
        }
        setDisableButton(true);
      } else {
        if (e.target.id === "fname") {
          if (inputError.lname || inputError.email) {
            if (inputError.lname) {
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
            fname: false,
          });
        } else {
          if (inputError.fname || inputError.email) {
            if (inputError.lname) {
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
            lname: false,
          });
        }
      }
    }

    if (e.target.id == "Email") {
      if (EMAIL_VALIDATOR.test(e.target.value)) {
        if (inputError.fname || inputError.lname) {
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
    if (e.target.id == "phone") {
      if (e.target.value.length > 10 || e.target.value.length < 10) {
        setDisableButton(true);
        setError("Not a valid Mobile number");
        setInputError({
          ...inputError,
          phone: true,
        });
      } else {
        if (inputError.fname || inputError.lname || inputError.email) {
          if (inputError.lname || inputError.lname) {
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
          <div className="FormHd">USER SIGNUP</div>
          <div className="FormSubHd">to continue with us</div>
          <form onSubmit={handleSubmit} className="UserSignUpForm">
            <label>
              <FaUserAlt className="SignUpIco " />
            </label>
            <input
              type="name"
              placeholder="First Name"
              className={`signupInput mb-3 ${
                inputError.fname ? "text-danger" : ""
              }`}
              onChange={(e) => handleChange(e)}
              id="fname"
              value={addUser.fname}
              required
              autoComplete
            />
            <br />
            <label>
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
            <br />
            <label>
              <FaUserAlt className="SignUpIco" />
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
              <ImPhone className="SignUpIco" />
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              className="signupInput mb-3"
              onChange={(e) => {
                handleChange(e);
              }}
              value={addUser.phone}
              id="phone"
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
            <p className="text-danger ">{passError}</p>
            <button
              className={`loginbtn ${disableButton ? "bg-secondary" : ""}`}
              type="submit"
              disabled={disableButton}
            >
              {buttonText}
            </button>
            <p className="text-danger">{error}</p>
            <div className="Or">OR</div>
            <button className="GoogleSignUp">
              <FcGoogle /> Sign up with Google
            </button>
          </form>
          <Link to="/userlogin" className="OldUserLink">
            Already a user? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
