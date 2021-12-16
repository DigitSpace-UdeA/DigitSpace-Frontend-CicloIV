// import { useUser } from "context/userContext";
import { useUser } from "../context/userContext";
import React from "react";

const PrivateComponent = ({ roleList, children }) => {
  const { userData } = useUser();
  console.log("rolllll", roleList);

  if (roleList.includes(userData.rol)) {
    console.log("rrr", userData.rol);
    return children;
  }

  return <></>;
};

export default PrivateComponent;
