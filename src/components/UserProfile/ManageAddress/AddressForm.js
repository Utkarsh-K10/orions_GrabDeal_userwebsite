import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../App";
// import "./ManageAddress.css";
import { s_a, state_arr } from "./cities";

function AddressForm() {
  const { id } = useParams();

  const print_state = () => {
    let i = 0;
    const data = state_arr.map((index, entry) => {
      return (
        <option value={entry} data-id={i}>
          {index}
        </option>
      );
    });
    return data;
  };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({});

  const [userAddress, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const history = useHistory();
  const [editCheck, setEditCheck] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const [pincodeError, setPincodeError] = useState(false);
  const [landmarkError, setlandmarkError] = useState(false);
  const [addressError, setaddressError] = useState(false);

  const [errorText, setErrorText] = useState("");

  const INPUT_VALIDATOR = /[ `0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(url).then((response) => {
      setUser(response.data);

      response.data?.fulladdress.map((address) => {
        if (address._id === id) {
          setAddress(address?.address);
          setCity(address?.city);
          setState(address?.state);
          setLandmark(address?.landmark);
          setPincode(address?.pincode);
        }
      });
    });
  }, [loggedInUser._id]);

  const saveData = () => {
    axios
      .put(
        `${process.env.REACT_APP_USER_API}/address/update/${loggedInUser._id}/${id}`,
        {
          address: userAddress,
          // street: loggedInUser.street,
          // area: loggedInUser.area,
          city: city,
          state: state,
          pincode: pincode,
          landmark: landmark,
          // delivery_address: loggedInUser.delivery_address,
          // shipping_address: loggedInUser.shipping_address,
          // billing_address: loggedInUser.billing_address,
        }
      )
      .then((res) => {
        console.log(res.data);
        history.goBack();
      });
  };

  const [cities, setCities] = useState();
  const handleCity = (e) => {
    setState(state_arr[e.target.value]);
    const ind = +e.target.value + 1;
    const temp = s_a[ind].split("|");

    const cities = temp.map((entry) => {
      return <option value={entry}>{entry}</option>;
    });
    setCities(cities);
  };

  return (
    <div className="MyProfile">
      <h2>Edit Address </h2>
      <form
        className="container mt-5 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveData();
        }}
      >
        <div className="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="30,Shri Ram Darshan soc, Andheri Mumbai"
            value={userAddress}
            onChange={(e) => {
              if (e.target.value.trim().length != 0) {
                if (pincodeError) {
                } else {
                  setErrorText("");
                  setDisableButton(false);
                }
                setaddressError(false);
              } else {
                setaddressError(true);
                setDisableButton(true);
                setErrorText("Address cannot be empty");
              }
              setAddress(e.target.value);
            }}
            required
          />
        </div>

        <div className="form-group">
          <div className="form-row align-items-center">
            <div className="col-md-6 mb-3">
              <label for="state">State</label>

              <select
                onChange={handleCity}
                id="id"
                name="stt"
                class="form-control"
                required
              >
                <option value={state}>{state}</option>
                {print_state()}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label for="city">City</label>

              <select
                id="id"
                class="form-control"
                required
                onChange={(e) => setCity(e.target.value)}
              >
                <option value={city}>{city}</option>
                {cities}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="form-row align-items-center">
            <div className="col-md-6 mb-3">
              <label for="landmark">Landmark</label>
              <input
                type="text"
                className={`form-control ${landmarkError ? "text-danger" : ""}`}
                name="landmark"
                placeholder="SeaLink"
                value={landmark}
                onChange={(e) => {
                  if (INPUT_VALIDATOR.test(e.target.value)) {
                    setErrorText("Cannot contain special characters");
                    setlandmarkError(true);
                    setDisableButton(true);
                  } else {
                    if (pincodeError) {
                      setErrorText("Not a valid pincode");
                    } else {
                      setErrorText("");
                      setDisableButton(false);
                    }
                    setlandmarkError(false);
                  }

                  setLandmark(e.target.value);
                }}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label for="pincode">Pin Code</label>
              <input
                type="number"
                className={`form-control ${pincodeError ? "text-danger" : ""}`}
                name="pincode"
                placeholder="440037"
                value={pincode}
                onChange={(e) => {
                  if (e.target.value.length < 6 || e.target.value.length > 6) {
                    setErrorText("Not a valid pincode");
                    setPincodeError(true);
                    setDisableButton(true);
                  } else {
                    if (landmarkError) {
                      setErrorText("Cannot contain special characters");
                    } else {
                      setErrorText("");
                      setDisableButton(false);
                    }
                    setPincodeError(false);
                  }
                  setPincode(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <p className="text-danger">{errorText}</p>

        <button
          type="submit"
          className="SaveAddressBtn mr-5"
          disabled={disableButton}
        >
          Save Address
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
