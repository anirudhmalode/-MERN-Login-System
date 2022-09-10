import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1> 404: No page Found! </h1>
      <NavLink to="/"> back to Home page! </NavLink>
    </div>
  );
};

export default ErrorPage;
