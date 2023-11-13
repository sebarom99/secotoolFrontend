import styles from "../confirmacionNuevoUsuario/Confirmacion.module.css";
import { Link } from "react-router-dom";
import { useGlobal } from "../../contexts/GlobalContext";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Confirmacion = ({locationData}) => {
  const { globalVariable } = useGlobal();
  const { upDateUser } = useAuth();
  const [mensaje, setMensaje] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("");

  const apiUrl = `${globalVariable}/v1/api/auth/resend_email`;
  const requestData = {
    "firstName": upDateUser.name,
    "lastName": upDateUser.lastname,
    "username": upDateUser.email
  };

  console.log("datos usuario recien creado", upDateUser);

  const handleReenviar = () => {
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        if (response.status === 200) {
          setMensaje(true);
          setTipoMensaje("El email ya fue enviado nuevamente");
        }
      })
      .catch((error) => {
        setMensaje(true);
        setTipoMensaje("Ocurrio un error al enviar el email nuevamente");
        console.error("Error al realizar la solicitud:", error);
      });
  };

  return (
    <div className={styles.confirmacion}>
      <i
        className="fa-sharp fa-solid fa-circle-check"
        style={{ color: "#27ae1e", fontSize: 80 }}
      />
      <h1 className={styles.text}>Tu cuenta fue creada exitosamente!</h1>
      <p className={styles.text}>
        Te llegará un email con la confirmación
      </p>
      <Link to={"/auth/login"} state={locationData !== undefined ? locationData.state : undefined}>
        <button className={styles.btnSuccess}>Iniciar Sesión</button>
      </Link>
      <button onClick={handleReenviar} className={styles.btnReenviar}>
        Volver a enviar email
      </button>
      {mensaje ? <p className={tipoMensaje.startsWith('Ocurrio') ? styles.mensajeErrorRed : styles.mensajeErrorGreen}>{tipoMensaje}</p> : null}

    </div>
  );
};

export default Confirmacion;
