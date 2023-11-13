import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [upDateUser, setUpDateuser] = useState({})
  const TOKEN_KEY = "tokenUserLog";
  
  const tokenHaExpirado = (token) => {
    const tokenDecodificado = jwtDecode(token);
    console.log("Hola soy el token decodificado:", tokenDecodificado)
    const fechaExpiracion = tokenDecodificado.exp * 1000; // Convertir la fecha de expiración a milisegundos
    console.log("Hola soy la fecha de expiracion:", fechaExpiracion)
    return Date.now() >= fechaExpiracion;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      if (tokenHaExpirado(storedToken)) {
        // El token ha expirado, por lo que cerramos sesión
        logout();
      } else {
        // El token aún es válido
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const login = (token) => {
    localStorage.setItem("tokenUserLog", token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("tokenUserLog");
    localStorage.removeItem("user");
    setToken(null);
    setIsLoggedIn(false);
    setUser({});
  };

  const userLog = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, userLog, user, upDateUser, setUpDateuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
