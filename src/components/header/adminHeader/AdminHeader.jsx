import styles from "../adminHeader/AdminHeader.module.css";
import Logo from "../../../assets/img/LogoMovile.png";
import { NavLink } from "react-router-dom";
import "../../../index.css";
import "../../../app.css";
import { useAuth } from "../../../contexts/AuthContext";

const AdminHeader = () => {
  const { logout } = useAuth();
  return (
    <header className="spacing-grid">
      <nav className={styles.navbar}>
        <div>
          <NavLink to="/admin/home" className={styles.leftNavbar}>
            <img src={Logo} className={styles.logo} alt="SecoTool" />
            <span className={styles.slogan}>Construí fácil y rápido</span>
          </NavLink>
        </div>
        <div className={styles.navbarButtons}>
          <div>
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-box"></i>
              Productos
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-user"></i>
              Usuarios
            </NavLink>
            <NavLink
              to="/admin/features"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-palette"></i>
              Características
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-tag"></i>
              Categorías
            </NavLink>
            <NavLink
              to="/admin/politicas"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-file-contract"></i>
              Politícas
            </NavLink>
          </div>
          <div>
            <NavLink className={styles.closeSesion} to="/home">
              <i className="fa-regular fa-store"></i>
              Tienda
            </NavLink>
            <NavLink className={styles.closeSesion} to="/" onClick={logout}>
              <i className="fa-regular fa-right-from-bracket"></i>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
