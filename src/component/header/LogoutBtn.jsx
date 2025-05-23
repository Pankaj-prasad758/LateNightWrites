import React from "react";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHanlder = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Appwrite :: logoutHandler :: error", error);
      });
  };

  return (
    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogoutBtn;
