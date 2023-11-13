import styles from "./PoliticsProduct.module.css";
import { useEffect, useState } from "react";
import { ButtonToolbar, Button, Modal, Message, toaster } from "rsuite";
import PoliticCard from "../../PoliticCard/PoliticCard";
import Pagination from "../../pagination/Pagination";
import ModalPolitica from "./ModalPolitica";
import ModalEditarPolitica from "./ModalEditarPolitica";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";
import EsqueletorAdmin from "../../EsqueletorAdmin/EsqueletorAdmin";

const PoliticsProduct = () => {
  //------------------------------ CONFIG MODALS--------------->
  const [open, setOpen] = useState(false);
  const [openEp, setOpenEp] = useState(false);
  const [politicas, setPoliticas] = useState([]);
  const [selectedPolitic, setSelectedPoitic] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [politicaAEliminar, setPoliticaAEliminar] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const { globalVariable } = useGlobal();

  const message = (
    <Message showIcon type="success" closable>
      Se ha borrado la politica exitosamente
    </Message>
  );

  const { token } = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEp = () => setOpenEp(true);
  const handleCloseEp = () => setOpenEp(false);

  //------------------------DELETE POLITIC----------------------------->

  const showDeleteSuccessAlert = () => {
    setAlertOpen(true);
  };

  const deletePolitic = (politica) => {
    console.log("mostrando la politica: ", politica);
    setPoliticaAEliminar(politica);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteModalVisible(false);

    try {
      const tokenUsuario = token;

      const response = await axios.delete(
        `${globalVariable}/v1/api/politics/admin/${politicaAEliminar.id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenUsuario}`,
          },
        }
      );

      if (response.status === 200) {
        toaster.push(message, { placement: "bottomStart", duration: 5000 });
        fetchPoliticasAdmin();
        showDeleteSuccessAlert();
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //-------------- CONFIGURACION DE LA PAGINACION -------------------->

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPost, setCurrentPost] = useState([]);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  //------------------ FUNCION PARA EDITAR POLITICAS ----------------------

  function handleEdit(poli) {
    handleOpenEp();
    setSelectedPoitic(poli);
  }

  //-------------------FETCH DE LAS POLITICAS-------------------------

  const fetchPoliticasAdmin = async () => {
    try {
      const response = await fetch(
        `${globalVariable}/v1/api/politics/open`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("las politicas son ", data);
        setPoliticas(data);
        setCargando(false)
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //---------------------------- TODOS LOS USE-EFFECT -------------------------------

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    fetchPoliticasAdmin();
  }, []);

  useEffect(() => {
    const lastPostIndex = currentPage * 10;
    const fistPostIndex = lastPostIndex - 10;
    setCurrentPost(politicas.slice(fistPostIndex, lastPostIndex));
  }, [currentPage, politicas]);


  //-------------------------------------LOUDER-----------------------------------

  const [cargando, setCargando] = useState(true)

  const renderPoliticas =  politicas.length > 0 ? (
    currentPost.map((poli) => (
      <PoliticCard
        key={poli.id}
        deleteItem={() => deletePolitic(poli)}
        name={poli.title}
        description={poli.description}
        editItem={() => handleEdit(poli)}
      />
    ))
  ) : (
    <span className={styles.noProducstMessage}>
      No se encontraron resultados
    </span>
  )
  //---------------------------- COMPONENETE -------------------------------------

  return (
    <div>
      {matches ? (
        <div>
          <div className={styles.container}>
            <div className={styles.upTable}>
              <h1>Todos las Políticas</h1>
              <ButtonToolbar className={styles.buttonToolbarRight}>
                <Button
                  onClick={handleOpen}
                  style={{ background: "#45A42D", color: "#F9F9F9" }}
                >
                  + Agregar Politica
                </Button>
              </ButtonToolbar>
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>Nombre</span>
                <span>Descripción</span>
                <span>Acciones</span>
              </div>
              {cargando ? <EsqueletorAdmin/> : renderPoliticas}
              <Pagination
                totalPosts={politicas.length}
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
      {/* ---------------------------------------------DELETE ALERT-------------------------- */}
      <Modal
        open={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea borrar la Politica {politicaAEliminar.title}?
        </Modal.Body>
        <Modal.Footer className={styles.modalButtons}>
          <button
            onClick={() => setIsDeleteModalVisible(false)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmDelete}
            style={{ backgroundColor: "green", margin: 10, color: "white" }}
          >
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>

      {/* ------------------------------------------EDITAR POLITICA MODAL--------------------------> */}
      <ModalEditarPolitica
        handleClose={handleCloseEp}
        open={openEp}
        fetchPoliticasAdmin={fetchPoliticasAdmin}
        selectedPolitic={selectedPolitic}
      />

      {/* --------------------------NUEVA POLITICA MODAL--------------------------------> */}

      <ModalPolitica
        handleClose={handleClose}
        open={open}
        fetchPoliticasAdmin={fetchPoliticasAdmin}
      />
    </div>
  );
};
export default PoliticsProduct;
