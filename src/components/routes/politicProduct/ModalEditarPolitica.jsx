import { Message, Modal, toaster } from "rsuite";
import styles from "../../editCategoryModal/EditCategoryModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";

function ModalEditarPolitica({
  handleClose,
  open,
  selectedPolitic,
  fetchPoliticasAdmin,
}) {
  const { token } = useAuth();
  const [currentPolitic, setCurrentPolitic] = useState({
    name: "",
    description: "",
  });
  const { globalVariable } = useGlobal();

  const message = (
    <Message showIcon type="success" closable>
      La politica se ha editado exitosamente
    </Message>
  );

  const handleSubmit = () => {
    editPolitic();
    handleClose();
  };

  const editPolitic = async () => {
    const title = currentPolitic.title;
    const description = currentPolitic.description;

    try {
      await axios.put(
        `${globalVariable}/v1/api/politics/admin/${selectedPolitic.id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPoliticasAdmin();
      toaster.push(message, { placement: "bottomStart", duration: 5000 });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCurrentPolitic({
      title: selectedPolitic.title,
      description: selectedPolitic.description,
    });
  }, [selectedPolitic]);

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
          Editar Poltica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form className={styles.formNewProduct}>
            <label htmlFor="">
              Nombre de la Política
              <input
                type="text"
                name="name"
                value={currentPolitic.title}
                onChange={(e) =>
                  setCurrentPolitic({
                    ...currentPolitic,
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                value={currentPolitic.description}
                onChange={(e) =>
                  setCurrentPolitic({
                    ...currentPolitic,
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
          <button onClick={() => handleSubmit()}>Editar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditarPolitica;

