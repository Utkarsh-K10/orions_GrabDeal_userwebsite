import React, { useState } from "react";
import "./specifications.css";

///code by Rohit
const Specifications = ({ Product }) => {
  const [isActive, setIsActive] = useState("Product");
  return (
    // <div className='spec'>
    // 	<ul className='mb-4 mr-180'>
    // 		<li className='active'>
    // 			<a  className='descbtn' data-toggle='tab' href='#home'>
    // 				<h5 style={{color:'#607D8B'}}>Product Description</h5>
    // 			</a>
    // 	</li>

    // 		<li className='m-3 active'>
    // 			<a  className='descbtn' data-toggle='tab' href='#menu1'>
    // 				<h5 style={{color:'#607D8B'}}>Specifications</h5>
    // 			</a>
    // 		</li>

    // 		<li className='m-3 active'>
    // 			<a   className='descbtn' data-toggle='tab' href='#menu2'>
    // 				<h5 style={{color:'#607D8B'}}>Quick Links</h5>
    // 			</a>
    // 	</li>

    // 	</ul>
    <div className="spec">
      <ul class="nav nav-tabs ">
        <li
          className={`descbtnli ${isActive === "Product" ? "active" : ""}`}
          onClick={() => {
            setIsActive("Product");
          }}
        >
          <a data-toggle="tab" href="#home">
            <p className="descbtn">Product Description</p>
          </a>
        </li>
        <li
          className={`descbtnli ${isActive === "Spec" ? "active" : ""}`}
          onClick={() => {
            setIsActive("Spec");
          }}
        >
          <a data-toggle="tab" href="#menu1">
            <p className="descbtn">Specifications</p>
          </a>
        </li>
        {/* style={{color:'#607D8B'}} */}
        <li
          className={`descbtnli ${isActive === "Quick" ? "active" : ""}`}
          onClick={() => {
            setIsActive("Quick");
          }}
        >
          <a data-toggle="tab" href="#menu2">
            <p className="descbtn">Quick Links</p>
            {/* style={{color:'#607D8B'}} */}
          </a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="home" className="tab-pane fade active show">
          <br />
          <br />
          <h5 className="productdesc mb-3 ml-4 ">Product Description</h5>
          <p className="desctext">
            {Product.descripption} Buy Agripro Double Barrel Portable Seeder cum
            Fertilizer HY-1092 online in India at wholesale rates. If you have
            been looking for Agripro Double Barrel Portable Seeder cum
            Fertilizer HY-1092 dealers, your search ends here as you can get the
            best Agripro Double Barrel Portable Seeder cum Fertilizer HY-1092
            distributors in top cities such as Delhi NCR, Mumbai, Chennai,
            Bengaluru, Kolkata, Chennai, Pune, Jaipur, Hyderabad and Ahmedabad.
            You can purchase Agripro Double Barrel Portable Seeder cum
            Fertilizer HY-1092 of the finest quality and rest assured to get the
            best in terms of both durability and performance. If you are
            bothered about the Agripro Double Barrel Portable Seeder cum
            Fertilizer HY-1092 prices, you can be totally sure to get the best
            rates as Industrybuying brings you genuine Agripro Double Barrel
            Portable Seeder cum Fertilizer HY-1092 rates and quality assured
            products only from the best of brands with exclusive brand discounts
            you won’t find anywhere else. Procure Agripro Double Barrel Portable
            Seeder cum Fertilizer HY-1092 today and avail the best offers on
            your purchase.
          </p>
        </div>
        <br />
        <div id="menu1" class="tab-pane fade">
          <h5 className="active mb-3 ml-3 ">Specifications</h5>
          <table
            style={{ maxWidth: "50em" }}
            class="table  table-hover table- table-borderless mt-3 ml-3 "
          >
            <tbody>
              <tr>
                <td>Cancelable: </td>
                <td>{Product.is_cancelable ? " Yes" : " No"}</td>
              </tr>
              <tr>
                <td>Refundable: </td>
                <td>{Product.is_refundable ? " Yes" : " No"}</td>
              </tr>
              <tr>
                <td>Returnable: </td>
                <td>{Product.is_returnable ? " Yes" : " No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="menu2" class="tab-pane fade">
          <h5 className="active mb-3">Quick Links</h5>
          {Product.variations}
        </div>
      </div>
    </div>
  );
};

export default Specifications;
