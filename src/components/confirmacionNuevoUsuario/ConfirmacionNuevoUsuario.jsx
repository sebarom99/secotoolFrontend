import HeaderAuth from "../header/headerAuth/HeaderAuth";
import styles from "../confirmacionNuevoUsuario/ConfirmNewUser.module.css";
import Confirmacion from "./Confirmacion";
import { useLocation } from "react-router-dom";

const ConfirmacionNuevoUsuario = () => {

  const locationData= useLocation();

  return (
    <section className={styles.confirmacionNuevoUsusario + " spacing-grid"}>
      <div className={styles.bgCrearCuenta}></div>
      <HeaderAuth />
      <div className={styles.headerYconfirm}>
        <Confirmacion className={styles.confirmacion} locationData={locationData.state ? locationData : undefined} />
      </div>
    </section>
  );
};

export default ConfirmacionNuevoUsuario;
