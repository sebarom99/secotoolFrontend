import { Message, Modal, toaster } from "rsuite";
import styles from "./ModalPolitica.module.css";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";

function ModalPolitica({
  open,
  handleClose,
  handleNewProductSubmit,
  fetchPoliticasAdmin,
}) {
  const [newPolitic, setNewPolitic] = useState({ name: "", description: "" });
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const handleSubmit = () => {
    addPoliticAdmin();
    handleClose();
  };

  const message = (
    <Message showIcon type="success" closable>
      La politica se ha creado exitosamente
    </Message>
  );


  const addPoliticAdmin = async () => {
    console.log(newPolitic);

    try {
      const tokenUser = token;
      const response = await axios.post(
        `${globalVariable}/v1/api/politics/admin`,
        {
          title: newPolitic.name,
          description: newPolitic.description,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      fetchPoliticasAdmin();
      toaster.push(message, { placement: "bottomStart", duration: 5000 });
      console.log(response);
    } catch (error) {
      console.error("Esta entrando en este error: ", error);
    }
  };

  return (
    <Modal
      size="md"
      open={open}
      onClose={handleClose}
      overflow={false}
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      dialogClassName={styles.dialogClassName}
    >
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Nueva Política
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleNewProductSubmit}
          >
            <label htmlFor="">
              Nombre de la Política
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setNewPolitic({ ...newPolitic, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                onChange={(e) =>
                  setNewPolitic({
                    ...newPolitic,
                    description: e.target.value,
                  })
                }
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleSubmit()}>Agregar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPolitica;
