import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";
import ProductDefaultImg from "../ProductList/assets/ProductImg.png";
import loaderImg from "../ProductList/assets/circles.svg";
import "../ProductList/ProductList.css";

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

const SubSubCategoryList = () => {
  const [width, setWidth] = useState();
  const [loading, setLoading] = useState(true);
  const [cards, setcards] = useState();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [data, setData] = useState([]);
  const [windowWidth, _] = useWindowSize();

  const getCardNumber = () => {
    const width = document.body.clientWidth;
    if (width <= 320) {
      setcards(1);
    } else if (width <= 425) {
      setcards(2);
    } else if (width <= 768) {
      setcards(3);
    } else if (width <= 1024) {
      setcards(4);
    } else if (width > 1024) {
      setcards(6);
    }
  };

  useEffect(() => {
    setWidth(windowWidth);
    getCardNumber();
  });

  useEffect(() => {
    axios.get(process.env.REACT_APP_SUBSUBCATEGORY_URL).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const productCards = () => {
    return data.map((product) => {
      // console.log(product);
      return (
        <div className="text-center m-2 mt-4  p-2">
          <div className="d-flex justify-content-center productCardImg">
            <Link to={`viewProducts/${product._id}`}>
              <img
                className="product-img m-1 img-fluid"
                src={process.env.REACT_APP_IMAGE_API + product.gridimages}
                onError={(e) => (e.target.src = ProductDefaultImg)}
                alt="Product_Image"
              />
            </Link>
          </div>
          <h5 className="Product-name pt-2 mb-1 mt-1">{product.name}</h5>
          <h5 className="Discount p-2 colored ">Upto 10% OFF</h5>
        </div>
      );
    });
  };
  //code by Rohit 20 july 2021
  const loader = () => {
    return (
      <div className="text-center align-middle d-flex justify-content-center mt-3">
        <img className="listLoader" src={loaderImg} alt="not found"></img>
      </div>
    );
  };
  return (
    <div className="mt-3 mb-5 slider-card">
      <div className="d-flex productSliderHdDiv">
        <h4 className="mr-auto m-4 align-middle">
          <strong>Sub Sub Category</strong>
        </h4>
        <Link to={`/subsubcategoryall`}>
          <button className="viewAllBtn">View All</button>
        </Link>
      </div>
      <ItemsCarousel
        className="card mt-3"
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={cards}
        slidesToScroll={cards}
        gutter={20}
        leftChevron={<i className="fas fa-arrow-circle-left leftarr fa-2x"></i>}
        rightChevron={
          <i className="fas fa-arrow-circle-right rightarr fa-2x"></i>
        }
        chevronWidth={chevronWidth}
      >
        {/* {productCards()} */}
        {loading ? loader() : productCards()}
      </ItemsCarousel>
    </div>
  );
};

export default SubSubCategoryList;
