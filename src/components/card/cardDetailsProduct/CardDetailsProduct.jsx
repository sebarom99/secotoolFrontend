import { Rate } from "rsuite";
import styles from "./CardDetailsProduct.module.css";

const CardDetailsProduct = () => {
  return
  (
  <div>
    <img src="../src/assets/img/taladro-1.png"></img>
    <h5>Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja de cartón - Azul - 220V</h5>
    <div className={styles.formRate}>
        <Rate readOnly max={5} /*defaultValue={review.score} */ size="xs" allowHalf/>
    </div>
    <hr />
  </div>
  );
};
export default CardDetailsProduct;
