import React, { useEffect, useState } from "react";
// import "./SingleProduct.css";
import "./SingleProduct1.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, useHistory, useParams } from "react-router-dom";
import loaderImg from "./../Shared/Navbars/TopNavbar/Assets/3dpng.png";
import axios from "axios";
import Review from "./Review";
import ViewProduct from "./ViewProduct";
import CompareProducts from "./CompareProductsList";
import TopNavbar from "../Shared/Navbars/TopNavbar/TopNavbar";
import CategoryNavbar from "../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import Footer from "../Shared/Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Chart } from "react-google-charts";
import InnerImageZoom from "react-inner-image-zoom";
import "./InnerZoomStyle.css";
import Specifications from "./Specifications";
import Notiflix from "notiflix";
import PrimarySearchAppBar from "../Shared/Navbars/TopNavBar2/TopNavBar2";
import { Breadcrumbs, Typography } from "@material-ui/core";
import BottomFooter from "../Shared/Footer/BottomFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";

function Product({ id }) {
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("ADD TO CART");
  const [cart, setCart] = useState([]);
  const { productId } = useParams();
  const [isProdPresent, setIsProdPresent] = useState(false);
  const [cartText, setCartText] = useState("");
  const [isWishlistPresent, setIsWishlistPresent] = useState(false);

  const [displayRate, setDisplayRate] = useState(false);
  const [wishList, setWishList] = useState([]);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    const url = process.env.REACT_APP_PRODUCT_SINGLE + `${productId}`;
    axios.get(url).then((res) => {
      setSingleProduct(res.data);
      setLoading(false);
    });
  }, []);

  const [singleProduct, setSingleProduct] = useState([]);
  // console.log("single product", singleProduct);
  const [imgUrl, setImgUrl] = useState([]);
  const [lengthArea, setlengthArea] = useState();
  const [widthArea, setwidthArea] = useState();
  const [area, setArea] = useState();
  // console.log("singleproduct", singleProduct);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const url =
      typeof singleProduct.gridimages == `object`
        ? process.env.REACT_APP_IMAGE_API + `${singleProduct.gridimages[0]}`
        : process.env.REACT_APP_IMAGE_API + `${singleProduct.gridimages}`;
    setImageUrl(url);
    setImgUrl(url);
  }, [singleProduct]);

  const [features, setfeatures] = useState([
    "Type of Product",
    "Lift Height",
    "Min. Fork Height",
    "Max. Fork Height",
    "Fork Length",
  ]);

  // console.log("imageurl", typeof imageUrl);
  const [ProductDesc, setProductDesc] = useState(
    "Feature durable wood plankes for max support, Delivering Strength to ur things"
  );
  const [quantity, setquantity] = useState(5);
  const [minQty, setminQty] = useState(5);
  const [pinCode, setPinCode] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setPinCode(e.target.value);
    if (pinCode.length < 6) {
      setError("Enter 6 digit pincode only!");
    } else {
      setError(" ");
    }
  };

  useEffect(() => {
    if (loggedInUser._id) {
      const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/wishlist`;
      axios.get(url).then((res) => {
        setWishList(res.data);
      });
    }
  }, [loggedInUser._id]);

  const wishlistids = [];
  if (wishList) {
    wishList.map((item) => {
      wishlistids.push(item.productid);
    });
  }

  useEffect(() => {
    if (wishlistids.length !== 0) {
      if (wishlistids.includes(productId)) {
        // console.log("wishpresent");
        setIsWishlistPresent(true);
      } else {
        setIsWishlistPresent(false);
        // console.log("wishpresent not");
      }
    }
  }, [wishlistids]);
  const availability = "Available";
  const state = {
    labels: ["10", "11", "12", "13", "14"],
    datasets: [
      {
        label: "Price",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1300, 1400, 1500, 1100, 1500],
      },
    ],
  };
  const mainImageChanger = (img) => {
    const newImgUrl = process.env.REACT_APP_IMAGE_API + `${img}`;
    setImgUrl(newImgUrl);
  };

  const [zoomImg, setZoomImg] = useState();
  const gridImageDisplay = () => {
    return singleProduct.gridimages.map((image, index) => {
      if (index < 3) {
        return (
          <div className="mr-2">
            <img
              className="imageprod"
              src={process.env.REACT_APP_IMAGE_API + `${image}`}
              onClick={() => mainImageChanger(image)}
              width="300"
              style={{ margin: "2px" }}
              alt="errr"
            />
          </div>
        );
      }
    });
  };

  // console.log("imageUrl", imageUrl);
  const Areaitem = () => {
    return (
      <div class="smod">
        <h3 className="mt-5">Area 1 </h3>
        <div className="Area">
          <div className="forlen m-3">
            <div>
              <label for="length">Length :</label>
            </div>
            <div class="input-group mb-3 col">
              <input
                type="text"
                value={lengthArea}
                onChange={(e) => setlengthArea(e.target.value)}
                class="form-control"
                placeholder="Length"
              />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">
                  ft
                </span>
              </div>
            </div>
          </div>
          <div className="forwidth m-3">
            <div>
              <label for="width">Width :</label>
            </div>
            <div class="input-group mb-3 col">
              <input
                type="text"
                value={widthArea}
                onChange={(e) => setwidthArea(e.target.value)}
                class="form-control"
                placeholder="Width"
              />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">
                  ft
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex calculate mt-5">
          <button
            className=" colord btn-lg btn-default mr-4"
            onClick={() => setArea(lengthArea * widthArea)}
          >
            Calculate
          </button>
          <div className="ml-4 d-flex flex-column justify-content-between">
            <span>Total Coverage</span>

            <span>Units Recommended</span>

            <span>Estimated Cost.</span>
          </div>
          <div className="ml-4 d-flex flex-column justify-content-between">
            <span className="ml-4">{area} sq. ft</span>
            <span className="ml-4">50 units</span>
            <span className="ml-4">500 /-</span>
          </div>
        </div>

        <div
          className="  d-flex justify-content-end  close"
          data-dismiss="modal"
        >
          <a href="#">
            <h3 className="colord">Go Back</h3>
          </a>
        </div>
      </div>
    );
  };

  const wishlist = (id) => {
    if (document.getElementById("wishheart").classList.contains("is-active")) {
      document.getElementById("wishheart").classList.remove("is-active");
      // document.getElementById(id).classList.add("color-gray");
      const removeFromList = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${productId}/removefromlist`;

      axios.post(removeFromList).then((res) => {
        Notiflix.Notify.failure("Item has been removed from wishlist", {
          position: "right-bottom",
          timeout: 2000,
        });
        // console.log(res.data);
      });
    } else {
      document.getElementById("wishheart").classList.add("is-active");
      // document.getElementById(id).classList.remove("color-gray");
      const addToWishlistUrl = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${productId}/addtolist`;
      axios.post(addToWishlistUrl).then((res) => {
        Notiflix.Notify.success("Item has been added to wishlist", {
          position: "right-bottom",
          timeout: 2000,
        });
      });
    }
  };

  const featuresDisplay = () => {
    return features.map((feature) => {
      return <li class=" productFeatList">{feature}</li>;
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F4F7";
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/cartdetails`;
    // console.log(url);
    axios.get(url).then((res) => {
      setCart(res.data);
    });
  }, [loggedInUser._id, setCart]);

  const handleCartRemove = () => {
    // console.log(productId);

    Notiflix.Confirm.show(
      "Remove from cart?",
      "Are you sure you want to remove this product from the cart?",
      "Okay",
      "Cancel ",

      // ok button callback
      function () {
        // codes...
        const removeCartUrl = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${productId}/removefromcart`;
        axios.post(removeCartUrl).then((res) => {
          res.data && window.location.reload();
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

  const productids = [];
  if (cart) {
    cart.map(({ productid }) => productids.push(productid));
  }

  useEffect(() => {
    if (productids.length !== 0) {
      if (productids.includes(productId)) {
        setIsProdPresent(true);
        setButtonText("REMOVE");
      } else {
        setIsProdPresent(false);
        setButtonText("ADD TO CART");
      }
    }
  }, [productids]);

  const handleAddToCart = () => {
    const url = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/products/${productId}/addtocart`;
    loggedInUser.username
      ? axios.post(url, {}).then((res) => {
          setButtonText("REMOVE");
          setCartText("Product Added To cart");
          Notiflix.Report.success(
            "Success",
            "Product Successfully Added to Cart",
            "Okay"
          );
          window.location.reload();
          setIsProdPresent(true);
          setButtonText("REMOVE");
        })
      : history.push("/userlogin");
  };
  const history = useHistory();

  const productPage = () => {
    return (
      <>
        <div>
          {/* <TopNavbar /> */}
          <PrimarySearchAppBar></PrimarySearchAppBar>

          <CategoryNavbar />
          <ServiceNavbar />

          <div className="SingleProductPage p-0 p-sm-4 p-md-4 p-lg-4 pt-0">
            <div className="container-fluid pr-sm-0 pl-sm-0">
              <div className="row  product__container">
                <div className="col-lg-9 producttab mt-2 col-md-12 mb-lg-0">
                  <div className="d-flex justify-content-between pt-3 pr-3 pb-0 colord p-0">
                    <div>
                      <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link
                          className="productbreadcrums"
                          color="inherit"
                          href="/"
                          to="/"
                        >
                          {/* <Link color="inherit" href="/" onClick={handleClick}> */}
                          Home
                        </Link>
                        <Link
                          color="inherit"
                          className="productbreadcrums"
                          href="/getting-started/installation/"
                          // onClick={handleClick}
                        >
                          {singleProduct.category}
                        </Link>
                        <Link
                          color="inherit"
                          className="productbreadcrums"
                          href="/getting-started/installation/"
                          // onClick={handleClick}
                        >
                          {singleProduct.subcategory}
                        </Link>
                        <Link
                          color="inherit"
                          className="productbreadcrums"
                          href="/getting-started/installation/"
                          // onClick={handleClick}
                        >
                          {singleProduct.subsubcategory}
                        </Link>
                        <Typography
                          className="productbreadcrums"
                          color="textPrimary"
                        >
                          {" "}
                          {singleProduct.product_name}
                        </Typography>
                      </Breadcrumbs>
                    </div>
                    <strong>
                      <u className="viewdiscount__product">View Discounts</u>
                    </strong>
                  </div>
                  <hr className="breadcrumb__divider" />
                  <div className="container pl-0 pr-0 pl-md-2 pr-md-2 singleproduct__container1">
                    <div className="d-flex singleproduct__container">
                      {/* <div className="col-lg-3 col-mb-3 pl-0 pr-0 pl-md-2 pr-md-2"> */}
                      <div className="singleproduct__containerheart">
                        {/* <div> */}
                        <div className="ml-5 mr-5 mt-5 loopimage  align-middle">
                          <div className="align-middle prevImg m-2">
                            <i
                              class="fa fa-caret-left fa-2x"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <ReactImageMagnify
                            className="zoomImagezind"
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                // isFluidWidth: true,
                                // src: watchImg687,
                                src: `${imgUrl}`,
                                width: 200,
                                height: 200,
                                sizes:
                                  "(max-width: 480px) 10px, (max-width: 1200px) 30px, 360px",
                              },
                              largeImage: {
                                src: `${imgUrl}`,

                                width: 2400,
                                height: 2400,
                                sizes:
                                  "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                              },

                              isHintEnabled: true,
                              shouldHideHintAfterFirstActivation: false,
                              enlargedImageContainerStyle: {
                                position: "absolute",

                                top: "0px",
                                // top: "(max-width: 480px) 0px, (max-width: 1200px) 0px, 0px",

                                left: 265,
                              },
                              enlargedImageContainerDimensions: {
                                width: "300%",
                                height: "300%",
                                // sizes:
                                //   "(max-width: 480px) 10px, (max-width: 1200px) 30px, 360px",
                              },
                            }}
                          />
                          ;
                          <div
                            className={`heart align-top wish m-1 ${
                              isWishlistPresent ? "is-active" : ""
                            }`}
                            id="wishheart"
                            onClick={() => wishlist()}
                            aria-hidden="true"
                          ></div>
                          <div className="nextImg align-middle m-1">
                            <i
                              class="fa fa-caret-right fa-2x"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <div className="gridImages m-3 mt-4 container">
                          <div className="row d-flex justify-content-center mt-3">
                            {typeof singleProduct.gridimages == `object` &&
                              gridImageDisplay()}
                          </div>
                        </div>

                        <form className="ml-3">
                          <div class="form-group row align-items-center">
                            <div className="colors ">
                              <label class="col-sm-4 col-form-label justify-content-center productCheckLabel">
                                Colors
                              </label>
                            </div>
                            <div class="colorsoption">
                              <label>
                                <input type="radio" name="key" value="1" />
                                <span
                                  style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                  }}
                                >
                                  Red
                                </span>
                              </label>
                              <label>
                                <input type="radio" name="key" value="2" />
                                <span
                                  style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                  }}
                                >
                                  Green
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="form-group row d-flex align-items-center ">
                            <div className="">
                              <label className="col-sm-4 col-form-label productCheckLabel ">
                                Size
                              </label>
                            </div>
                            <div class="d-flex ml-4 ">
                              <div class="form-check col-sm-6 form-check-inline">
                                <input
                                  // class="form-check-input"
                                  type="checkbox"
                                  name="ic_id_4"
                                  id="ic_id_4"
                                  value="1"
                                />
                                <label
                                  class="form-check-label pl-1 "
                                  for="ic_id_4"
                                >
                                  1
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  // class="form-check-input"
                                  type="checkbox"
                                  name="ic_id_5"
                                  id="ic_id_5"
                                  value="2"
                                />
                                <label
                                  class="form-check-label pl-1 "
                                  for="ic_id_5"
                                >
                                  2
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <span className="vertical-line product__verticalline">
                        {" "}
                      </span>

                      {/* <div className="col-lg-6 col-mb-4 col-sm-12 pl-0 pr-0 pl-md-2 pr-md-2 singleproduct__container"> */}
                      <div>
                        {/* <div className="col-sm-12 pl-0 pr-0 pl-md-2 pr-md-2 singleproduct__container"> */}
                        <h2 className="m-4 pro_name">
                          {singleProduct.product_name}
                        </h2>
                        {/* <p className="m-4">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: singleProduct.description,
                            }}
                          ></div>
                        </p> */}

                        <h6 className="m-1 ml-4"> FEATURES </h6>
                        <div className="d-flex justify-content-start product__features">
                          <ul className="list productFeatList">
                            {featuresDisplay()}
                          </ul>
                          <div className="list productFeatList feature__rtborder ml-2">
                            <div>: Hand Pallet Truck</div>
                            <div>: 110 mm</div>
                            <div>: 85 mm</div>
                            <div>: 195 mm</div>
                            <div>: 1150 mm</div>
                          </div>
                        </div>

                        <br />
                        <br />
                        <div className="d-flex justify-content-center align-items-center">
                          <Grid
                            className="ml-2"
                            container
                            spacing={2}
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <LocationOnIcon
                                className="location"
                                fontSize="large"
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                type="number"
                                id="input"
                                onChange={handleChange}
                                label="Check Delivery Pincode"
                                onInput={(e) => {
                                  e.target.value = Math.max(
                                    0,
                                    parseInt(e.target.value)
                                  )
                                    .toString()
                                    .slice(0, 6);
                                }}
                              />
                              <p
                                className=" text-danger"
                                style={{
                                  display:
                                    pinCode.length === 6 ||
                                    (pinCode.length === 0 && "none"),
                                }}
                              >
                                {error}
                              </p>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="text"
                                color="inherit"
                                className="checkbtn"
                              >
                                Check
                              </Button>
                            </Grid>
                          </Grid>
                        </div>

                        <div className="productShipping">
                          Shipping Charges: Free
                        </div>
                        <div className="mb-3 ml-3 discounts mt-5 d-flex justify-content-around p-1">
                          <div className="h5 mr-5">
                            <p className="p-2 discount__text">
                              To save 20% on your purchase (upto Rs200/- )<br />{" "}
                              applicable on Specific orders only
                            </p>
                          </div>
                          <div className="h5 coupon  mr-5 ml-5 ">
                            <p className="p-2 coupon__text">
                              USE CODE
                              <br />
                              <strong className="text-center align-middle">
                                SAVE20
                              </strong>
                            </p>
                          </div>
                        </div>
                        <div className="status d-flex ">
                          <div>
                            <h6 className="mt-2 ml-4  statusinfo">
                              Status - {availability}
                            </h6>
                          </div>
                          <div className=" ml-auto colord pb-4 mr-2">
                            <h5>
                              <u
                                className=" viewdiscount__product"
                                data-toggle="modal"
                                data-target="#CouponsModal"
                              >
                                See more Coupons
                              </u>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product__footer ">
                      <div className="d-flex flex-column justify-content-center  statusNeedHelp">
                        <span>Need Help?</span>
                        <span>Contact our Team</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-12 col-sm-12 mb-lg-0 p-0">
                  <div class=" p-4  mt-5 ml-2 mt-md-5  ml-lg-3 mt-lg-2 pricetab ">
                    <div className="singleproductPrice__content">
                      <div className="singleproductPrice__heading">
                        Single Product Price
                      </div>
                      <strong className="singleProduct__price">
                        {singleProduct.price} /-
                      </strong>
                    </div>

                    <div className="singleproductPrice__content">
                      <div className="singleproductPrice__heading">
                        Discounted Price
                      </div>
                      <strong className="singleProduct__price text-success">
                        {singleProduct.discount} /-
                      </strong>
                    </div>
                    <hr />

                    <div className="singleproductPrice__content">
                      <div className="d-flex flex-column">
                        <div className="singleproductPrice__heading">
                          Total Price
                        </div>
                        <div className="singleproductPrice__units">
                          ({quantity} items)
                        </div>
                      </div>

                      <strong className="singleProduct__price singleProduct__pricecolor ">
                        {singleProduct.discount * quantity} /-
                      </strong>
                    </div>

                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <div className="singleProduct__qty">
                          Update Quantity
                        </div>
                        <span className="colord">
                          <a href="#">
                            <u data-toggle="modal" data-target="#suggestModal">
                              <div className="singleProduct__qtylink">
                                Suggest Quantity
                              </div>
                            </u>
                          </a>
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="cart__productqty singleproduct__qtybtn">
                          <button
                            // onClick={() => {}}
                            onClick={() => {
                              if (quantity > minQty) setquantity(quantity - 1);
                            }}
                            className="cart__productqtybtn btnleftadd"
                          >
                            -
                          </button>
                          <p className="cart__productqtynum">{quantity}</p>
                          <button
                            onClick={() => {
                              if (quantity >= minQty) setquantity(quantity + 1);
                            }}
                            className="cart__productqtybtn btnleftsub"
                            id="addqtybtn"
                          >
                            +
                          </button>
                        </div>
                        <div className="singleproduct__minreq">
                          Minimun order Quantity <br /> - {minQty} pcs
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ml-3 bulkquantity__dropdown d-flex justify-content-between "
                    onClick={() => setDisplayRate(!displayRate)}
                  >
                    <div className=" p-2 ml-1">Bulk quantity Discounts</div>
                    <ExpandMoreIcon></ExpandMoreIcon>
                  </div>
                  <div
                    class={`graph  ml-lg-3 ${
                      displayRate ? "ratechartdisappear" : ""
                    }`}
                  >
                    <div>
                      <h3 className="m-1  p-2">Rate Chart</h3>
                      <Chart
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ["day", "price"],
                          [0, 0],
                          [1, 100],
                          [2, 230],
                          [3, 170],
                          [4, 180],
                          [5, 90],
                          [6, 110],
                        ]}
                        options={{
                          hAxis: {
                            title: "days",
                          },
                          vAxis: {
                            title: "price",
                          },
                        }}
                        rootProps={{ "data-testid": "4" }}
                      />
                      <div className="d-flex justify-content-center ml-auto p-1">
                        <a href="#modal">
                          <strong className="colord">
                            <Link
                              to={`/BulkQuantityQuotation/${singleProduct.product_name}/${singleProduct._id}`}
                            >
                              {" "}
                              <u
                                data-toggle="modal"
                                data-target="#myModal"
                                className="viewdiscount__product"
                              >
                                Get Quotation For Bulk Orders
                              </u>
                            </Link>
                          </strong>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="singleproductbtns  ml-lg-3 ">
                    {isProdPresent ? (
                      <div className="singleproductaddcartbtn">
                        <button
                          className="singleproductaddcartbtn"
                          onClick={handleCartRemove}
                        >
                          {buttonText}
                        </button>
                      </div>
                    ) : (
                      <div
                        className="singleproductaddcartbtn"
                        onClick={handleAddToCart}
                      >
                        <button className="singleproductaddcartbtn">
                          {buttonText}
                        </button>
                      </div>
                    )}
                    <div className="singleproductbuynowbtn">
                      <Link to={`/Confirmcheckout/${productId}/${quantity}`}>
                        <button className="singleproductbuynowbtn">
                          BUY NOW
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="buttons d-flex justify-content-around">
                    <br />
                  </div>
                  <p className="d-flex justify-content-center font-weight-bold mt-2 text-success">
                    {cartText}
                  </p>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-3 producttab2 p-4	prodspecification__cont ">
              <h4 className="productPageSliderHd">
                {/* <h4>Product Details</h4> */}
              </h4>

              <Specifications Product={singleProduct} className="mb-5" />
              <br />
            </div>

            <ViewProduct
              Product={singleProduct}
              title="Frequently Bought Together"
            />

            <CompareProducts
              title="Similar Products"
              subsubcategory={singleProduct.ssc}
              id={productId}
            />
            <hr />

            {/* <Review /> */}
          </div>
          {/* <Footer /> */}
          <BottomFooter />
        </div>
        <div class="modal" id="suggestModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              {/* <!-- Modal body --> */}
              <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <div className="modalDiv m-3">
                  <h1 className="suggestheading">
                    Calculate How much Quantity required
                  </h1>
                  <p className="note mb-5">
                    Please note - Calculations are estimates and can be only
                    made using whole numbers
                  </p>
                  <h3>Enter Dimensions of Area (s)</h3>
                  {Areaitem()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="discountModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h1 className="h2 text-center mt-3 p-5 pb-0	 bulkhead">
                  Bulk Quality Discounts !
                </h1>
                <div class="table-responsive table-sm m-3 p-4">
                  <form className="form-group">
                    <table class="table  table-bordered">
                      <thead>
                        <tr className="text-center">
                          <th>Select</th>
                          <th>Quantity</th>
                          <th>Discount</th>
                          <th>Price/piece</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <th scope="row">
                            <input type="radio" />
                          </th>
                          <td>05-10</td>
                          <td>1%</td>
                          <td>350/-</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input type="radio" />
                          </th>
                          <td>10-15</td>
                          <td>2%</td>
                          <td>325/-</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input type="radio" />
                          </th>
                          <td>15-20</td>
                          <td>3%</td>
                          <td>300/-</td>
                        </tr>
                        <tr>
                          <th scope="row">
                            <input type="radio" />
                          </th>
                          <td>20-25</td>
                          <td>5%</td>
                          <td>275/-</td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
              <h2 className="colord h2 text-center ml-5 mr-5 pb-5">
                Quantity&nbsp;required&nbsp;more&nbsp;than&nbsp;these?
                <br />
                Contact Material Buy
              </h2>
              <div className="d-flex justify-content-end colord">
                <button className=" btnAdd2 btn-primary m-3">
                  <ShoppingCartIcon />
                  Add to Cart
                </button>

                <button className=" btn-danger m-3">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="CouponsModal">
          <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <i class="fas fa-2x p-2 fa-ticket-alt"></i>
                <h4 className="m-2">Coupons</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <div className="d-flex m-2">
                  <div>
                    <h5>Coupon name</h5>
                    <p>Coupon Description</p>
                  </div>
                  <div className="ml-auto p-3">Coupon Code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  return <>{loading ? loader() : productPage()}</>;
}

export default Product;
