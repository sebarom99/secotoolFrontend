import { useEffect } from "react";
import { useFunction } from "../../../contexts/FunctionsContext";
import styles from "./Confirm.module.css";

const Confirm = () => {
  const { user } = useFunction();

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <div className={styles.boxConfirm}>
      <h4>¡ESTÁS A UN CLICK DE CONFIRMAR TU ALQUILER, {user.firstName.toUpperCase()}</h4>
      <ul>
        <li>
          <i className="fa-regular fa-envelope"></i> Luego de que confirmes el
          alquiler recibirás un correo electrónico con los detalles del mismo.
        </li>
        <li>
          <i className="fa-regular fa-list"></i> Al seleccionar el botón
          Solicitar alquiler estarás aceptando las políticas, términos y
          condiciones de SECOTOOL.
        </li>
      </ul>
    </div>
  );
};
export default Confirm;
