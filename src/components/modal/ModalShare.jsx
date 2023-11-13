import { useState } from "react";
import { Modal, Button, Whisper, Tooltip } from "rsuite";
import FormShareProduct from "../form/formShareProduct/FormShareProduct";
import styles from "./ModalShare.module.css";

const tooltip = (
  <Tooltip>
    Compartir
  </Tooltip>
);


const ModalShare = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
    <Button size="lg" onClick={() => handleOpen("lg")}>
      <i className="fa-regular fa-share-nodes"></i>
      </Button>
    </Whisper>

      <Modal
        overflow={false}
        size="lg"
        open={open}
        onClose={handleClose}
        className={styles.modal}
      >
        <Modal.Header>
          <Modal.Title>Compartir producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormShareProduct product={product}></FormShareProduct>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalShare;
