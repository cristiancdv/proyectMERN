import React, { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider(props) {
  const [userLogin, setUserLogin] = useState(localStorage.getItem("login"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const loginUser = (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
    localStorage.setItem("login", true);
    setUserLogin(true);

  };
  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(false);
    localStorage.removeItem("login");
    setUserLogin(false);

  };


  return (
    <AuthContext.Provider
      value={{
        userLogin,
        loginUser,
        logoutUser,
        userInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
