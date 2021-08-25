import React from "react";
import "./MyCart.css";
import { Link, useParams } from "react-router-dom";
import EmptyCart from "./Assets/empty.png";
import ProImg from "./Assets/WishlistImg.png";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../App";
import axios from "axios";
import { useState } from "react";
import Notiflix from "notiflix";
import emptyimg from "../../Assets/empty/empty.png";
import loaderImg from "../../Home/ProductList/assets/circles.svg";

const MyCart = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [quantity, setquantity] = useState(1);
  const [cart, setCart] = useState({});
  const [wishlistids, setWishlistids] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const user1 = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user1.loginSuccess._id;
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();

  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  useEffect(() => {
    const userUrl = `${process.env.REACT_APP_USER_API}/${userId}/getuser`;
    axios.get(userUrl).then((response) => {
      console.log(response.data.cart);
      setUser(response.data);
      setCart(response.data.cart);
      const temp = response.data.wishlist.map((value) => {
        return value;
      });
      const wishids = temp.map((value) => {
        return value.productid;
      });
      setWishlistids(wishids);
      setLoading(false);
      if (response.data.cart.length !== 0) {
        setIsEmpty(false);
      }
    });
  }, [userId]);

  const imageUrl = process.env.REACT_APP_IMAGE_API;

  // console.log("cart", cart);
  const handleCartRemove = (productId, productName) => {
    console.log(productId);
    const removeCartUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/removefromcart`;
    window.confirm(`Are you sure you want to delete ${productName} ?`) &&
      axios.post(removeCartUrl).then((res) => {
        setDeleteSuccess("Successfully Removed !");
        res.data && window.location.reload();
      });
  };
  // const handleWishlistRemove = (productId) => {
  //   const removeListUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/removefromlist`;
  //   window.confirm(`Are you sure you want to remove item from wishlist ?`) &&
  //     axios.post(removeListUrl).then((res) => {
  //       setDeleteSuccess("Successfully Removed !");
  //       res.data && window.location.reload();
  //     });
  // };

  const handleAddToWishlist = (productId) => {
    console.log(productId);
    const addToWishlistUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/addtolist`;
    axios.post(addToWishlistUrl).then((res) => {
      Notiflix.Notify.success("Item has been added to wishlist", {
        position: "right-bottom",
        timeout: 2000,
      });

      console.log(res.data);
    });
  };
  return (
    <div>
      {loading ? (
        loader()
      ) : (
        <div className="MyProfile">
          <div className="cart-title">
            {/* <h2 className="font-weight-bold">MY CART</h2> */}
            <h2>My Cart</h2>
          </div>
          <div className="cart-container mt-5 pb-5">
            {isEmpty ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  className="rounded mx-auto d-block mb-5"
                  src={emptyimg}
                  alt=""
                />

                <h3 className="font-weight-bold">NO ITEMS IN CART</h3>
                <Link to="/">
                  <div className=" buybtn p-2">Continue Shopping</div>
                </Link>
              </div>
            ) : (
              <>
                <p className="text-center text-success">{deleteSuccess}</p>
                {cart.length > 0 &&
                  cart.map((cr) => (
                    <>
                      <div className="card mt-5">
                        <div className="cart-header card-header">
                          <div className="row">
                            <div className="col-md-6">
                              ESTIMATED COST- ₹ {cr.productprice * quantity} /-
                            </div>
                            <div className="col-md-6  display-flex align-items-center flex-column text-center cart-headerDel">
                              <i className="fas fa-truck mr-3"></i>
                              Expected Delivery
                              <p className="">
                                will be updated once order is confirmed
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div style={{ width: 200, height: 200 }}>
                                <img
                                  style={{ width: "100%", height: "100%" }}
                                  src={imageUrl + cr.productimage[0]}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-md-7 ml-5">
                              <h5 className="card-title">{cr.name}</h5>
                              <p className="card-text">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                          <div className="mycartBtnRow">
                            <div className="myCartBtnSubRow">
                              <div>
                                {!wishlistids.includes(cr.productid) ? (
                                  <button
                                    onClick={() =>
                                      handleAddToWishlist(cr.productid)
                                    }
                                    className="buybtn"
                                  >
                                    Add to wishlist
                                  </button>
                                ) : (
                                  <p className=" ">
                                    Product already present in Wishlist
                                  </p>
                                )}
                              </div>

                              <div style={{ fontSize: "18px" }}>
                                <div className="qty d-flex flex-column">
                                  <div className="quantiy d-flex  m-2 mb-0">
                                    <div
                                      className="mt-2"
                                      onClick={() => {
                                        if (quantity > 1)
                                          setquantity(quantity - 1);
                                      }}
                                    >
                                      <button>
                                        <h3>-</h3>
                                      </button>
                                    </div>
                                    <div className="p-3  bordered selectQuantity">
                                      <h5>{quantity}</h5>
                                    </div>
                                    <div
                                      className="m-1 mt-2"
                                      onClick={() => {
                                        if (quantity >= 1)
                                          setquantity(quantity + 1);
                                      }}
                                    >
                                      <button>
                                        <h3>+</h3>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-center ml-auto mr-5 ">
                                    <h5 className="color-gray">QTY</h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex">
                              <button
                                onClick={() =>
                                  handleCartRemove(cr.productid, cr.name)
                                }
                                className=" buybtn p-2 mr-3 removebtn__color"
                              >
                                Remove
                              </button>
                              {/* <Link to={`/Confirmcheckout/${cr.productid}`}>
                      <button className="btn buybtn p-2">Place order</button>
                    </Link> */}
                              <Link
                                to={`/Confirmcheckout/${cr.productid}/${cr.qty}`}
                              >
                                <div className=" buybtn p-2">Buy Now</div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
