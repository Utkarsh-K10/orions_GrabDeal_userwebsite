import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import "./enquirySuccess.css";


const enquirySuccess = () => {
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className="enquirySuccessPage">
      <div className="enquirySuccess-container">
        <h1 className="enquirySuccessHd heading__font">Thank you !<br/>
        <p style={{fontSize:'10' , fontWeight:'670'}}> Our Team will let you know <br/> as soon as possible</p>
        </h1>
        
        <div>
          {/* <Link to="/userprofile/myprofile">
            <button>Complete Profile</button>
          </Link> */}
          <Link to="/home">
            <button class='enqSuccessbtn'>Go to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default enquirySuccess;
