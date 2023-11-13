import { Link } from "react-router-dom";
import styles from './CardProductShare.module.css';

const CardProductShare = ({ product }) => {

  return (
    <div className={styles.cardProductShare}>
      {/*<img src={product.images[0]}></img>
            <p>{product.description}</p>
    */}
      <img src={product.images[0].url} />
      <p>
        {product.description}
      </p>
      <Link to={`/product/${product.id}`} >Enlace a la pagina del producto</Link>
    </div>
  );
};
export default CardProductShare;
