import styles from "./AlquilerCard.module.css";
import ModalReview from "../../modal/modalReview/ModalReview";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AlquilerCard({productId,productImage,productName,rentalDay,rentalStart,rentalEnd,total}) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [state, setState] = useState("");

  const status = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (true) {
      case rentalStart > today:
        setState("CONFIRMADO");
        break;

      case rentalStart <= today && rentalEnd >= today:
        setState("EN CURSO");
        break;

      case rentalEnd < today:
        setState("FINALIZADO");
        break;

      default:
        return <span>No se ha podido determinar el estado</span>;
    }
  };

  const textColor = (state) => {
    if (state === 'CONFIRMADO') {
        return '#4a6ac9';
    }else if( state === 'EN CURSO'){
      return 'green'
    }
    return 'red';
}

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    status();
  }, []);

  return (
    <>
      <div className={styles.cardFavorite}>
        <img
          src={productImage}
          alt={productName}
          className={styles.productImage}
        />
        <div className={styles.infoCard}>
          <span className={styles.status} style={{color: textColor(state)}}>{state}</span>
          <span className={styles.dateRange}>Del {rentalStart} al {rentalEnd}</span>
          <span className={styles.productName}>{productName}</span>
          <span className={styles.favoritePrice}>
            ${total} - Reservado el {rentalDay}
          </span>
        </div>
        <div className={styles.buttonsAlquiler}>
          <Link className={styles.linkProduct} to={`/product/${productId}`}>
            Volver a alquilar
          </Link>
          <button
            disabled={state == "CONFIRMADO" ? true : false}
            className={state == "CONFIRMADO" ? `${styles.buttonDisabled}` : ""}
            onClick={() => handleOpen("lg")}
          >
            Valorar
          </button>
        </div>
      </div>
      <ModalReview
        open={open}
        size={size}
        handleClose={handleClose}
        productId={productId}
      />
    </>
  );
}

export default AlquilerCard;
