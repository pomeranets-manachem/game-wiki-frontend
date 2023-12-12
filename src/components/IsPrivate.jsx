import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useLocation } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const prevLocation = useLocation()
  
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    if (prevLocation == null) return <Navigate to="/login" />;
    else return <Navigate to={`/login?redirectTo=${prevLocation.pathname}`} />

  } else {
    return children;
  }
}

export default IsPrivate;