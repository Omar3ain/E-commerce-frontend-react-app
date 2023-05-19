import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const  { user } = useSelector((state) => state.auth)
    const checkUserToken = () => {
        if (!user) {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
      <>
      {
          isLoggedIn ? props.children : null
      }
  </>
    );
}

export default ProtectedRoute;