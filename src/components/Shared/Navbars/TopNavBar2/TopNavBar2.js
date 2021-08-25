import React, { useContext, useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router";
import axios from "axios";
import _ from "lodash";
import { Search, Segment } from "semantic-ui-react";
import offer from "../TopNavbar/Assets/offer icon.png";
import Modal from "../../ModalBackground/Modal";

import User from "../TopNavbar/Assets/Modal Images/User.svg";
import Corporate from "./Assets/Modal Images/corp.svg";
import Vendor from "./Assets/Modal Images/Forma 1.svg";
import logo from "../TopNavbar/Assets/Logo-materialBuy.png";

import { Header, Button, Popup, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: "white",

    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(3),
      //   width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      //   width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

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
      {/* <Grid.Column width={8} height={2}> */}
      <Grid.Column>
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
    </Grid>
  );
}

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [cartNumber, setCartNumber] = useState(0);
  const [user, setUser] = useState();
  const handleLogout = () => {
    sessionStorage.clear();
    history.push("/");
    window.location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;

    axios.get(userURL).then((response) => {
      setUser(response.data);
      setCartNumber(response.data.cart.length);
    });
  }, [user]);

  useEffect(() => {
    if (sessionStorage.getItem("userinfo")) {
      const user = JSON.parse(sessionStorage.getItem("userinfo"));
      setLoggedInUser(user.loginSuccess);
    }
    // console.log(loggedInUser)
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileMoreAnchorE2, setMobileMoreAnchorE2] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isMenuOpen1 = Boolean(anchorE2);
  const isMobileMenuOpen1 = Boolean(mobileMoreAnchorE2);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen1 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuClose1 = () => {
    setMobileMoreAnchorE2(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuClose1 = () => {
    setAnchorE2(null);
    handleMobileMenuClose1();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen1 = (event) => {
    setMobileMoreAnchorE2(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const menuId1 = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to="/userlogin">Continue as User</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/corporateregister">Continue as Corporate</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/vendorsignup">Continue as Vendor</Link>
      </MenuItem>
    </Menu>
  );

  const renderMenu1 = (
    <Menu
      anchorE2={anchorE2}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId1}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen1}
      onClose={handleMenuClose1}
    >
      <MenuItem>
        <Link to="/userprofile/myprofile">Complete Profile</Link>
      </MenuItem>
      <MenuItem>
        <button className="LogoutBtn" onClick={handleLogout}>
          Log out
        </button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary"></Badge>
        </IconButton> */}

        <Link to="/postEnquiry">
          <p>Post your enquiry</p>
        </Link>
      </MenuItem>

      <MenuItem>
        {/* <IconButton aria-label="show 11 new notifications" color="inherit"> */}
        {/* <Badge badgeContent={11} color="secondary"> */}
        {/* <NotificationsIcon /> */}
        {/* </Badge> */}
        {/* </IconButton> */}
        <Link to="/userprofile/mycart">
          <p>My Cart</p>
        </Link>
      </MenuItem>
      <MenuItem>
        {/* <IconButton aria-label="show 11 new notifications" color="inherit"> */}
        {/* <Badge badgeContent={11} color="secondary"> */}
        {/* <NotificationsIcon /> */}

        {/* <img src={offer} alt="offer-icon" width="35" height="35" /> */}
        {/* </Badge> */}
        {/* </IconButton> */}
        <Link to="/productsall">
          <p>Offer of the day</p>
        </Link>
      </MenuItem>
      {loggedInUser.username ? (
        <MenuItem className="mt-2" onClick={handleProfileMenuOpen1}>
          <p>
            {loggedInUser.firstname} {loggedInUser.lastname}
          </p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
          <p className="pt-3">Sign Up</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img className="Logo " src={logo} alt="logo" />
          </Link>

          <div>
            <SearchExampleStandard></SearchExampleStandard>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
              {/* <Badge> */}
              {/* <MailIcon /> */}
              <Link to="/postEnquiry" className="Enquiry">
                Post your enquiry
              </Link>
              {/* </Badge> */}
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              {/* <Badge> */}
              <Badge badgeContent={cartNumber} color="secondary">
                {/* <MailIcon /> */}
                <Link to="/cart" className="CartIcon">
                  <i class="ri-shopping-cart-2-fill">
                    {/* <span class="badge badge-warning" id="lblCartCount">
                        {cart.length}{" "}
                      </span> */}
                  </i>
                </Link>
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              {/* <Badge badgeContent={17} color="secondary"> */}
              {/* <Badge> */}
              {/* <NotificationsIcon /> */}

              <Link to="/productsall">
                <img src={offer} alt="offer-icon" width="35" height="35" />
              </Link>
              {/* </Badge> */}
            </IconButton>
            <IconButton
              //   edge="end"
              //   aria-label="account of current user"
              //   //   aria-controls={menuId}
              //   aria-haspopup="true"
              //   onClick={handleProfileMenuOpen}
              color="inherit"
            >
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
                    <Link className="LoginLink" to="/corporateregister">
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
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
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
              // <button
              //   onClick={() => setIsOpen(true)}
              //   type="submit"
              //   className="signup-btn "
              // >
              //   Sign Up
              // </button>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar></Avatar>
              </IconButton>
            )}
            <Link to="/userprofile/mycart" className="CartIcon">
              <i class="ri-shopping-cart-2-fill ">
                {/* <span class="badge badge-warning" id="lblCartCount">
                        {cart.length}{" "}
                      </span> */}
              </i>
            </Link>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      {renderMenu}
      {renderMenu1}
    </div>
  );
}
