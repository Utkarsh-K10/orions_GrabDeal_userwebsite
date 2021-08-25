import React, { useContext } from "react";
import { useState } from "react";
import { AvForm, AvInput } from "availity-reactstrap-validation";
import userLoginBg from "./assets/layout.png";
import { FcGoogle } from "react-icons/fc";
import "./UserLogin.css";
import { UserContext } from "../../../App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";

const UserLogin = ({ redirect }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Login");

  const [afterLogin, setAfterLogin] = useState({});
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState({});
  const history = useHistory();
  const handleSubmit = (e) => {
    setButtonText("Loading...");
    e.persist();
    const url = `${process.env.REACT_APP_USER_API}/login`;
    // const bodyFormData = new FormData();
    // bodyFormData.append('username',user.username)
    // bodyFormData.append('password',user.password)

    axios
      .post(url, {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res.data === "Invalid Credentials...") {
          setError("Email or Password incorrect!");
          setButtonText("Login");
        } else {
          setLoginSuccess(res.data);
        }
      });
  };
  // console.log(loginSuccess);

  // console.log(afterLogin)
  if (loginSuccess.username) {
    sessionStorage.setItem("userinfo", JSON.stringify({ loginSuccess }));
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    setLoggedInUser(user.loginSuccess);
  }
  if (Object.keys(redirect).length === 0) {
    if (loginSuccess.username) {
      history.push("/loginsuccess");
    }
  }
  if (loginSuccess.username)
    if (Object.keys(redirect).length !== 0) {
      if (redirect.quantity)
        history.push(
          `/checkout/${redirect.productid}/${redirect.quantity}/${loginSuccess._id}`
        );
      if (redirect.name)
        history.push(
          `/BulkQuantityQuotation/${redirect.productName}/${redirect.productId}`
        );
      if (redirect.pid) history.push(`/productDetails/${redirect.pid}`);
    }
  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  const handleGoogleLogin = () => {
    window.location.href = `https://v3materialbuyapi.herokuapp.com/users/google`;
  };

  return (
    <div className="userLogin-container">
      <div className="userLogin-bg">
        <img src={userLoginBg} alt="" />
      </div>
      <div className="userLogin-fields">
        <div className="userLogin-text">
          <h1>USER LOGIN</h1>
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
              placeholder="Username / Email Id *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />
          </div>
          <div className="form-group ">
            <i className="ri-lock-2-fill user-icon"></i>

            <AvInput
              className="login-input ml-4"
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              value={user.password}
              onChange={(e) => handleChange(e)}
              id="password"
              placeholder="Enter Password *"
              validate={{
                required: {
                  value: true,
                  errorMessage: "This field is required.",
                },
              }}
            />

            {showPassword ? (
              <i
                class="eye icon"
                type="button"
                onClick={(e) => {
                  setShowPassword(!showPassword);
                }}
              ></i>
            ) : (
              <i
                className="eye slash outline icon"
                type="button"
                onClick={(e) => {
                  setShowPassword(!showPassword);
                }}
              ></i>
            )}
          </div>
          <div className="form-group ">
            <button type="submit" className="userLoginBtn loginBtn ">
              {buttonText}{" "}
            </button>
          </div>

          <p className="text-danger mt-3">{error}</p>

          <div className="form-group ">
            <div className="signup-link d-flex justify-content-center">
              <Link className="newuser__login" to="/usersignup">
                New User? SignUp
              </Link>
              <Link to="#">Forgot Password?</Link>
            </div>
          </div>
        </AvForm>

        {/* Google Login */}
        {/* <GoogleLogin
    clientId="449888918750-7oljqj7f755kjakpnrfhligf6ih0rsu9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  /> */}

        <button onClick={handleGoogleLogin} className="userLoginBtn googleBtn">
          <FcGoogle /> Login with Google
        </button>
        <p className="userLogin-break">OR</p>
        <button className="userLoginBtn reqOtpBtn">Request OTP</button>
        <br />
      </div>
    </div>
  );
};

export default UserLogin;
