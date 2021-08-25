import axios from "axios";
import Notiflix from "notiflix";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../../App";
// import "./ManageAddress.css";
<style></style>;

function ChangePasswordForm() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [newPassInput, setNewPassInput] = useState("");
  const [confPassInput, setConfPassInput] = useState("");

  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [viewNewPass, setViewNewPass] = useState(false);
  const [viewConfPass, setViewConfPass] = useState(false);
  const history = useHistory();

  const [errorText, setErrorText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setNewPassInput("");
    setConfPassInput("");
    console.log(oldPasswordInput);
    if (newPassInput === confPassInput) {
      console.log("userid", loggedInUser._id);
      const passURL = `${process.env.REACT_APP_USER_API}/change-password/${loggedInUser._id}`;
      axios
        .put(passURL, {
          oldPassword: oldPasswordInput,
          newPassword: confPassInput,
        })
        .then((res) => {
          Notiflix.Report.success("Success", `${res.data}`, "Okay");
        })
        .catch((err) => {
          setErrorText("Old Password Incorrect");
        });

      // Notiflix.Report.success(
      //   "Success",
      //   "Password Changed Successfully",
      //   "Okay",

      //   {
      //     okButtonColor: "#ffffff !important",
      //     success: {
      //       okButtonColor: "#ffffff !important",
      //       buttonBackground: "#f39c12",
      //       buttonColor: "#fff",
      //       svgColor: "#f39c12",
      //       titleColor: "#f39c12",
      //       messageColor: "#f39c12",
      //       buttonColor: "#fff",
      //       backOverlayColor: "rgba(0,0,0,0.1)",
      //       okButtonColor: "#ffffff !important",
      //     },
      //   }
      // );
      //     });
      // }
    }
  };

  return (
    <div>
      <div className="AddressBox">
        <div className="HdMain">
          <span className="formHd">Change Password</span>
        </div>
        <form className="container mt-5 mb-4 " onSubmit={submitHandler}>
          <div className="col-md-6 mb-3">
            <label for="newpass">Old Password</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control mr-5"
                onChange={(e) => setOldPasswordInput(e.target.value)}
                name="oldpass"
                placeholder="Old Password"
                value={oldPasswordInput}
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="newpass">New Password</label>
            <div className="d-flex align-items-center">
              <input
                type={`${viewNewPass ? "text" : "password"}`}
                className="form-control mr-5"
                onChange={(e) => setNewPassInput(e.target.value)}
                name="newpass"
                placeholder="New Password"
                value={newPassInput}
                required
              />
              {!viewNewPass ? (
                <i
                  class="eye icon"
                  type="button"
                  onClick={() => {
                    setViewNewPass(!viewNewPass);
                  }}
                ></i>
              ) : (
                <i
                  class="eye slash outline icon"
                  type="button"
                  onClick={() => {
                    setViewNewPass(!viewNewPass);
                  }}
                ></i>
              )}
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="confnewpass">Confirm New Password</label>
            <div className="d-flex align-items-center">
              <input
                type={`${viewConfPass ? "text" : "password"}`}
                className={`form-control ${
                  isDisabled ? "text-danger" : ""
                } mr-5`}
                name="confnewpass"
                value={confPassInput}
                onChange={(e) => {
                  if (e.target.value !== newPassInput) {
                    setErrorText("Password didn't match!!");
                    setIsDisabled(true);
                  } else {
                    setErrorText("");
                    setIsDisabled(false);
                  }

                  setConfPassInput(e.target.value);
                }}
                placeholder="Confirm New Password"
                required
              />
              {!viewConfPass ? (
                <i
                  class="eye icon"
                  className=" eye icon "
                  type="button"
                  onClick={() => {
                    setViewConfPass(!viewConfPass);
                  }}
                ></i>
              ) : (
                <i
                  class="eye slash outline icon"
                  type="button"
                  onClick={() => {
                    setViewConfPass(!viewConfPass);
                  }}
                ></i>
              )}
            </div>
          </div>
          <p className="text-danger">{errorText}</p>

          <button
            type="submit"
            className="SaveAddressBtn mr-5"
            disabled={isDisabled}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
