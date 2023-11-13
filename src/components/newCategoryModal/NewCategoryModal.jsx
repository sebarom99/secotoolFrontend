import { Message, Modal, Uploader, toaster } from "rsuite";
import styles from "./NewCategoryModal.module.css";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";

function NewCategoryModal({
  open,
  handleClose,
  handleNewProductSubmit,
  getData,
}) {
  //--------------------------------CONTEXT------------------------->
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  //-------------------------------------------------------
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas
  const handleImageChangeD = (fileList) => {
    setUploadedImages([...uploadedImages, ...fileList]);
  };

  const handleSubmit = () => {
    addCategoryAdmin();
    handleClose();
  };

  const message = (
    <Message showIcon type="success" closable>
      La categoria se ha creado exitosamente
    </Message>
  );

  const addCategoryAdmin = async () => {


    const nuevaCategoria = {
      name: newCategory.name,
      description: newCategory.description,
    }
    const formData = new FormData();
    console.log(nuevaCategoria)

    const json = JSON.stringify(nuevaCategoria)
    console.log(json)
    const blob = new Blob([json],{
      type: 'application/json'
    })

    formData.append("data", blob)
    uploadedImages.forEach((file) => {
      formData.append("image", file.blobFile);
    });

    console.log(formData);

    axios({
      method: "post",
      url: `${globalVariable}/v1/api/categories/admin`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    })
      .then(function (response) {
        handleClose();
        console.log(response);
        toaster.push(message, { placement: "bottomStart", duration: 5000 });
        getData();
      })
      .catch(function (response) {
        console.log(response);
      });
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
          Nueva categoría
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleNewProductSubmit}
          >
            <label htmlFor="">
              Nombre de la categoría
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
            </label>
            <label htmlFor="">
              Imagenes
              <Uploader
                autoUpload={false}
                draggable
                onChange={handleImageChangeD}
                listType="picture-text"
                className={styles.uploaderC}
              >
                <div
                  style={{
                    height: 54,
                    width: 640,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    borderRadius: 8,
                    border: "1px dashed var(--darkGrey)",
                  }}
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <span>Subir imagen</span>
                </div>
              </Uploader>
            </label>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleSubmit()}>Añadir</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default NewCategoryModal;
