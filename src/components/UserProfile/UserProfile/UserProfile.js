import React, { useContext, useEffect, useState, useRef } from "react";
import { Dropdown } from "semantic-ui-react";
import "./UserProfile.css";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import { UserContext } from "../../../App";
import UserProfileRoute from "../UserProfileRoute/UserProfileRoute";
import TopNavbar from "../../Shared/Navbars/TopNavbar/TopNavbar";
import CategoryNavbar from "../../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import Footer from "../../Shared/Footer/Footer";
import UserCard from "../UserCard/UserCard";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { RiShutDownLine } from "react-icons/ri";
import { VscMenu } from "react-icons/vsc";
import PrivateRoute from "../../Auth/PrivateRoute/PrivateRoute";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import logo from "./Assets/3dpng.png";
// import logo from "../../Shared/Navbars/TopNavbar/Assets/Modal Images/3dpng.png";
import { CgSidebarOpen } from "react-icons/cg";
import { HiUserCircle } from "react-icons/hi";
import PrimarySearchAppBar from "../../Shared/Navbars/TopNavBar2/TopNavBar2";

import axios from "axios";
import { Avatar } from "@material-ui/core";
import BottomFooter from "../../Shared/Footer/BottomFooter";

const UserProfile = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selected, setSelected] = useState("My Profile");
  const [user, setUser] = useState();

  const history = useHistory();
  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };
  const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isActive, setIsActive] = useState(false);

  const onClick = () => setIsActive(!isActive);

  let { path, url } = useRouteMatch();
  const temp = useRouteMatch();
  // const navId = useParams();

  const UserProfileContent = () => {
    return (
      <div className="SidebarToggleMenu ">
        <Link onClick={onClick} to="/">
          <img className="Logo-userProfile" src={logo} alt="#" />
        </Link>

        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row">
            <AiOutlineUser className="SidebarIcon" />
          </div>
          <div classname="Sidebar-row">ACCOUNT</div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/myprofile`}
            >
              My Profile
            </Link>
          </div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/manageaddress`}
            >
              Manage Address
            </Link>
          </div>
        </div>
        <hr className="sidebar-hr" />
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row">
            <AiOutlineShoppingCart className="SidebarIcon" />
          </div>
          <div classname="Sidebar-row mt-2">STUFF</div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/wishlist`}
            >
              Wishlist
            </Link>
          </div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/mycart`}
            >
              My Cart
            </Link>
          </div>
        </div>
        <hr className="sidebar-hr" />
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row">
            <RiShoppingBagLine className="SidebarIcon" />
          </div>
          <div classname="Sidebar-row">ORDERS</div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/orderhistory`}
            >
              Order History
            </Link>
          </div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row"> </div>
          <div classname="Sidebar-row">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/trackorder`}
            >
              Track Order
            </Link>
          </div>
        </div>
        <div className="Sidebar-col mt-2">
          <div classname="Sidebar-row "> </div>
          <div classname="Sidebar-row  ">
            <Link
              onClick={onClick}
              className="siderbar-options"
              to={`${url}/cancelorder`}
            >
              Cancel Order
            </Link>
          </div>
        </div>
        <hr className="sidebar-hr" />
        <div className="Sidebar-col ">
          <div classname="Sidebar-row">
            <RiShutDownLine className="SidebarIcon" />
          </div>
          <div onClick={onClick} onClick={handleLogout} classname="Sidebar-row">
            <span style={{ cursor: "pointer" }}>LOG OUT</span>
          </div>
        </div>
      </div>
    );
  };

  // const uploadProfileHandler = () => {};
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>

      <CategoryNavbar></CategoryNavbar>
      <ServiceNavbar></ServiceNavbar>

      <button className="UserProfileMenuBtn" onClick={onClick}>
        <HiUserCircle className="Usericon" />
      </button>
      <nav
        ref={dropdownRef}
        className={`profileList ${isActive ? "active" : "inactive"}`}
      >
        <UserProfileContent />
      </nav>

      <div className="userProfilePortal">
        <div className="sidebar">
          <div className="Usercard">
            <UserCard
              // onClick={uploadProfileHandler}
              firstName={loggedInUser?.firstname}
              lastName={loggedInUser?.lastname}
            />
            {/* <Avatar></Avatar>
            <img
              className="userProfilePic"
              src=
              alt=""
            /> */}
          </div>
          <div className="SidebarMenu">
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row">
                <AiOutlineUser className="SidebarIcon" />
              </div>
              <div classname="Sidebar-row">ACCOUNT</div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "My Profile" ? "selected" : ""
                  }`}
                  to={`${url}/myprofile`}
                  onClick={() => setSelected("My Profile")}
                >
                  My Profile
                </Link>
              </div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "Manage Address" ? "selected" : ""
                  }`}
                  to={`${url}/manageaddress`}
                  onClick={() => setSelected("Manage Address")}
                >
                  Manage Address
                </Link>
              </div>
            </div>
            <hr className="sidebar-hr" />
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row">
                <AiOutlineShoppingCart className="SidebarIcon" />
              </div>
              <div classname="Sidebar-row mt-2">STUFF</div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "Wishlist" ? "selected" : ""
                  }`}
                  to={`${url}/wishlist`}
                  onClick={() => setSelected("Wishlist")}
                >
                  Wishlist
                </Link>
              </div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "My Cart" ? "selected" : ""
                  }`}
                  to={`${url}/mycart`}
                  onClick={() => setSelected("My Cart")}
                >
                  My Cart
                </Link>
              </div>
            </div>
            <hr className="sidebar-hr" />
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row">
                <RiShoppingBagLine className="SidebarIcon" />
              </div>
              <div classname="Sidebar-row">ORDERS</div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "Order History" ? "selected" : ""
                  }`}
                  to={`${url}/orderhistory`}
                  onClick={() => setSelected("Order History")}
                >
                  Order History
                </Link>
              </div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row"> </div>
              <div classname="Sidebar-row">
                <Link
                  className={`siderbar-options ${
                    selected === "Track Order" ? "selected" : ""
                  }`}
                  to={`${url}/trackorder`}
                  onClick={() => setSelected("Track Order")}
                >
                  Track Order
                </Link>
              </div>
            </div>
            <div className="Sidebar-col mt-2">
              <div classname="Sidebar-row "> </div>
              <div classname="Sidebar-row  ">
                <Link
                  className={`siderbar-options ${
                    selected === "Cancel Order" ? "selected" : ""
                  }`}
                  to={`${url}/cancelorder`}
                  onClick={() => setSelected("Cancel Order")}
                >
                  Cancel Order
                </Link>
              </div>
            </div>
            <hr className="sidebar-hr" />
            <div className="Sidebar-col ">
              <div classname="Sidebar-row">
                <RiShutDownLine className="SidebarIcon" />
              </div>
              <div onClick={handleLogout} classname="Sidebar-row">
                <span style={{ cursor: "pointer" }}>LOG OUT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <Switch>
            <PrivateRoute path={`${path}/:navId/:id`}>
              <UserProfileRoute></UserProfileRoute>
            </PrivateRoute>

            <PrivateRoute path={`${path}/:navId`}>
              <UserProfileRoute></UserProfileRoute>
            </PrivateRoute>
          </Switch>
        </div>
      </div>
      {/* <Footer></Footer> */}
      <BottomFooter></BottomFooter>
    </div>
  );
};

export default UserProfile;
