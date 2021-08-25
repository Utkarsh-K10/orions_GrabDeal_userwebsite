import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import { Dropdown } from "semantic-ui-react";
import { UserContext } from "../../../App";

import { Checkbox } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import Notiflix from "notiflix";

const ProfileUpdate = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [profileImage, setProfileImage] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(url).then((res) => {
      console.log("res,", res.data);
      setUser(res.data);
      setFname(res.data.firstname);
      setLname(res.data.lastname);
      setGender(res.data.gender);
      setNo(res.data.phone);
      setCurrGender(res.data.gender);
      setGst(res.data.gst_number);
      setCompany(res.data.company);
    });
  }, [loggedInUser]);
  console.log("userzz", user);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [no, setNo] = useState("");
  const [email, setEmail] = useState("");
  const [cancelCheck, setCancelCheck] = useState(true);
  const [company, setCompany] = useState("");
  const [gst, setGst] = useState("");
  const [gstin, setGstin] = useState("08AABCU9603R1ZN");
  const [editCheck, setEditCheck] = useState(true);
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [currGender, setCurrGender] = useState("");

  const Gstoptions = [
    {
      key: 1,
      value: "08AABCU960R1ZN",
      text: "08AABCU960R1ZN",
    },
    {
      key: 2,
      value: "09BBACU90R2ZN",
      text: "08AABCU960R1ZN",
    },
  ];

  // console.log("loggedinuser..", loggedInUser);

  const togglerEdit = () => {
    editCheck ? setEditCheck(false) : setEditCheck(true);
  };

  const [disableGST, setDisableGST] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    // e.persist();

    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/updateprofile`;
    axios
      .post(url, {
        first_name: fname,
        last_name: lname,
        age: 22,
        gender: gender,
        phone: no,
        gst_number: gst,
        company: company,
      })
      .then((res) => {
        // setMessage(res.data);
        Notiflix.Report.success(
          "Success",
          "Profile Updated Successfully",
          "Okay"
        );
      });
  };

  const handleDropDownSelect = (event, data) => {
    setGst(data.value);
  };
  return (
    <div className="MyProfile">
      {/* <h1 className="profileHd">MY PROFILE</h1> */}
      <h2>My Profile</h2>
      <form onSubmit={handlesubmit}>
        <div className="details">
          <div className="HdMain">
            <span className="formHd">Personal Details</span>
            <span className=" edittogglespan">
              <button className="EditBtn" type="submit">
                Edit
              </button>
              {/* <Checkbox  onClick={togglerEdit} toggle/> */}
              <label class="switch">
                <input type="checkbox" onClick={togglerEdit} />
                <span class="sliderswitch round"></span>
              </label>
            </span>
          </div>
          <div className="profilecol mt-3">
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                defaultValue={fname}
                disabled={editCheck}
              />
            </div>
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                defaultValue={user?.lastname}
                placeholder="Last Name"
                disabled={editCheck}
              />
            </div>
          </div>
          <div className="profilecol">
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setNo(e.target.value);
                }}
                defaultValue={user?.phone}
                placeholder="Phone Number"
                disabled={editCheck}
              />
            </div>
            <div className="InputRow"></div>{" "}
          </div>

          <div className="InputRow"></div>
          <div className="InputLabel">Gender</div>
          <label className="CancelForm">
            <input
              type="radio"
              name="key"
              value="male"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "male"}
              disabled={editCheck}
            />
            <span style={{ fontFamily: "'Montserrat', sans-serif" }}>Male</span>
          </label>
          <label>
            <input
              type="radio"
              name="key"
              value="female"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "female"}
              disabled={editCheck}
            />
            <span style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Female
            </span>
          </label>
          <br />

          {/* <input className="Radio" type="radio" id="male" name="gender" value="male"/>
          <label className="Radio" for="male">Male</label>
          <input className="Radio"  type="radio" id="female" name="gender" value="female"/>
          <label className="Radio" for="female">Female</label><br/> */}
        </div>
        <div className="details">
          {/* <form> */}
          <div className="HdMain">
            <span className="formHd">Email Address</span>
            {/* <span>
              <button className="EditBtn">Edit</button>
            </span> */}
            <span>
              <Link to="ChangePassword">
                <button className="ChangePswdBtn">Change Password</button>
              </Link>
            </span>
          </div>
          <div className="profilecol">
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                defaultValue={loggedInUser.username}
                placeholder="Email Address"
                disabled
              />
            </div>
          </div>
          {/* </form> */}
        </div>
        <div className="details">
          <div className="HdMain">
            <span className="formHd">Company/ Organization</span>
            <span>{/* <button className="EditBtn">Edit</button> */}</span>
            <div className="ImpNote">billing will be done on this name</div>
          </div>
          <div className="profilecol">
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                placeholder="Company/ organization name"
                value={company}
                placeholder="Company/ organization name"
                disabled={editCheck}
              />
            </div>
          </div>
        </div>
        <div className="details">
          <div className="HdMain">
            <span className="formHd">GST Number</span>
            {/* <span>
              <button className="EditBtn">Edit</button>
            </span> */}
            <div className="ImpNote">required for billing purpose</div>
          </div>
          <div className="profilecol">
            <div className="InputRow">
              <input
                className="DetailInput"
                onChange={(e) => {
                  setGst(e.target.value);
                }}
                placeholder="GST/ UIN Number"
                value={gst}
                disabled={editCheck || disableGST}
              />
            </div>
          </div>
          <div className="profilecol gstOptRow">
            <input
              className="Check"
              type="checkbox"
              id="GST"
              name="GST"
              value="GST No"
              onChange={(e) => {
                setGst("");
                setDisableGST(!disableGST);
              }}
            />
            <label for="GST" className="GSTNo">
              {" "}
              No, I don't have GST/UIN Number
            </label>
            <br></br>
          </div>
          <div className="orRow">
            <span className="Hr"> </span>
            <span>OR</span>
            <span className="Hr"></span>
          </div>
        </div>
        <div className="details">
          <label className="GSTNo">
            Select GST Number from below saved list
          </label>
          <br />

          <Dropdown
            disabled={editCheck || disableGST}
            placeholder={gstin}
            fluid
            onChange={handleDropDownSelect}
            selection
            options={Gstoptions}
          />
        </div>
        {!editCheck ? (
          <div className="d-flex justify-content-between">
            <p className="text-success font-weight-bold">{message}</p>
            <button className="userLoginBtn updatebtn " type="submit">
              Update
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ProfileUpdate;
