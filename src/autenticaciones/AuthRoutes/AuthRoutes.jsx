import { Route, Routes } from "react-router-dom";
// import AuthLayout from "./AuthLayout";
import CrearCuenta from "../../components/crearCuenta/CrearCuenta";
import Login from "../../components/logIn/Login";
import ConfirmacionNuevoUsuario from "../../components/confirmacionNuevoUsuario/ConfirmacionNuevoUsuario";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/crearCuenta" element={<CrearCuenta />} />
      <Route path="/confirmacionNuevoUsuario" element={<ConfirmacionNuevoUsuario />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AuthRoutes;
