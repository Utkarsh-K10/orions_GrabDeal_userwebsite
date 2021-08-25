import React from "react";
import "./Footer.css";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function Footer() {
  return (
    <div className="footer">
      <div className="footergrid">
        <div className="footeritm">
          <ul className="footerlst li">
            {/* COMPANY */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Company
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
            <br />
            <br />
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                About Us
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Contact Us
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Sell on Material Buy
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Careers
              </a>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li ">
            {/* HELP */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Help
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
            <br />
            <br />
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                FAQs
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Customer Helpline Number
              </a>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* PRIVACY AND POLICIES */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Privacy & Policies
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* TERMS AND CONDITIONS */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                T & Cs
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* QUICK LINKS */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Quick Links
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
            <br />
            <br />
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Product 1
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Product 2
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Product 3
              </a>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* FEEDBACK */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Feedback
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* OTHER LINKS */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Other Links
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
            <br />
            <br />
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Blogs
              </a>
            </li>
            <li className="footerContent">
              <a className="link footerlk" href="index.html">
                Appreciation
              </a>
            </li>
          </ul>
        </div>

        <div className="footeritm">
          <ul className="footerlst li">
            {/* CHATBOT */}
            <li className="footerhd">
              <a className="link footerlk" href="index.html">
                Chatbot
              </a>
            </li>
            <li>
              <hr className="line"></hr>
            </li>
          </ul>
        </div>
      </div>
      <hr className="hr-ln"></hr>
      <br />

      {/* COPYRIGHT DIVISION */}
      <div className="copyright-div">
        <div className="copyright">
          © {currentYear} Material Buy.All Rights Reserved.
        </div>
        {/* <div className="copyright">Made with .</div> */}
      </div>
    </div>
  );
}

export default Footer;
