import TextField from "@mui/material/TextField";
import { Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./FormCrearCuenta.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../../contexts/GlobalContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../../contexts/AuthContext";

const FormCrearCuenta = ({locationData}) => {
  const { globalVariable } = useGlobal();
  const { setUpDateuser } = useAuth();
  //en estos initial values se me van a guardar luego lo que el usuario escriba en los inputs
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  //vaidaciones de los campos usando YUP
  const navigate = useNavigate();
  const [mensajeError, setMensajeError] = useState(false);
  const [tipoError, setTipoError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Tu nombre debe contener 3 o más caracteres")
      .required("Debes ingresar un nombre"),
    lastname: Yup.string()
      .min(3, "Tu apellido debe contener 3 o más caracteres")
      .required("Debes ingresar un apellido"),
    email: Yup.string()
      .email("Debes ingresar un email válido")
      .required("Debes ingresar un email"),
    password: Yup.string()
      .min(6, "Tu contraseña debe tener un mínimo de 6 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Tu contraseña debe contener al menos una letra mayúscula y un número"
      )
      .required("Debes ingresar una contraseña"),
  });

  //utilizamos formik desestructurando varias cosas propias de formik
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        setUpDateuser(values);
        try {
          setMensajeError(false);
          console.log(values);
          const response = await axios.post(
            `${globalVariable}/v1/api/auth/singup`,
            {
              firstName: values.name,
              lastName: values.lastname,
              username: values.email,
              password: values.password,
            }
          );

          if (response.status === 200 && locationData !== undefined) {
            console.log(response.data);
            console.log(locationData)
            navigate("/auth/confirmacionNuevoUsuario", {state: locationData.state});
          }else{
            navigate("/auth/confirmacionNuevoUsuario");
          }
        } catch (error) {
          setMensajeError(true);
          console.error("Error al crear el usuario:", error);
          if (error.response.data.startsWith("username")) {
            setTipoError("Este email ya existe, intenta con uno nuevo");
          } else {
            setTipoError("Algo salio mal, intenta mas tarde");
          }
        }
      },
      validationSchema: validationSchema,
    });

  return (
    <>
      <form className={styles.formulario} id="form" onSubmit={handleSubmit}>
        <Grid container className={styles.contenedorForm}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="text"
              // id="outlined-basic"
              name="name"
              label="Nombre"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              error={touched.name && errors.name ? true : false}
              helperText={touched.name && errors.name ? errors.name : ""}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="text"
              // id="outlined-basic"
              name="lastname"
              label="Apellido"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              error={touched.lastname && errors.lastname ? true : false}
              helperText={
                touched.lastname && errors.lastname ? errors.lastname : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="email"
              // id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email ? errors.email : ""}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              // id="outlined-basic"
              name="password"
              label="Contraseña"
              variant="outlined"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              error={touched.password && errors.password ? true : false}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Button
            className={styles.botonCrearCuenta}
            type="submit"
            variant="contained"
          >
            Crear Cuenta
          </Button>
          <NavLink to="/auth/login" className={styles.customLink}>
            <Button
              variant="outlined"
              style={{ borderColor: "#4a6ac9", color: "#4a6ac9" }}
            >
              Iniciar Sesión
            </Button>
          </NavLink>
          {mensajeError === true ? tipoError : null}
        </Grid>
      </form>
    </>
  );
};

export default FormCrearCuenta;
