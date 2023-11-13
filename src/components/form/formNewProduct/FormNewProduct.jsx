import { Modal, TagPicker, Uploader, Button, Message, toaster } from "rsuite";
import styles from "./FormNewProduct.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";

function FormNewProduct({ open, handleClose, onProductCreated }) {
  //-----------------------------DATOS(CATEGORIAS Y FEATURES)----------------------------------->
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const handleCloseModal = () => {
    // Restablecer todos los estados del formulario a sus valores iniciales
    setName("");
    setDescription("");
    setPrice("");
    setUploadedImages([]);
    setIdsCategories([]);
    setIdsFeatures([]);

    // Eliminar mensajes de error
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setCategoriesError("");
    // Agrega más líneas si tienes otros mensajes de error

    // Cerrar el modal
    handleClose();
  };

  const message = (
    <Message showIcon type="success" closable>
      El producto se ha creado exitosamente
    </Message>
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${globalVariable}/v1/api/categories/open`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.ok) {
          const dataC = await response.json();

          // Transforma los datos a la estructura de TagPicker
          const transformedData = dataC.map((category) => ({
            label: category.name,
            value: category.id,
          }));

          setCategories(transformedData);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const response = await fetch(`${globalVariable}/v1/api/features/open`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((category) => ({
            label: category.name,
            value: category.id,
          }));
          setFeatures(transformedData);
        } else {
          console.error("Error fetching features:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    }

    fetchFeatures();
  }, []);

  //--------------------------------NEW PRODUCT---------------------->
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]); // Estado para las imágenes cargadas

  const [idsCategories, setIdsCategories] = useState(); //Agarra las categorias
  const [idsFeatures, setIdsFeatures] = useState([]);

  const [remainingCharacters, setRemainingCharacters] = useState(0); //contador de caracteres

  //================================ERROR'S===============================>

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [featuresError, setFeaturesError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imagesError, setImagesError] = useState("");

  //================================== HANDLE'S=========================>

  const handleDescriptionChange = (e) => {
    const newText = e.target.value;
    setDescription(newText);

    // Calcula los caracteres escritos
    const charactersWritten = newText.length;

    // Actualiza el estado de caracteres restantes
    setRemainingCharacters(charactersWritten);

    // Validación de la descripción (sin caracteres especiales)
    const specialCharactersRegex = /[<>{}[\]/\\@#^&*|~]/;
    if (specialCharactersRegex.test(newText)) {
      setDescriptionError(
        "La descripción no puede contener caracteres especiales"
      );
    } else {
      setDescriptionError(""); // Limpiar el mensaje de error si no hay errores
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;

    // Validación del nombre (sin caracteres especiales) en tiempo real
    const specialCharactersRegex = /[.,?<>{}[\]/\\'"!@#$%^&*()_+=|:;~]/;
    if (specialCharactersRegex.test(newName)) {
      setNameError("El nombre no puede contener caracteres especiales");
    } else {
      setNameError(""); // Limpiar el mensaje de error si no hay errores
    }

    setName(newName);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    // Validación de que el precio solo contenga números en tiempo real
    if (!/^\d+$/.test(newPrice)) {
      setPriceError("El precio solo puede contener números");
    } else {
      setPriceError(""); // Limpiar el mensaje de error si no hay errores
    }

    setPrice(newPrice);
  };

  const handleOptionChange = (newSelectedOptions) => {
    console.log(newSelectedOptions);
    setIdsCategories(newSelectedOptions);
    console.log(idsCategories);
  };

  const handleOptionChangeF = (newSelectedOptionsF) => {
    console.log(newSelectedOptionsF);
    setIdsFeatures(newSelectedOptionsF);
    console.log(idsFeatures);
  };

  const handleImageChangeD = (fileList) => {
    setUploadedImages(fileList);
    console.log(fileList);
  };

  //================================================ POST NEW PRODUCT ===========================>
  const handleNewProductSubmit = async (e) => {
    e.preventDefault();

    //======================== VALIDACIONES ====================>
    if (name.length < 8) {
      setNameError("El nombre debe contener más de 8 caracteres");
      return;
    } else {
      setNameError("");
    }

    if (description.length < 20) {
      setDescriptionError("La descripción debe contender más de 20 caracteres");
      return;
    } else {
      setDescriptionError("");
    }

    if (idsCategories.length === 0) {
      setCategoriesError("Debes seleccionar al menos una categoría");
      return; // No continua con el envío del formulario
    } else {
      setCategoriesError(""); // Limpiar el mensaje de error si no hay errores
    }

    if (idsFeatures.length === 0) {
      setFeaturesError("Debes seleccionar al menos una caracteristica");
      return; // No continua con el envío del formulario
    } else {
      setFeaturesError(""); // Limpiar el mensaje de error si no hay errores
    }

    if (uploadedImages.length === 0) {
      setImagesError("Debes cargar al menos una imagen");
      return; // No continua con el envío del formulario
    } else {
      setImagesError(""); // Limpiar el mensaje de error si no hay errores
    }

    //=========================== POST ==================>

    setIsLoading(true);
    const formData = new FormData(); //Creando el form DATA

    const productData = {
      name: name,
      description: description,
      price: price,
    };

    const categories = {
      idsList: idsCategories,
    };

    const features = {
      idsList: idsFeatures,
    };
    formData.append(
      "product-data",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    formData.append(
      "id-categories",
      new Blob([JSON.stringify(categories)], { type: "application/json" })
    );
    formData.append(
      "id-features",
      new Blob([JSON.stringify(features)], { type: "application/json" })
    );
    //-----------------------APPENDS------------------>
    uploadedImages.forEach((file) => {
      formData.append("images", file.blobFile);
    });

    console.log(formData);

    axios({
      method: "post",
      url: `${globalVariable}/v1/api/products/admin`,
      data: formData,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        handleClose();
        onProductCreated();
        setIsLoading(false);

        setName("");
        setDescription("");
        setPrice("");
        setUploadedImages([]);
        setIdsCategories([]);
        setIdsFeatures([]);
        setRemainingCharacters(0);
        toaster.push(message, { placement: "bottomStart", duration: 5000 });
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        setIsLoading(false);
        console.log(response);
      });
  };

  /*Aqui va el formulario para agregar un nuevo producto como admin*/
  return (
    <Modal size="md" open={open} onClose={handleCloseModal} overflow={false}>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center", fontSize: 23 }}>
          Nuevo Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModal}>
        <div className={styles.centeredForm}>
          <form
            className={styles.formNewProduct}
            onSubmit={handleNewProductSubmit}
          >
            <label htmlFor="">
              Nombre del producto
              <input
                type="text"
                name="name"
                placeholder="Ingrese nombre del producto"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <div className={styles.errorMessage}>{nameError}</div>
              )}
            </label>
            <label htmlFor="">
              Descripción
              <textarea
                cols="30"
                rows="10"
                name="description"
                placeholder="Ingrese una descripción de hasta 255 caracteres"
                maxLength={255}
                value={description}
                onChange={handleDescriptionChange}
                style={{ height: 120, width: 640, padding: 8 }}
              ></textarea>
              <div
                id="char-count"
                style={{
                  display: "flex",
                  alignSelf: "flex-end",
                  paddingRight: 10,
                  height: 5,
                }}
              >
                {remainingCharacters}/{255}
              </div>
              {descriptionError && (
                <div className={styles.errorMessage}>{descriptionError}</div>
              )}
            </label>
            <label htmlFor="">
              Categorías
              <TagPicker
                data={categories}
                style={{ width: 640 }}
                value={idsCategories}
                onChange={handleOptionChange}
                placeholder="Seleccionar categorías"
                className={styles.customInput}
              />
              {categoriesError && (
                <div className={styles.errorMessage}>{categoriesError}</div>
              )}
            </label>
            <label htmlFor="">
              Características
              <TagPicker
                style={{ width: 640 }}
                data={features}
                placeholder="Seleccionar características"
                onChange={handleOptionChangeF}
                className={styles.customInput}
              />
              {featuresError && (
                <div className={styles.errorMessage}>{featuresError}</div>
              )}
            </label>
            <label htmlFor="">
              Precio
              <input
                type="text"
                name="price"
                placeholder="Precio"
                value={price}
                onChange={handlePriceChange}
              />
              {priceError && (
                <div className={styles.errorMessage}>{priceError}</div>
              )}
            </label>
            <label htmlFor="">
              Imágenes
              <Uploader
                autoUpload={false}
                draggable
                multiple={true}
                onChange={handleImageChangeD}
                className={styles.uploaderN}
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
              {imagesError && (
                <div className={styles.errorMessage}>{imagesError}</div>
              )}
            </label>
            <div className={styles.labelSeparator}></div>
            <Button
              type="submit"
              appearance="default"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Agregar Producto"}
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FormNewProduct;
