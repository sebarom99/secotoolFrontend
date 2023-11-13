import styles from "../usersAdmin/UsersAdmin.module.css";
import { useEffect, useState } from "react";
import UsersAdminCard from "../../adminUserCard/UsersAdminCard";
import Pagination from "../../pagination/Pagination";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import EsqueletorAdmin from "../../EsqueletorAdmin/EsqueletorAdmin";

const UsersAdmin = () => {
  const { token } = useAuth();

  const {globalVariable}= useGlobal();

  const [user, setUser] = useState([]);

  const fetchUsersAdmin = async () => {
    try {
      const response = await fetch(`${globalVariable}/v1/api/users/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setCargando(false)
        console.log(data);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log("este es el error", error);
    }
  };
  useEffect(() => {
    fetchUsersAdmin();
  }, []);

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  console.log(user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastPostIndex = currentPage * itemsPerPage;
  const fistPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = user.slice(fistPostIndex, lastPostIndex);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  //-------------------------------------LOUDER-----------------------------------

  const [cargando, setCargando] = useState(true)

  const renderUsers =   user &&
    currentPost.map((user) => (
      <UsersAdminCard
        key={user.id}
        selectedUser={user}
        getData={() => fetchUsersAdmin()}
      />
    ))

 //-------------------------------------COMPONENTE-----------------------------------

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <h1
              style={{ fontWeight: "400", fontSize: "19px", padding: "16px 0" }}
            >
              Todos los usuarios
            </h1>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Nombre</span>
                <span>Acciones</span>
              </div>
             {cargando ? <EsqueletorAdmin/> : renderUsers}
              <Pagination
                totalPosts={user.length}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo mas grande
        </span>
      )}
    </div>
  );
};
export default UsersAdmin;
