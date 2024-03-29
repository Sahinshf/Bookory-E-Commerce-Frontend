import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ roles, children }) => {
  const location = useLocation();
  console.log(
    "🚀 ~ file: PrivateRoute.jsx:7 ~ PrivateRoute ~ location:",
    location,
  );

  const token = JSON.parse(localStorage.getItem("token"));

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    const decodedToken = jwtDecode(token.token);
    const userRole =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return <Navigate to="/login" />;
    }

    if (roles.includes(userRole)) return children;
    else return <Navigate to="/notfound" />;
  }
};

export default PrivateRoute;
