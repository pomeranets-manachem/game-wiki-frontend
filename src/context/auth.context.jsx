import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate()
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = (url) => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          if (url) {
            navigate(url)
          } else {
            navigate('/')
          }
        })
        .catch((error) => {
          if (error) {
            setAuthError(error.response.data.message);
            return;
          }
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return false
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
