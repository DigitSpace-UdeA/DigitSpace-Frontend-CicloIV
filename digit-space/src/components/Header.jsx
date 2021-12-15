import { useAuth } from "../context/authContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-5  justify-center bg-gray-300  flex sticky">
      <div className="flex flex-col">
        <div className="">Soy el Header</div>
        <div className="flex ">
          <Logout />
        </div>
      </div>
    </header>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log("eliminar token");
    setToken(null);
  };
  return (
    <ul onClick={() => deleteToken()}>
      <NavLink to="/" className=" text-red-700">
        <div className=" items-center">
          <i className="fas fa-sign-out-alt" />
          <span className="text-sm  ml-2">Cerrar Sesión</span>
        </div>
      </NavLink>
    </ul>
  );
};

export default Header;
