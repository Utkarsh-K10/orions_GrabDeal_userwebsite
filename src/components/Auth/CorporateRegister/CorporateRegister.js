import React, { useContext } from "react";
import { useState } from "react";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import userLoginBg from "./assets/layout.png";
import { FcGoogle } from "react-icons/fc";
import "./CorporateRegister.css";
import { UserContext } from "../../../App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";
import PasswordChecker from "../UserRegister/PasswordStrengthBar/PasswordChecker";
import PasswordCheckerCorpo from "./PasswordStrengthBar/PasswordChecker";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { useRef } from "react";

const CorporateRegister = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gst: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Create Account");
  const [triggered, setTriggered] = useState(false);
  const [afterLogin, setAfterLogin] = useState({});
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    // setButtonText("Loading...");
    // e.persist();
    // const url = `https://v3materialbuyapi.herokuapp.com/users/login`;
    // console.log("here");
    // axios
    //     .post(url, {
    //         username: user.username,
    //         password: user.password,
    //     })
    //     .then((res) => {
    //         if (res.data === "Invalid Credentials...") {
    //             setError("Email or Password incorrect!");
    //             setButtonText("Login");
    //         } else {
    //             setLoginSuccess(res.data);
    //         }
    //     });
  };
  console.log(loginSuccess);

  // console.log(afterLogin)
  if (loginSuccess.username) {
    sessionStorage.setItem("userinfo", JSON.stringify({ loginSuccess }));
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    setLoggedInUser(user.loginSuccess);
  }
  if (loginSuccess.username) {
    history.push("/loginsuccess");
  }
  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://v3materialbuyapi.herokuapp.com/users/google";
  };
  let inputRef = useRef();
  const showIcon = () => <i class="fa fa-eye" aria-hidden="true"></i>;
  const hideIcon = () => <i class="fa fa-eye-slash" aria-hidden="true"></i>;
  return (
    <div className="userLogin-container">
      <div className="userLogin-bg">
        <img src={userLoginBg} alt="" />
      </div>
      <div className="userLogin-fields">
        <div className="userLogin-text">
          <h1>CORPORATE SIGNUP</h1>
          <p>to continue with us</p>
        </div>

        <AvForm onValidSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <i className="ri-user-3-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="username"
              type="text"
              value={user.username}
              onChange={(e) => handleChange(e)}
              id="username"
              placeholder="Name *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <div className="form-group">
            <i class="ri-mail-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="username"
              type="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
              id="username"
              placeholder="Email Id *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <div className="form-group">
            <i class="ri-phone-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="username"
              type="number"
              value={user.phoneNumber}
              onChange={(e) => handleChange(e)}
              id="username"
              placeholder="Phone Number *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <div className="form-group">
            <i class="ri-phone-find-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="username"
              type="number"
              value={user.GST}
              onChange={(e) => handleChange(e)}
              id="username"
              placeholder="GST Number *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <div className="form-group">
            <i className="ri-lock-2-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="password"
              type="password"
              ref={inputRef}
              value={user.password}
              onChange={(e) => handleChange(e)}
              id="password"
              placeholder="Password *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
            <ReactPasswordToggleIcon
              inputRef={inputRef}
              showIcon={showIcon}
              hideIcon={hideIcon}
            />
          </div>
          <PasswordCheckerCorpo
            password={user.password}
            className="corpoPassCheck"
            trigger={triggered}
          />
          <div className="form-group">
            <i className="ri-lock-2-fill user-icon"></i>
            <AvInput
              className="login-input"
              name="password"
              type="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
              id="password"
              placeholder="Confirm Password *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <button type="submit" className="userLoginBtn loginBtn ">
            {buttonText}{" "}
          </button>
          <p className="text-danger mt-3">{error}</p>
        </AvForm>
        {/* <p className="userLogin-break">OR</p>

           
                <button onClick={handleGoogleLogin} className="userLoginBtn googleBtn">
                    <FcGoogle /> Login with Google
                </button>

                <p className="userLogin-break">OR</p>
                <button className="userLoginBtn reqOtpBtn">Request OTP</button>
                <br /> */}
        {/* <div className="signup-link d-flex justify-content-around">
                    <Link to="/usersignup">New User? SignUp</Link>
                    <Link to="#">Forgot Password?</Link>
                </div> */}
      </div>
    </div>
  );
};

export default CorporateRegister;
