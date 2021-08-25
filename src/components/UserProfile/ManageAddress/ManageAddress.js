import React, { useContext, useEffect, useState } from "react";
import "./ManageAddress.css";
import AddressForm from "./AddressForm";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import loaderImg from "../../Home/ProductList/assets/circles.svg";
import axios from "axios";
import MoreIcon from "@material-ui/icons/MoreVert";

import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import Notiflix from "notiflix";

const ManageAddress = () => {
  // Code By Rohit - 24 july 2021
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [editCheck, setEditCheck] = useState(true);

  console.log(loggedInUser);

  const togglerEdit = () => {
    editCheck ? setEditCheck(false) : setEditCheck(true);
  };

  const handleAddDelete = (id) => {
    console.log(id);
    Notiflix.Confirm.show(
      "Delete Address?",
      "Are you sure you want to delete this address?",
      "Okay",
      "Cancel ",

      // ok button callback
      function () {
        // users/address/delete/:userid/:addid
        const delAddURL = `${process.env.REACT_APP_USER_API}/address/delete/${loggedInUser._id}/${id}`;
        axios.delete(delAddURL).then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      },

      // cancel button callback
      function () {
        // codes...
      },

      // extend the init options for this confirm box
      {
        width: "320px",
        borderRadius: "8px",

        cancelButtonColor: "#ffffff !important",
        okButtonColor: "#ffffff !important",
        // etc...
      }
    );
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(url).then((response) => {
      setUser(response.data);
      setLoading(false);
    });
  }, [loggedInUser._id]);

  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const content = () => {
    return user?.fulladdress.map((address) => {
      console.log("singleaddress", address);
      return (
        <>
          <div classname="container ">
            <div className=" AddressCard  p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="manageAddress__name  mb-1">
                    {user?.firstname + " " + user?.lastname}
                  </span>
                  <span className="manageAddress__name  ml-4">
                    {user?.phone}
                  </span>
                  <div className="mt-3">
                    <span classname="manageAddress__add">
                      {address?.address +
                        ", " +
                        address?.city +
                        ", " +
                        address?.state +
                        " - "}
                    </span>
                    <span classname="card-text">{address?.pincode}</span>
                  </div>
                </div>

                {/* <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link to="AddressForm">Edit</Link>
                  </MenuItem>
                  <MenuItem onClick={() => handleAddDelete(address)}>
                    Delete
                  </MenuItem>
                </Menu> */}
                <div>
                  <Link
                    to={`AddressForm/${address._id}`}
                    className="manageAddress__edit mb-2"
                  >
                    <p>Edit</p>
                  </Link>

                  <p
                    className="manageAddress__edit mt-2"
                    onClick={() => handleAddDelete(address._id)}
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <div className="MyProfile">
      {loading ? (
        loader()
      ) : (
        <>
          <h2 className="mb-4">Manage Address</h2>
          <Link to="AddAddressForm">
            <div className="step-3 EditAdd align-items-center container text-start d-flex justify-content-start p-4 mt-5 mb-2">
              <HiOutlinePlusCircle className="h1 plusIco" />
              <h3>Add Address</h3>
            </div>
          </Link>
          {content()}
        </>
      )}
    </div>
  );
};

export default ManageAddress;
