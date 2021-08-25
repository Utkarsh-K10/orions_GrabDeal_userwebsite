import React, { useState } from "react";
import "./TopNavbar.css";
import cart from "./Assets/cart.png";
import offer from "./Assets/offer icon.png";
import logo from "./Assets/Logo-materialBuy.png";
import { RiSearchLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImUserCheck } from "react-icons/im";
import Modal from "../../ModalBackground/Modal";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ImMenu } from "react-icons/im";

import User from "./Assets/Modal Images/User.svg";
import Corporate from "./Assets/Modal Images/corp.svg";
import Vendor from "./Assets/Modal Images/Forma 1.svg";
import { useContext } from "react";
import { useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { UserContext } from "../../../../App";
import { Header, Button, Popup, Grid } from "semantic-ui-react";
import axios from "axios";
import Switch from "@material-ui/core/Switch";
import { Search, Segment } from "semantic-ui-react";
import _ from "lodash";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

let products = [];

function SearchExampleStandard() {
  // const [products, setProducts] = useState();
  const imageUrl = process.env.REACT_APP_IMAGE_API;
  const history = useHistory();
  useEffect(() => {
    // const urlCat = `${process.env.REACT_APP_USER_API}/category/show`;
    const urlCat = `${process.env.REACT_APP_USER_API}/showall`;

    axios.get(urlCat).then((response) => {
      console.log("all products", response.data);
      // products.push(...response.data);
      // products = [...response.data];
      const temp = response.data.map((item) => {
        if (item.type === "Product") {
          return {
            id: item.id,
            title: item.product_name,

            type: item.type,
            price: "$" + item.price,
            description: item.description,
            image: imageUrl + item.grid_image,
          };
        } else {
          return {
            id: item.id,
            title: item.title,
            type: item.type,
            // price: product.price,
            description: item.description,

            image: imageUrl + item.grid_image,
          };
        }
      });
      products = [...temp];
    });
  }, []);

  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const [pid, setPid] = useState("");
  const timeoutRef = React.useRef();

  const searchhandler = (pid, type) => {
    if (type === "Product") {
      history.push(`/productDetails/${pid}`);
    }
    if (type === "Category") {
      history.push(`/viewSubcategory/${pid}`);
    }
    if (type === "SubCategory") {
      history.push(`/viewSubSubcategory/${pid}`);
    }
    if (type === "SubSubCategory") {
      history.push(`/viewProducts/${pid}`);
    }
    // window.location.reload();

    // <Redirect path={`/productDetails/${pid}`}></Redirect>;
  };
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }
      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.title);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(products, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <Grid>
      <Grid.Column width={12} height={2}>
        <Search
          loading={loading}
          onResultSelect={(e, data) => {
            setPid();
            searchhandler(data.result.id, data.result.type);
            // dispatch({
            //   type: "UPDATE_SELECTION",
            //   selection: data.result.title,
            //   // selection2: data.result.id,
            // });
          }}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
          placeholder="Search Products by title, supplier, category, brand etc..."
        />
      </Grid.Column>
      {/* <Grid.Column width={10}>
        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify({ loading, results, value }, null, 2)}
          </pre>
          <Header>Options</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(source, null, 2)}
          </pre>
        </Segment>
      </Grid.Column> */}
    </Grid>
  );
}

const TopNavbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [cart, setCart] = useState({});
  const history = useHistory();
  //     const user = JSON.parse(sessionStorage.getItem('userinfo'))
  //   const userId = user.loginSuccess._id;

  useEffect(() => {
    if (sessionStorage.getItem("userinfo")) {
      const user = JSON.parse(sessionStorage.getItem("userinfo"));
      setLoggedInUser(user.loginSuccess);
    }
    // console.log(loggedInUser)
  }, []);
  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/cartdetails`;
    console.log(url);
    axios.get(url).then((res) => setCart(res.data));
  }, []);
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg topNavbar " sticky="top">
        <div class="container-fluid">
          <a class="navbar-brand logo-column" href="#">
            <Link to="/">
              <img className="Logo" src={logo} alt="logo" />
            </Link>
          </a>
          <button
            class="navbar-toggler navbarBtn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <ImMenu />
            </span>
          </button>
          <div
            class="collapse navbar-collapse TopNavbar pb-0 "
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 navbarMiddleSec row">
              <li class="nav-item container-fluid col-lg-8 col-md-12">
                {/* <div className="search-column"> */}
                <form className="search  " action="#">
                  <div className="d-flex justify-content-center">
                    <SearchExampleStandard></SearchExampleStandard>
                    {/* <button type="submit" className="search-btn">
                      Search
                    </button> */}
                  </div>
                  {/* <RiSearchLine className="search-icon"></RiSearchLine>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Products by title, supplier, category, brand etc..."
                    name="search"
                  ></input> */}
                </form>
                {/* </div> */}
                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
              </li>
              <li class="nav-item col-lg-2 col-md-12 col-md-mt-3 text-center ">
                <Link to="/postEnquiry" className="Enquiry">
                  Post your enquiry
                </Link>
                {/* <a class="nav-link" href="#">Link</a> */}
              </li>
              <li class="nav-item col-lg-2 col-md-12 navbarIconSec d-flex justify-content-evenly  ">
                <div className="ml-auto mr-auto pl-1 pr-1">
                  <Link to="/userprofile/mycart" className="CartIcon">
                    <i class="ri-shopping-cart-2-fill">
                      {/* <span class="badge badge-warning" id="lblCartCount">
                        {cart.length}{" "}
                      </span> */}
                    </i>
                  </Link>
                </div>
                <div className="ml-auto mr-auto pl-1 pr-1">
                  <Link to="/productsall">
                    <img src={offer} alt="offer-icon" width="35" height="35" />
                  </Link>
                </div>
                <div className="signup ml-auto mr-auto pl-1 pr-1">
                  {loggedInUser.username ? (
                    <Popup
                      trigger={
                        <Button className="LoggedInuser">
                          <i class="far fa-user"></i>
                        </Button>
                      }
                      flowing
                      hoverable
                    >
                      {" "}
                      <div className="loggedinPopup">
                        <div className="NavbarUsername text-center">
                          {loggedInUser.firstname + " " + loggedInUser.lastname}
                        </div>
                        <Link to="/userprofile/myprofile">
                          {" "}
                          <button className="CompleteProfileBtn">
                            Complete Profile
                          </button>
                        </Link>{" "}
                        <br />
                        <button className="LogoutBtn" onClick={handleLogout}>
                          Log out
                        </button>
                      </div>
                    </Popup>
                  ) : (
                    <button
                      onClick={() => setIsOpen(true)}
                      type="submit"
                      className="signup-btn "
                    >
                      Sign Up
                    </button>
                  )}

                  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="LogInPortal">
                      <div className="LoginOptionHd">
                        LOGIN AS ONE OF THE FOLLOWING
                      </div>
                      <div className="LoginOption">
                        <Link className="LoginLink" to="/userlogin">
                          <div className="LoginOptionlink">
                            <img
                              className="LoginImage"
                              src={User}
                              alt="User Icon"
                              height="150vh"
                              width="150vh"
                            />
                            <br />
                            <a className="ContinueLoginLink" href="#">
                              Continue as User
                            </a>
                          </div>
                        </Link>
                        <Link className="LoginLink" to="/corporatelogin">
                          <div className="LoginOptionlink">
                            <img
                              className="LoginImage"
                              src={Corporate}
                              alt="User Icon"
                              height="150vh"
                              width="150vh"
                            />
                            <br />
                            <a className="ContinueLoginLink" href="#">
                              Continue as Corporate
                            </a>
                          </div>
                        </Link>
                        <Link className="LoginLink" to="/vendorsignup">
                          <div className="LoginOptionlink">
                            <img
                              className="LoginImage"
                              src={Vendor}
                              alt="User Icon"
                              height="150vh"
                              width="150vh"
                            />
                            <br />
                            <a className="ContinueLoginLink" href="#">
                              Continue as Vendor
                            </a>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Modal>
                </div>
              </li>
            </ul>

            {/* <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavbar;
