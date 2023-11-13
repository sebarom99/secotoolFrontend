import { Link } from "react-router-dom";
import AvatarSm from "../../avatar/AvatarSm";
import style from "./DropdownProfile.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useFunction } from "../../../contexts/FunctionsContext";

const DropdownProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, token } = useAuth();
  const { fetchUser, user } = useFunction();

  useEffect(() => {
    fetchUser(token);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className={style.dropdown} ref={dropdownRef}>
      <AvatarSm
        className={style.avatarDropdown}
        toggle={toggleDropdown}
        user={user}
      ></AvatarSm>
      <div
        className={`${style.dropdownContent} ${dropdownOpen ? style.show : ""}`}
      >
        <span>{user.firstName + " " + user.lastName}</span>
        <hr />
        <nav className="d-flex f-dir-colum ">
          <Link to="/Profile" onClick={toggleDropdown}>
            <i className="fa-regular fa-user"></i>
            Ver Perfil
          </Link>
          <Link to="/favorites" onClick={toggleDropdown}>
            <i className="fa-regular fa-heart"></i>Mis favoritos
          </Link>
          <Link to="/alquileres" onClick={toggleDropdown}>
            <i className="fa-regular fa-calendar-clock"></i>Mis alquileres
          </Link>
          <Link to="/" onClick={logout}>
            <i className="fa-regular fa-arrow-right-from-bracket"></i> Cerrar
            Sesión
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default DropdownProfile;
