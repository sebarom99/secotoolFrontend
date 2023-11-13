import { useEffect } from "react";
import { useFunction } from "../../../contexts/FunctionsContext";
import styles from "./PersonalInfo.module.css";

const PersonalInfo = ({documento, setDocumento}) => {
  const { user } = useFunction();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.sectionPersonalInfo}>
      <div>
        <h4>Tus datos personales</h4>
        <div className={styles.containerInfo}>
          <div className={styles.boxInfo}>
            <span>Nombre</span>
            <p>{user.firstName}</p>
          </div>
          <div className={styles.boxInfo}>
            <span>Apellido</span>
            <p>{user.lastName}</p>
          </div>
          <div className={styles.boxInfo}>
            <span>Email</span>
            <p>{user.username}</p>
          </div>
        </div>
      </div>

      <div>
        <h4>Información personal</h4>
        <form action="" className={styles.formPersonalInfo}>
          <select name="" id="" className={styles.selectForm}>
            <option value="DNI">DNI</option>
            <option value="LC">LC</option>
            <option value="LE">LE</option>
            <option value="CI">CI</option>
          </select>
          <input
            type="text"
            placeholder="Numero de documento"
            className={styles.inputForm}
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
