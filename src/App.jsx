import "./rsuite.less";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./autenticaciones/AuthRoutes/AuthRoutes";
import AppRoutes from "./autenticaciones/AppRoutes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { FunctionProvider } from "./contexts/FunctionsContext";
import AppRoutesAdmin from "./autenticaciones/AppRoutesAdmin/AppRoutesAdmin";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <FunctionProvider>
          <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/*" element={<AppRoutes />} />
            <Route path="/admin/*" element={<AppRoutesAdmin />} />
          </Routes>
        </FunctionProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
