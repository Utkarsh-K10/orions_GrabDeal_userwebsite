import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import ProImg from "./Assets/WishlistImg.png";
import { Link, useParams } from "react-router-dom";

import EmptyCart from "./Assets/empty.png";
import axios from "axios";
import Notiflix from "notiflix";
import emptyimg from "../../Assets/empty/empty.png";
import loaderImg from "../../Home/ProductList/assets/circles.svg";

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const userId = user.loginSuccess._id;
  const imageUrl = process.env.REACT_APP_IMAGE_API;
  const [addCartText, setAddCartText] = useState("");
  const [addCartid, setAddCartid] = useState();
  const [cartPresentIds, setCartPresentIds] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${userId}/getuser`;

    axios.get(userURL).then((response) => {
      const temp = response.data.cart.map((item) => item.productid);
      setCartPresentIds(temp);
    });
  }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_USER_API}/${userId}/wishlist`;
    axios.get(url).then((res) => {
      setWishList(res.data);
      setLoading(false);
      if (res.data.length !== 0) {
        setIsEmpty(false);
      }
    });
  }, []);

  const handleAddToCart = (productId) => {
    const url = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/addtocart`;
    axios.post(url).then((res) => {
      setAddCartText("Item added to cart");
      setAddCartid(productId);
      Notiflix.Report.success(
        "Success",
        "Product Successfully Added to Cart",
        "Okay"
      );
      console.log(res.data) && window.location.reload();
    });
  };
  const handleWishlistRemove = (productId, productName) => {
    const removeListUrl = `${process.env.REACT_APP_USER_API}/${userId}/products/${productId}/removefromlist`;
    window.confirm(`Are you sure you want to delete ${productName} ?`) &&
      axios.post(removeListUrl).then((res) => {
        setDeleteSuccess("Successfully Removed !");
        res.data && window.location.reload();
      });
  };
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-5">
        <img className="loader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  return (
    <div className="MyProfile">
      {loading ? (
        loader()
      ) : (
        <>
          <div className="cart-title">
            <h2>My Wishlist</h2>
          </div>
          <div className="cart-container mt-5 pb-5">
            {isEmpty ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  className="rounded mx-auto d-block mb-5"
                  src={emptyimg}
                  alt=""
                />
                <h3 className="font-weight-bold">NO ITEMS IN WISHLIST</h3>

                <Link to="/">
                  <div className=" buybtn p-2">Continue Shopping</div>
                </Link>
              </div>
            ) : (
              <>
                <p className="text-center text-success">{deleteSuccess}</p>
                {wishList.length > 0 &&
                  wishList.map((wl) => (
                    <div className="card mt-5">
                      <div className="cart-header card-header">
                        <div className="row">
                          <div className="col-md-6">
                            ESTIMATED COST- ₹ {wl.productprice}
                          </div>
                          {/* <div className="col-md-6 text-right">
                    Expected Delivery
                  </div> */}
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <div style={{ width: 200, height: 200 }}>
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={imageUrl + wl.productimage[0]}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-md-7">
                            <h5 className="card-title">{wl.name}</h5>
                            <p className="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                          <div className="col-md-2">Apply coupon</div>
                        </div>
                        <div className="wishlstBtnRow">
                          {!cartPresentIds.includes(wl.productid) ? (
                            <button
                              onClick={() => handleAddToCart(wl.productid)}
                              className=" buybtn"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <p className=" ">Product already present in Cart</p>
                          )}

                          {addCartid === wl.productid ? (
                            <p className="text-success font-weight-bold">
                              {addCartText}
                            </p>
                          ) : (
                            ""
                          )}
                          {/* <div className="col-md-4">
                    Quantity- {wl.qty}
                  </div> */}
                          <button
                            onClick={() =>
                              handleWishlistRemove(wl.productid, wl.name)
                            }
                            className=" buybtn mr-3 removeWishlstbtn"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
