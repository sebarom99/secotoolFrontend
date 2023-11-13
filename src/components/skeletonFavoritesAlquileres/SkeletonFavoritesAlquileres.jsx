
import styles from "../skeletonFavoritesAlquileres/SkeletonFavoritesAlquileres.module.css";
import { Grid } from "@mui/material";

const SkeletonFavoritesAlquileres = () => {
  const renderDiezElementos = () => {
    const elementos = [];

    for (let i = 0; i < 3; i++) {
      elementos.push(
      <Grid item xs={12} md={12} key={i} className={styles.elemento} style={{ gap: '5px' }}/>
      );
    }
    return elementos;
  };

  return (
    <Grid container className={styles.contenedorCardsSkeleton}>
      {renderDiezElementos()}
    </Grid>
  );
};

export default SkeletonFavoritesAlquileres;