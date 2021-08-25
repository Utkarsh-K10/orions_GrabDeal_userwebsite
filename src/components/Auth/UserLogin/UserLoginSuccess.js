import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import "./UserLogin.css";
const UserLoginSuccess = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="loginSuccesPage">
      <div className="userLoginSuccess-container">
        <h1 className="LoginSuccessHd heading__font">Logged In Successfully</h1>
        <div>
          <Link to="/userprofile/myprofile">
            <button>Complete Profile</button>
          </Link>
          <Link to="/home">
            <button>Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLoginSuccess;
