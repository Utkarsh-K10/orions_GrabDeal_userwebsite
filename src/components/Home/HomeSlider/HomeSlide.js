import React, { useEffect, useState } from "react";
import "./HomeSlider.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router";

const HomeSlide = ({ slide }) => {
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [carouselImage, setCarouselImage] = useState([]);
  const length = slide.length;

  useEffect(() => {
    const carouselId = `611b9cacce94e600168a599d`;
    const url = `${process.env.REACT_APP_USER_API}/carousel/${carouselId}`;
    axios.get(url).then((res) => {
      // console.log(res.data)
      console.log("temp", res.data);
      setCarouselImage(res.data.images);
    });
  }, []);
  const nextSlide = () => {
    setCurrent(current == length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current == 0 ? length - 1 : current - 1);
  };
  if (!Array.isArray(slide) || slide.length <= 0) {
    return null;
  }

  const sliderHandler = (element) => {
    console.log(element);

    if (element.typename === "Sub Sub Category") {
      history.push(`/viewProducts/${element.typeid}`);
    }
    if (element.typename === "Sub Category") {
      history.push(`/viewSubSubCategory/${element.typeid}`);
    }

    if (element.typename === "Category") {
      history.push(`/viewSubCategory/${element.typeid}`);
    }
    if (element.typename === "Product") {
      history.push(`/productDetails/${element.typeid}`);
    }
  };
  const imageUrl = `https://v3materialbuyapi.herokuapp.com/admin/carousel/`;
  return (
    <section className="slider">
      <FaAngleLeft className="left-arrw" onClick={prevSlide} />
      <FaAngleRight className="right-arrw" onClick={nextSlide} />

      {carouselImage.map((element, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div className="sliderImage-container">
                <img
                  onClick={() => sliderHandler(element)}
                  className="slider-img"
                  src={`https://v3materialbuyapi.herokuapp.com/admin/carousel/${element.filename}`}
                  alt=""
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
export default HomeSlide;
