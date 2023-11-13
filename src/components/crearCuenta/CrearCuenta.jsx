
import FormCrearCuenta from "../form/formCrearCuenta/FormCrearCuenta";
import styles from '../crearCuenta/CrearCuenta.module.css'
import HeaderAuth from "../header/headerAuth/HeaderAuth";
import { useLocation } from "react-router-dom";

const CrearCuenta = () => {

  const locationData = useLocation();

  return (
    <section className={styles.sectionCrearCuenta + " spacing-grid"}>
      <div className={styles.bgCrearCuenta}></div>
      <HeaderAuth/>
      <FormCrearCuenta locationData={locationData.state ? locationData : undefined}/>
      
    </section>
  );
};

export default CrearCuenta;
