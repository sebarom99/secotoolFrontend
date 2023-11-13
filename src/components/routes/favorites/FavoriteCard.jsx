import styles from "./FavoriteCard.module.css";

function FavoriteCard(props) {
  return (
    <div className={styles.cardFavorite}>
      <img
        src={props.images}
        alt={props.name}
        className={styles.productImage}
      />
      <div className={styles.infoCard}>
        <div>
        <p className={styles.productName}>{props.name}</p>
        <p className={styles.favoritePrice}>${props.price}</p>
        </div>
        <div className={styles.deleteButton} onClick={props.deleteItem}>
        <i
          className="fa-regular fa-trash-can fa-lg"
          style={{ color: "#E61717" }}
        >
          <span style={{ paddingLeft: 5 }}>Eliminar</span>
        </i>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
