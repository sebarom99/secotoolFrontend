import styles from "./CardReview.module.css";
import { Rate } from "rsuite";

const CardReview = ({ productReviews }) => {
  return (
    <li>
      {productReviews.map((review) => (
        <div key={review.id} className={styles.cardReview}>
          <h4>
            {review.user.firstName} {review.user.lastName}
          </h4>
          <span>{review.reviewDay}</span>
          <div className={styles.formVal}>
            <div className={styles.formRate}>
              <Rate readOnly max={5} defaultValue={review.score} size="xs" allowHalf/>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </li>
  );
};
export default CardReview;
