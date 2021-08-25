import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  let userId;
  if (user) {
    userId = user.loginSuccess._id;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/userlogin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
