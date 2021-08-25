import React, { useEffect, useState } from "react";
import CategoryNavbar from "../../Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "../../Shared/Navbars/ServiceNavbar/ServiceNavbar";
import TopNavbar from "../../Shared/Navbars/TopNavbar/TopNavbar";
import { SliderData } from "../HomeSlider/SliderData";
import HomeSlide from "../HomeSlider/HomeSlide";
import BottomFooter from "../../Shared/Footer/BottomFooter";
import ProductList from "../ProductList/ProductList";
import { useContext } from "react";
import { UserContext } from "../../../App";
import SubCategoryList from "../SubCategoryList/SubCategoryList";
import CategoryList from "../CategoryList/CategoryList";
import SubSubCategoryList from "../SubSubCategoryList/SubSubCategoryList.js";
import axios from "axios";
import PrimarySearchAppBar from "../../Shared/Navbars/TopNavBar2/TopNavBar2";
import ProductListCategory from "../ProductListCategory/ProductListCategory";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_SUBSUBCATEGORY_URL).then((res) => {
      setData(res.data);
    });
  }, []);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userURL = `${process.env.REACT_APP_USER_API}/${loggedInUser._id}/getuser`;
    axios.get(userURL).then((res) => {
      // console.log("home user", res.data);
      setCart(res.data.cart);
    });
  }, [loggedInUser._id]);

  const content = data.map((item) => {
    if (item.product.length > 0) {
      return (
        <ProductListCategory
          product={item.product}
          cart={cart}
          title={item.name}
          email={loggedInUser.username}
          userid={loggedInUser._id}
        />
      );
    }
  });
  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>

      <CategoryNavbar></CategoryNavbar>
      <ServiceNavbar></ServiceNavbar>
      <HomeSlide slide={SliderData} />
      <ProductList
        cart={cart}
        title="Best of Material Buy"
        email={loggedInUser.username}
        userid={loggedInUser._id}
      />
      <CategoryList />
      <SubCategoryList />
      <SubSubCategoryList />
      {content}
      <BottomFooter />
    </div>
  );
};

export default Home;
