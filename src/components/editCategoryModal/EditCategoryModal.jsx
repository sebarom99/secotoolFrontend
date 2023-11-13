import { Message, Modal, toaster, Uploader } from "rsuite";
import styles from "./EditCategoryModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";


function EditCategoryModal({ handleClose, open, getData, selectedCategory }) {
  console.log(selectedCategory)
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    description: "",
  });

  const [currentImage, setCurrentImage] = useState([]);

  const handleFileChange = (newFileList) => {
    setCurrentImage(newFileList);
  };

  const handleSubmit = () => {
    editCategoryAdmin();
    handleClose();
  };

  const message = (
    <Message showIcon type="success" closable>
      La categoria se ha creado exitosamente
    </Message>
  );

  const editCategoryAdmin = async () => {
    const formData = new FormData
    
    const categoryData = {
      name: currentCategory.name,
      description: currentCategory.description,
    }

    formData.append(
      "category-data",
      new Blob([JSON.stringify(categoryData)], { type: "application/json" })
    );

    currentImage.forEach((file) => {
      formData.append("image", file.blobFile);
    });

    console.log(formData);
    axios({
      method: "put",
      url: `${globalVariable}/v1/api/categories/admin/${selectedCategory.id}`,
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
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

  
  useEffect(() => {
    setCurrentCategory({
      name: selectedCategory.name,
      description: selectedCategory.description,
    });
    if (selectedCategory.image) {
    // Crear un objeto con las propiedades requeridas
    const imageObject = {
      name: selectedCategory.image.id,
      fileKey: selectedCategory.image.id, // Ajusta esto según la estructura de tu objeto de imagen
      url: selectedCategory.image.url, // Ajusta esto según la estructura de tu objeto de imagen
    };

    // Actualiza currentImage con el objeto de imagen
    setCurrentImage([imageObject]);
  } else {
    setCurrentImage([]); // Si no hay imagen, asegúrate de asignar un arreglo vacío
  }
  }, [selectedCategory]);

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
          Editar categoría
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form className={styles.formNewProduct}>
            <label htmlFor="">
              Nombre del producto
              <input
                type="text"
                name="name"
                value={currentCategory.name}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    name: e.target.value,
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
                value={currentCategory.description}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
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
                multiple={true}
                className={styles.uploaderEc}
                listType="picture-text"
                fileList={currentImage}
                onChange={handleFileChange}
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
                    border: "1px dashed #666",
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
          <button onClick={() => handleSubmit()}>Editar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCategoryModal;
