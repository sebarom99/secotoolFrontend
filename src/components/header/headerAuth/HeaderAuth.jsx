import LogoEmpresa from "../../../assets/img/LogoDesktop.png";
import styles from "../headerAuth/HeaderAuth.module.css";
import { Link } from "react-router-dom";

const HeaderAuth = () => {
  return (
    <header className={styles.headerSeccionCrearCuenta}>
      <Link to={"/"}>
        <button className="button-transparent font-btn-transparent">
          <i className="fa-regular fa-arrow-left"></i>Volver atrás
        </button>
      </Link>
      <div className={styles.logoYtexto}>
        <img src={LogoEmpresa} alt="logoEmpresa" />
        {window.location.pathname.includes("/login") ? (
          <h3>Iniciar Sesión</h3>
        ) : (
          <h3 className="font-xl font-light">Crear Cuenta</h3>
        )}
      </div>
    </header>
  );
};

export default HeaderAuth;
