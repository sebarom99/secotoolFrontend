import styles from "./Alquileres.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import ListAlquileres from "./ListAlquileres";
import SkeletonFavoritesAlquileres from "../../skeletonFavoritesAlquileres/SkeletonFavoritesAlquileres";

const LoadingIndicator = () => <SkeletonFavoritesAlquileres />;
const NetworkError = () => <p>Network Error</p>;

function Alquileres() {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const [alquileres, setAlquileres] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `${globalVariable}/v1/api/rentals/historical`;

  const ComponentListAlquileres = alquileres ? (
    <ListAlquileres alquileres={alquileres} />
  ) : null;

  const fetchAlquileres = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlquileres(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlquileres();
  }, []);

  return (
    <div className={styles.alquileresContainer}>
      <h4>Mis Alquileres</h4>
      <div className={styles.cardFContainer}>
        {loading ? <LoadingIndicator /> : ComponentListAlquileres}
        {alquileres === undefined && !loading && <NetworkError />}
      </div>
    </div>
  );
}

export default Alquileres;
