import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../../../App";
import "./BulkquotationSuccess.css";


const BulkquotationSuccess = () => {
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="bulkquotationSuccessPage">
      <div className="bulkquotationSuccess-container">
        <h1 className="bulkquotationSuccessHd heading__font">Thank you !<br/>
        <p style={{fontSize:'10' , fontWeight:'670'}}> Our Team will let you know <br/> as soon as possible</p>
        </h1>
        
        <div>
          {/* <Link to="/userprofile/myprofile">
            <button>Complete Profile</button>
          </Link> */}
          <Link to="/home">
            <button class='bulkqutSuccessbtn'>Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BulkquotationSuccess;