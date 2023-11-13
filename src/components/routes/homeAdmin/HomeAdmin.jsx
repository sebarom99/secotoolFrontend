import styles from "./HomeAdmin.module.css";
import AdminProductCard from "../../adminProductCard/AdminProductCard";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import { ButtonToolbar, Button, Loader, Modal } from "rsuite";
import { Alert, Snackbar } from "@mui/material";
import FormNewProduct from "../../form/formNewProduct/FormNewProduct";
import FormEditProduct from "../../form/FormEditProduct";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import EsqueletorAdmin from "../../EsqueletorAdmin/EsqueletorAdmin";

const HomeAdmin = () => {
  //----------------------------TRAE TODOS LOS PRODUCTOS----------------------------->
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const fetchProductsAdmin = async () => {
    try {
      const response = await fetch(`${globalVariable}/v1/api/products/open`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setCargando(false);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductsAdmin();
  }, []);

  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false); //NEW PRODUCT MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEp, setOpenEp] = useState(false); // EDIT PRODUCT MODAL
  const [selectedProduct, setSelectedProduct] = useState([]);
  const handleCloseEp = () => setOpenEp(false);

  //---------------------------EDIT PRODUCT------------------------------------>
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `${globalVariable}/v1/api/products/open/${productId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const productDetails = await response.json();
        return productDetails;
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditProduct = async (productId) => {
    const productDetails = await fetchProductDetails(productId);

    setSelectedProduct(productDetails);
    setOpenEp(true); // Abre el modal de edición con los detalles del producto
  };
  const handleProductUpdate = (updatedProduct) => {
    // Buscar el índice del producto en la lista
    const productIndex = products.findIndex((p) => p.id === updatedProduct.id);

    if (productIndex !== -1) {
      // Crear una nueva lista de productos con el producto actualizado
      const updatedProducts = [...products];
      updatedProducts[productIndex] = updatedProduct;
      // Actualizar el estado de la lista de productos
      setProducts(updatedProducts);
    }
  };
  //---------------------------------DELETE PRODUCT------------------------------->

  const [alertOpen, setAlertOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); //BORRAR PRODUCTO
  const [productoAEliminar, setProductoAEliminar] = useState({});

  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };

  const modalDelete = (product) => {
    setIsDeleteModalVisible(true);
    setProductoAEliminar(product);
  };

  async function deleteProduct() {
    setIsDeleteModalVisible(false);
    try {
      const response = await fetch(
        `${globalVariable}/v1/api/products/admin/${productoAEliminar.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        console.log(
          `Producto con ID ${productoAEliminar.id} eliminado correctamente`
        );
        setProducts(
          products.filter((product) => product.id !== productoAEliminar.id)
        );
        showDeleteSuccessAlert(); // Muestra la alerta de éxito
        setAlertOpen(true);
      } else {
        throw new Error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [currentPost, setCurrentPost] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  //---------------------------------FETCH TODOS LOS PRODUCTOS------------------>

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(products.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, products]);

  //---------------------------------- LOUDER ---------------------------------

  const [cargando, setCargando] = useState(true);

  const renderProductosAdmin =
    products.length > 0 ? (
      currentPost.map((product) => (
        <AdminProductCard
          key={product.id}
          deleteItem={() => modalDelete(product)}
          id={product.id}
          title={product.name}
          editItem={() => handleEditProduct(product.id)}
        />
      ))
    ) : (
      <span className={styles.noProducstMessage}>
        No se encontraron resultados
      </span>
    );

  //---------------------------------- COMPONENTE ---------------------------------

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos los productos</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Agregar Producto
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>ID</span>
                <span>Nombre</span>
                <span>Acciones</span>
              </div>
              {cargando ? <EsqueletorAdmin /> : renderProductosAdmin}
              <Pagination
                totalPosts={products.length}
                itemsPerPage={10}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Por favor ingrese desde un dispositivo más grande
        </span>
      )}
      {/* -----------------------DELETE ALERT---------------------> */}

      <Modal
        open={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea borrar el producto: {productoAEliminar.name}?
        </Modal.Body>
        <Modal.Footer className={styles.modalButtons}>
          <button
            onClick={() => setIsDeleteModalVisible(false)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancelar
          </button>
          <button
            onClick={deleteProduct}
            style={{ backgroundColor: "green", margin: 10, color: "white" }}
          >
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000} // Duración en milisegundos
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Producto eliminado correctamente.
        </Alert>
      </Snackbar>
      {/* --------------------------NUEVO PRODUCTO MODAL--------------------------------> */}
      <FormNewProduct
        open={open}
        handleClose={handleClose}
        onProductCreated={fetchProductsAdmin}
      />
      {/* ------------------------------------------EDITAR PRODUCTO MODAL--------------------------> */}
      <FormEditProduct
        openEp={openEp}
        handleCloseEp={handleCloseEp}
        selectedProduct={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
    </div>
  );
};
export default HomeAdmin;
