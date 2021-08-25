import React from "react";
import { useParams } from "react-router";
import ManageAddress from "../ManageAddress/ManageAddress";
import MyCart from "../MyCart/MyCart";
import OrderHistory from "../OrderHistory/OrderHistory";
import TrackOrder from "../TrackOrder/TrackOrder";
import WishList from "../WishList/WishList";
import CancelOrder from "../CancelOrder/CancelOrder";
import "./UserProfileRoute.css";
import ProfileUpdate from "../ProfileUpdate/ProfileUpdate";
import AddressForm from "../ManageAddress/AddressForm";
import ChangePasswordForm from "../ProfileUpdate/ChangePasswordForm";
import ImageUpload from "../ProfileUpdate/ImageUpload";
import AddAddressForm from "../ManageAddress/AddAddressForm";
// import EditAddress from "../ManageAddress/EditAddress";
const UserProfileRoute = () => {
  const { navId, addid } = useParams();

  return (
    <div className="userProfileMangement-container">
      {navId === "myprofile" && <ProfileUpdate></ProfileUpdate>}
      {navId === "manageaddress" && <ManageAddress></ManageAddress>}
      {navId === "wishlist" && <WishList></WishList>}
      {navId === "mycart" && <MyCart></MyCart>}
      {navId === "orderhistory" && <OrderHistory></OrderHistory>}
      {navId === "trackorder" && <TrackOrder></TrackOrder>}
      {navId === "cancelorder" && <CancelOrder></CancelOrder>}
      {navId === `AddressForm` && <AddressForm />}
      {navId === "AddAddressForm" && <AddAddressForm />}
      {navId === "ChangePassword" && <ChangePasswordForm />}
      {navId === "imageupload" && <ImageUpload />}
    </div>
  );
};

export default UserProfileRoute;
