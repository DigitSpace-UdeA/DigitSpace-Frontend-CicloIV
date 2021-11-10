import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>soy el pinshe nav</nav>
      <Outlet />
    </div>
  );
};

export default Layout;
