import React, { useState, useEffect, useLayoutEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import loaderImg from "../Home/ProductList/assets/circles.svg";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function ViewProduct({ title, Product }) {
  const [width, setWidth] = useState();
  const [loading, setLoading] = useState(true);
  const [cards, setcards] = useState();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [data, setData] = useState([]);
  const [windowWidth, _] = useWindowSize();
  const [totalSum, setTotalSum] = useState(0);

  const getCardNumber = () => {
    const width = document.body.clientWidth;
    if (width <= 320) {
      setcards(1);
    } else if (width <= 425) {
      setcards(2);
    } else if (width <= 768) {
      setcards(2);
    } else if (width <= 1024) {
      setcards(4);
    } else if (width > 1024) {
      setcards(6);
    }
  };

  console.log("current", Product);
  //code by Rohit 20 july 2021
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-3">
        <img className="listLoader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };

  const wishlist = (id) => {
    if (document.getElementById(id).classList.contains("fa-heart-o")) {
      document.getElementById(id).classList.remove("fa-heart-o");
      document.getElementById(id).classList.add("fa-heart");
    } else {
      document.getElementById(id).classList.add("fa-heart-o");
      document.getElementById(id).classList.remove("fa-heart");
    }
  };
  const productCards = () => {
    let sum = 0;
    const content = data.map((product, index) => {
      console.log("bot tog", product);
      if (product.price && product._id !== Product._id) {
        if (index < 2) {
          sum += product.price;
          return (
            <div className="text-center m-2 prodimage p-2 ">
              <div className="d-flex justify-content-center productCardImg">
                <img
                  className="product-img m-2 img-fluid"
                  src={process.env.REACT_APP_IMAGE_API + product.gridimages[0]}
                  alt="Product_Image"
                />
              </div>
              <h6 className="Product-name pt-1 m-0 mt-1">
                <strong>{product.product_name}</strong>
              </h6>
              {/* <h6 className='Product-category p-1'>{product.subsubcategory}</h6> */}
              {/* <div className='d-flex justify-content-around'> */}
              <h6 className="color-b">Upto 10% OFF</h6>
              <p className="Product-price m-0 p-0 ">
                {product.price ? "₹" + product.price : "Out of Stock"}
              </p>

              <div className="text-center mt-auto align-bottom b">
                <button
                  className=" btn-veiw pl-5 pr-5"
                  onClick={() => window.location.reload()}
                >
                  <Link to={`/productDetails/${product._id}`}>
                    <strong>View</strong>
                  </Link>
                </button>
              </div>
            </div>
          );
        }
      } else {
        index = index - 1;
      }
    });

    return { content, sum };
  };

  useEffect(() => {
    // getData();
    axios.get(process.env.REACT_APP_PRODUCT_URL).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    getCardNumber();
  }, [getCardNumber]);

  return (
    <div className="mt-4  boughtTogether__container mb-5">
      <div className="d-flex justify-content-start productPageSliderDiv ml-4">
        <h3 className="productPageSliderHd">{title}</h3>
        {/* <button className='viewAllBtn'>View More</button> */}
      </div>

      {loading ? (
        loader()
      ) : (
        <>
          <div className="d-flex justify-content-between  viewprodcontainer">
            <div className="d-flex mb-4 viewprodcontainer__products">
              {productCards().content}
              <div className="text-center m-2 prodimage p-2 ">
                <div className="d-flex justify-content-center productCardImg">
                  <img
                    className="product-img m-2 img-fluid"
                    src={
                      process.env.REACT_APP_IMAGE_API + Product.gridimages[0]
                    }
                    alt="Product_Image"
                  />
                </div>
                <h6 className="Product-name pt-1 m-0 mt-1">
                  <strong>{Product.product_name}</strong>
                </h6>
                {/* <h6 className='Product-category p-1'>{product.subsubcategory}</h6> */}
                {/* <div className='d-flex justify-content-around'> */}
                <h6 className="color-b">Upto 10% OFF</h6>
                <p className="Product-price m-0 p-0 ">
                  {Product.price ? "₹" + Product.price : "Out of Stock"}
                </p>

                <div className="text-center mt-auto align-bottom b">
                  <button
                    className=" btn-veiw pl-5 pr-5"
                    onClick={() => window.location.reload()}
                  >
                    <Link to={`/productDetails/${Product._id}`}>
                      <strong>View</strong>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex boughtTogethercontainer ">
              <p className="boughtTogether__heading">Price Summary</p>
              <div className="d-flex justify-content-between boughtTogether__price">
                <p>Main Product selected</p>
                <span>{Product.price}</span>
              </div>
              <div className="d-flex justify-content-between boughtTogether__price">
                <p>Addon Price</p>
                <span className="text-success">+{productCards().sum}</span>
              </div>
              <div className="d-flex justify-content-between boughtTogether__total">
                <span>Total</span>
                <span>{productCards().sum + Product.price}</span>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btnBuy2 mt-2 mb-4">Add to cart</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewProduct;
