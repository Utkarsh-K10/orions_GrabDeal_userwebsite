import { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import NotFound from "./components/Auth/NotFound/NotFound";
import UserLogin from "./components/Auth/UserLogin/UserLogin";
import UserRegister from "./components/Auth/UserRegister/UserRegister";
import VendorRegister from "./components/Auth/VendorRegister/VendorRegister";
import UserLoginSuccess from "./components/Auth/UserLogin/UserLoginSuccess";

import Product from "./components/ProductDetails/Product";
import Compare from "./components/ProductDetails/CompareProducts";
import Payment from "./components/ProductDetails/Payment";
import UserProfile from "./components/UserProfile/UserProfile/UserProfile";
import Checkout from "./components/ProductDetails/Checkout";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import CategoryAll from "./components/CategoryAll/CategoryAll";
import SubCategoryAll from "./components/SubCategoryAll/SubCategoryAll";
import SubSubCategoryAll from "./components/SubSubCategoryAll/SubSubCategoryAll";
import Successorder from "./components/ProductDetails/Successorder";
import Enquiry from "./components/Home/PostEnquiry/PostEnquiry";
import BulkQuantityQuotation from "./components/ProductDetails/BulkQuantityQuotation";
import BulkquotationSuccess from "./components/ProductDetails/BulkquotationSuccess";
import UserRegisterSuccess from "./components/Auth/UserRegister/UserRegisterSuccess";
import CorporateLogin from "./components/Auth/CorporateLogin/CorporateLogin";
import CorporateRegister from "./components/Auth/CorporateRegister/CorporateRegister";
import VendorRegisterSuccess from "./components/Auth/VendorRegister/VendorRegisterSuccess";
import ViewSubCategory from "./components/ViewSubCategory/ViewSubCategory";
import ViewSubSubCategory from "./components/ViewSubSubCategory/ViewSubSubCategory";
import ViewProduct from "./components/ProductDetails/ViewProduct";
import ViewProducts from "./components/ViewProducts/ViewProducts";
import ProductsAll from "./components/ProductsAll/ProductsAll";
import ScrollToTop from "./ScrollToTop";
import HireProfessionals from "./components/HireProfessionals/HireProfessionals";
import ProfessionalDetails from "./components/HireProfessionals/ProfessionalDetails";
import EnquirySuccess from "./components/Home/PostEnquiry/EnquirySuccess";
import OurServices from "./components/OurServices/OurServices";
import PrimarySearchAppBar from "./components/Shared/Navbars/TopNavBar2/TopNavBar2";
import CategoryNavbar from "./components/Shared/Navbars/CategoryNavbar/CategoryNavbar";
import ServiceNavbar from "./components/Shared/Navbars/ServiceNavbar/ServiceNavbar";
import AddressForm from "./components/UserProfile/ManageAddress/AddressForm";
import Cart from "./components/Cart/Cart";
export const UserContext = createContext();
function App() {
  const [redirect, setRedirect] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/userlogin">
              <UserLogin redirect={redirect}></UserLogin>
            </Route>
            <Route path="/corporateregister">
              <CorporateRegister></CorporateRegister>
            </Route>
            <Route path="/usersignup">
              <UserRegister></UserRegister>
            </Route>
            <Route path="/vendorsignup">
              <VendorRegister></VendorRegister>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/postEnquiry">
              <Enquiry />
            </PrivateRoute>
            <Route path="/enquirysuccess">
              <EnquirySuccess></EnquirySuccess>
            </Route>
            <Route path="/loginsuccess">
              <UserLoginSuccess></UserLoginSuccess>
            </Route>
            <Route path="/registersuccess">
              <UserRegisterSuccess></UserRegisterSuccess>
            </Route>
            <Route path="/vendorregistersuccess">
              <VendorRegisterSuccess></VendorRegisterSuccess>
            </Route>
            <Route path="/categoryall">
              <CategoryAll></CategoryAll>
            </Route>
            <Route path="/subcategoryall">
              <SubCategoryAll></SubCategoryAll>
            </Route>

            <Route path="/subsubcategoryall">
              <SubSubCategoryAll></SubSubCategoryAll>
            </Route>
            <Route path="/productsall">
              <ProductsAll></ProductsAll>
            </Route>
            <Route path="/productDetails/:productId">
              <Product setRedirect={setRedirect} />
            </Route>
            <PrivateRoute path="/BulkQuantityQuotation/:productName/:productId">
              <BulkQuantityQuotation />
            </PrivateRoute>
            <Route path="/bulkquotationsuccess">
              <BulkquotationSuccess />
            </Route>
            <Route path="/compareProducts/:id1/:id2">
              <Compare />
            </Route>
            <PrivateRoute path="/userprofile">
              <UserProfile></UserProfile>
            </PrivateRoute>
            <PrivateRoute path="/checkout/:id/:quantity/:userId">
              <Payment name={loggedInUser.username} setRedirect={setRedirect} />
            </PrivateRoute>
            <Route path="/viewSubcategory/:productId">
              <ViewSubCategory></ViewSubCategory>
            </Route>
            <Route path="/viewSubSubcategory/:productId">
              <ViewSubSubCategory></ViewSubSubCategory>
            </Route>
            <Route path="/viewProducts/:productId">
              <ViewProducts></ViewProducts>
            </Route>
            <Route path="/Confirmcheckout/:id/:qty">
              <Checkout userId={loggedInUser._id} />
            </Route>
            <Route path="/SuccessOrder">
              <Successorder />
            </Route>
            <PrivateRoute path="/cart">
              <Cart />
            </PrivateRoute>

            <Route path="/hiring">
              <HireProfessionals />
            </Route>
            <Route path="/ourservices">
              <OurServices />
            </Route>
            <Route path="/hire/:id">
              <ProfessionalDetails />
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
