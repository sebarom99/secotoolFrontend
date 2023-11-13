import { useState } from "react";
import { Modal, Button, Rate } from "rsuite";
import styles from "./ModalReview.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useAuth } from "../../../contexts/AuthContext";

const ModalReview = ({ open, size, handleClose, productId }) => {
  const [stars, setStars] = useState(0);
  const [desc, setDesc] = useState("");
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  async function fetchReview() {
    await axios
      .post(
        `${globalVariable}/v1/api/reviews/${productId}`,
        {
          comment: desc,
          score: stars,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        handleClose();
        setStars(0);
        setDesc("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Modal
      size={size}
      open={open}
      onClose={handleClose}
      className={styles.modalReview}
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      dialogClassName={styles.dialogClassName}
    >
      <Modal.Header>
        <Modal.Title style={{ fontWeight: "600", color: "var(--dark)" }}>
          ¡Gracias por tu alquiler!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.mrBody}>
        <form>
          <span className={styles.mrSubtitle}>Califíca el producto</span>
          <Rate max={5} value={stars} onChangeActive={setStars} size="lg" />
          <span className={styles.mrSubtitle}>
            ¿Qué te pareció el producto?
          </span>
          <textarea
            className={styles.textArea}
            name=""
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id=""
            cols="30"
            rows="10"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.footerButtons}>
          <Button
            style={{ backgroundColor: "#4a6ac9" }}
            onClick={() => fetchReview()}
            appearance="primary"
          >
            Calificar
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Omitir
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalReview;
