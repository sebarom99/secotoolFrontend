import { useState } from "react";
import { Modal, Button } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import FormFilterCategory from "../form/formFilter/FormFilterCategory";
import style from "./ModalFilters.module.css";

const ModalFilters = ({ updatefilterProducts, productos }) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => handleOpen("full")}
        className={style.btnFiltros}
      >
        Filtros <i className="fa-regular fa-filter"></i>
      </Button>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header className={style.modalHeader}>
          <Modal.Title>Filtrar resultados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFilterCategory
            close={handleClose}
            updateFilteredProducts={updatefilterProducts}
            products={productos}
          ></FormFilterCategory>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalFilters;
