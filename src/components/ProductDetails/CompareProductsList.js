import React, { useState, useEffect, useLayoutEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
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

function CompareProducts({ title, id, subsubcategory }) {
  const [width, setWidth] = useState();
  const [cards, setcards] = useState();
  const [loading, setLoading] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [data, setData] = useState([]);
  const [windowWidth, _] = useWindowSize();

  console.log("ssc", subsubcategory);
  //code by Rohit 20 july 2021
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-3">
        <img className="listLoader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };
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
    return data?.map((product) => {
      return (
        <div className="text-center m-2  p-2">
          <div className="d-flex justify-content-center productCardImg">
            <img
              className="product-img m-1 img-fluid"
              src={process.env.REACT_APP_IMAGE_API + product.gridimages[0]}
              // onError={(e) => (e.target.src = Image)}
              alt="Product_Image"
            />
            <i
              className="fa fa-heart-o  align-top wish m-1"
              id={product._id}
              onClick={() => wishlist(product._id)}
              aria-hidden="true"
            ></i>
          </div>
          <h6 className="Product-name pt-1 pb-1 m-0 mt-1">
            <h6>{product.product_name}</h6>
          </h6>
          {/* <h6 className='Product-category p-1'>{product.subsubcategory}</h6> */}
          {/* <div className='d-flex justify-content-around'> */}
          <span className="Product-disc h6 strikethrough m-0 ">
            {product.discount
              ? " ₹" + (product.price + product.discount)
              : "Unavailable"}
          </span>
          <br />
          <span className="Product-price  color-b mb-3 p-1 ">
            {product.price ? "₹" + product.price : "Out of Stock"}
            <br />
          </span>

          <div className="text-center ">
            <Link to={`/compareProducts/${id}/${product._id}`}>
              <button className=" btn-colored pl-4 pr-4 compareBtn">
                <h4>Compare</h4>
              </button>
            </Link>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    // getData();
    axios
      .get(
        `${process.env.REACT_APP_USER_API}/category/subcategory/subsubcategory/${subsubcategory}`
      )
      .then((res) => {
        setData(res.data.product);
        console.log("comapare", res.data.product);
        setLoading(false);
      });
    getCardNumber();
  }, []);

  return (
    <div className=" mb-3 boughtTogether__container ">
      <div className="d-flex justify-content-start productPageSliderDiv ml-4">
        <h3 className="productPageSliderHd">{title}</h3>
        {/* <button className='viewAllBtn'>View More</button> */}
      </div>
      <ItemsCarousel
        className="card mt-3"
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={cards}
        gutter={20}
        leftChevron={<i className="fas fa-arrow-circle-left fa-2x"></i>}
        rightChevron={<i className="fas fa-arrow-circle-right fa-2x"></i>}
        // outsideChevron
        // chevronWidth={chevronWidth}
      >
        {/* {products()} */}
        {loading ? loader() : productCards()}
      </ItemsCarousel>
    </div>
  );
}

export default CompareProducts;
