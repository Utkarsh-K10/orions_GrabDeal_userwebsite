import React, { useContext, useEffect, useState } from "react";
import "./UserCard.css";
import UserImg from "./Assets/L1.png";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../../../App";
import axios from "axios";
import loaderImg from "../../Home/ProductList/assets/circles.svg";
import { Link } from "react-router-dom";

function UserCard({ firstName, lastName }) {
  const loader = () => {
    return (
      <div className="">
        <img src={loaderImg} alt="not found"></img>
      </div>
    );
  };
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(userURL).then((response) => {
      setUser(response.data);
      setLoading(false);
    });
  }, [loggedInUser._id, user?.profilepicture]);
  // image={}

  return (
    <div className="UsercardData">
      <div className="UserPic">
        {loading ? (
          loader()
        ) : (
          <>
            {user?.profilepicture ? (
              <Link to={`/userprofile/imageupload/${user?._id}`}>
                <Avatar
                  src={process.env.REACT_APP_IMAGE_API + user?.profilepicture}
                ></Avatar>
              </Link>
            ) : (
              <Link to={`imageupload/${user?._id}`}>
                <img src={UserImg} alt="User Profile" />
              </Link>
            )}
          </>
        )}
      </div>
      <div className="UserData">
        <div className="UsercardGreeting">Hello,</div>
        <div className="UsercardName">{firstName + " " + lastName}</div>
      </div>
    </div>
  );
}

export default UserCard;
