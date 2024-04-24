import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar";
function Recommend() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Recommend;
