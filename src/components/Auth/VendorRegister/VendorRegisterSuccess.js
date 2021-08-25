import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import "./VendorRegister.css";
const VendorRegisterSuccess = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="loginSuccesPage">
      <div className="userLoginSuccess-container">
        <h1 className="LoginSuccessHd heading__font">
          Successfully Registered
        </h1>
        <h3 className="LoginSuccessHd text-white ">
          Wait for admin confirmation, You will receive a mail and and a
          dashboard link after being confirmed by admin.
        </h3>

        <div>
          <Link to="/home">
            <button>Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorRegisterSuccess;
