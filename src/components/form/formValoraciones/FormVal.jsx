import { Rate } from "rsuite";
import styles from "./FormVal.module.css";

const FormVal = ({ productReviews }) => {
  return (
    <div className={styles.formVal}>
      <h2 className={styles.valTitle}>{productReviews.averageScore}</h2>
      <div className={styles.formRate}>
        <Rate
          max={5}
          value={productReviews.averageScore}
          readOnly
          allowHalf
          size="xs"
        />
      </div>
      <span>{productReviews.productReviews.length} valoraciones</span>
    </div>
  );
};
export default FormVal;
