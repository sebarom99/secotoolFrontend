import { Message, Modal, toaster } from "rsuite";
import styles from "./EditFeatureModal.module.css";
import Select, { components } from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";

const icons = [
  { value: "fa-solid fa-wifi" },
  { value: "fa-solid fa-bullseye-arrow" },
  { value: "fa-solid fa-battery-bolt" },
  { value: "fa-solid fa-user-helmet-safety" },
  { value: "fa-solid fa-water-arrow-down" },
  { value: "fa-solid fa-circle-bolt" },
  { value: "fa-solid fa-shield-halved" },
  { value: "fa-solid fa-toolbox" },
  { value: "fa-solid fa-gear" },
  { value: "fa-solid fa-magnet" },
  { value: "fa-solid fa-screwdriver" },
  { value: "fa-solid fa-block-brick-fire" },
  { value: "fa-solid fa-helmet-safety" },
  { value: "fa-solid fa-stopwatch" },
  { value: "fa-solid fa-light-switch" },
];

const Option = (props) => (
  <components.Option {...props} className={styles.iconOption}>
    <i className={props.data.value} />
  </components.Option>
);

const EditFeatureModal = ({ handleClose, open, getData, selectedFeature }) => {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();
  const [selectedIcon, setSelectedIcon] = useState({});
  const [newFeature, setNewFeature] = useState({});

  const SingleValue = ({ ...props }) => (
    <components.SingleValue {...props}>
      <i
        className={selectedIcon.value}
        alt="s-logo"
        style={{ width: "100%" }}
      />
    </components.SingleValue>
  );

  const message = (
    <Message showIcon type="success" closable>
      La característica se ha modificado exitosamente
    </Message>
  );

  const handleChange = (value) => {
    setSelectedIcon(value);
    setNewFeature({ ...newFeature, icon: value.value });
  };

  const handleSubmit = () => {
    editFeaturesAdmin();
    handleClose();
  };

  const editFeaturesAdmin = async () => {
    axios({
      method: "PUT",
      url: `${globalVariable}/v1/api/features/admin/${selectedFeature.id}`,
      data: {
        name: newFeature.name,
        icon: newFeature.icon,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        console.log(response);
        toaster.push(message, { placement: "bottomStart", duration: 5000 });
        getData();
      })
      .catch(function (error) {
        console.log(error);
        console.log("soy token", token);
      });
  };

  useEffect(() => {
    console.log(selectedFeature);
    setNewFeature(selectedFeature);
    setSelectedIcon({ value: selectedFeature.icon });
  }, [selectedFeature]);

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
          Editar característica
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <form className={styles.formNewCharacteristic} action="">
          <label htmlFor="">
            Nombre de la características
            <input
              type="text"
              value={newFeature.name}
              onChange={(e) =>
                setNewFeature({ ...newFeature, name: e.target.value })
              }
            />
          </label>

          <label htmlFor="" style={{ width: "30%" }}>
            Icono asociado
            <div style={{ width: "100%", textAlign: "center" }}>
              <Select
                value={selectedIcon}
                options={icons}
                onChange={handleChange}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    borderRadius: "7px",
                    borderColor: "var(--darkGrey)",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    height: "5vh",
                    padding: "0",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    padding: "0",
                    margin: "0",
                  }),
                }}
                components={{
                  Option,
                  SingleValue,
                }}
              />
            </div>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleSubmit()}>Editar</button>
          <button onClick={handleClose}>Cancelar</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFeatureModal;
