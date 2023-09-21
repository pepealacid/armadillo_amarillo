import React, { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes

import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return "Loading...";
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, 
  redirectTo: PropTypes.string, 
};
