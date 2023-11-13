import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import FavoriteCard from "./FavoriteCard";
import { useEffect } from "react";
import styles from "./Favorites.module.css";
import { Message, useToaster } from "rsuite";

const ListFavorites = ({ favorites, fetchFavorites }) => {
  const { globalVariable } = useGlobal();
  const { token } = useAuth();
  const toaster = useToaster();


  const messageErr = (
    <Message showIcon type="error" closable>
      No se ha podido borrar el producto de favoritos
    </Message>
  );

  const messageOk = (
    <Message showIcon type="success" closable>
      El producto se ha borrado de favoritos
    </Message>
  );

  const handleDeleteFavorite = async (productId) => {
    const apiUrlDelete = `${globalVariable}/v1/api/users/products/${productId}`;

    try {
      await axios.delete(apiUrlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFavorites();
      toaster.push(messageOk, {
        placement: "bottomStart",
        duration: 5000,
      });
    } catch (error) {
      console.error(`Error al eliminar el producto ${productId}:`, error);
      toaster.push(messageErr, {
        placement: "bottomStart",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    console.log(favorites.length);
  }, []);

  return (
    <>
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <FavoriteCard
            key={product.id}
            id={product.id}
            images={product.images[0].url}
            name={product.name}
            price={product.price}
            deleteItem={() => handleDeleteFavorite(product.id)}
          />
        ))
      ) : (
        <span className={styles.noFavorites}>
          ¡Aun no tenes productos favoritos!
        </span>
      )}
    </>
  );
};

export default ListFavorites;
