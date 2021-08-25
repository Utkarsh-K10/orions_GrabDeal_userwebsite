import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./CategoryNavbar.css";

import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import { Link } from "react-router-dom";

const CategoryNavbar = () => {
  const [category, setCategory] = useState([]);
  const [specificCat, setSpecificCat] = useState([]);
  const [specificSubCat, setSpecificSubCat] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CATEGORY_URL}`).then((res) => {
      setCategory(res.data);
    });
  }, []);
  const handleCategory = (id) => {
    window.catid = id;
    axios
      .get(`${process.env.REACT_APP_USER_API}/category/${window.catid}`)
      .then((res) => {
        setSpecificCat(res.data.subCategory);
      });
    // console.log(window.catid)
  };
  const handleSubCategory = (subId) => {
    // console.log(subId);
    axios
      .get(`${process.env.REACT_APP_USER_API}/category/subcategory/${subId}`)
      .then((res) => {
        setSpecificSubCat(res.data.subsubCategory);
        //     console.log(res.data)
      });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white linkGrid d-flex justify-content-around"
        style={{ overflow: "visible" }}
      >
        <div class="container-fluid">
          <ul class="navbar-nav resp-nav ">
            <li
              class=" nav-item dropdown drphd ml-2 mr-2"
              text="All"
              className=" drphd  "
            >
              {" "}
              <img
                className="category__image"
                src="https://v3materialbuyapi.herokuapp.com/admin/image/90b86b5193b5fb3ea3fee27a6e05bf91.jpg"
                alt=""
              />
              <a
                class="nav-link dropdown-toggle item__border"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                All
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {category.map((ct) => (
                  <Link to={`/viewSubcategory/${ct._id}`}>
                    <a class="dropdown-item" href="#">
                      {ct.name}
                    </a>
                  </Link>
                  // <li>
                  //   <a class="dropdown-item " href="#">
                  //     {ct.name}
                  //   </a>
                  // </li>
                ))}
              </ul>
            </li>

            {category.map((ct) =>
              ct.subCategory.length !== 0 ? (
                (console.log(""),
                (
                  <>
                    <li class=" nav-item dropdown  category-card text-center category__imagelist  ">
                      <Link to={`/viewSubcategory/${ct._id}`}>
                        <img
                          className="category__image"
                          src={process.env.REACT_APP_IMAGE_API + ct.gridimages}
                          alt=""
                        />
                      </Link>

                      <a
                        class="nav-link dropdown-toggle CategoryText drphd d-flex   item__border"
                        //   href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false"
                        onMouseEnter={() => handleCategory(ct._id)}
                      >
                        {/* <img
                        className="category__image"
                        src={process.env.REACT_APP_IMAGE_API + ct.gridimages[0]}
                        alt=""
                      /> */}
                        <p style={{ zIndex: "2" }}>{ct.name}</p>
                      </a>
                      {/* <img
                      className="category__image"
                      src={process.env.REACT_APP_IMAGE_API + ct.gridimages[0]}
                      alt=""
                    /> */}
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        {specificCat.map((subcat) => (
                          <>
                            {subcat.subsubCategory.length !== 0 ? (
                              <li>
                                <a
                                  class="dropdown-item"
                                  onMouseEnter={() =>
                                    handleSubCategory(subcat._id)
                                  }
                                >
                                  {subcat.name} &raquo;
                                </a>

                                <ul class="dropdown-menu dropdown-submenu">
                                  {specificSubCat.map((subsubcat) => {
                                    // console.log("subsubcat", subsubcat);

                                    return (
                                      <li>
                                        <Link
                                          to={`/viewProducts/${subsubcat._id}`}
                                        >
                                          <a class="dropdown-item" href="#">
                                            {subsubcat.name}
                                          </a>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </li>
                            ) : (
                              <li>
                                <a class="dropdown-item" href="#">
                                  {subcat.name}
                                </a>
                              </li>
                            )}
                          </>
                        ))}
                      </ul>
                    </li>
                  </>
                ))
              ) : (
                <li class="nav-item ">
                  <a
                    class="nav-link item__border "
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-expanded="false"

                    // href="#"
                  >
                    <img
                      className="category__image"
                      src={process.env.REACT_APP_IMAGE_API + ct.gridimages}
                      alt=""
                    />
                    <p style={{ zIndex: "2" }}>{ct.name}</p>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      {/* <div
        className="linkGrid d-flex justify-content-around"
        style={{ overflow: "visible" }}
      >
        <Dropdown text="All" className="drphd">
          <Dropdown.Menu>
            {category.map((ct) => (
              <Dropdown.Item>{ct.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {categoryList()}
      </div> */}
    </>
  );
};
export default CategoryNavbar;
