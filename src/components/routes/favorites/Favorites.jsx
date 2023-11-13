import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import ListFavorites from "./ListFavorites";
import SkeletonFavoritesAlquileres from "../../skeletonFavoritesAlquileres/SkeletonFavoritesAlquileres";

const LoadingIndicator = () => <SkeletonFavoritesAlquileres />;
const NetworkError = () => <p>Network Error</p>;

function Favorites() {
  const { token } = useAuth();
  console.log(token);

  const [favorites, setFavorites] = useState([]);
  const { globalVariable } = useGlobal();
  const [loading, setLoading] = useState(true);


  const apiUrl = `${globalVariable}/v1/api/users/products/favorites`;

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(response.data);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }finally {
      // Independientemente de si hay un error o no, la carga se detiene
      setLoading(false);
    }
  };

  const ComponentListFavorites = favorites ? (
    <ListFavorites favorites={favorites} fetchFavorites={fetchFavorites}/>
  ) : null;

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <section className={styles.favoritesContainer}>
      <h4>Mis Favoritos</h4>
      <div className={styles.cardFContainer}>
        {loading ? <LoadingIndicator /> : ComponentListFavorites}
        {favorites === undefined && !loading && <NetworkError />}
      </div>
    </section>
  );
}

export default Favorites;
