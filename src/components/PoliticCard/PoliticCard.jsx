import { Tooltip, Whisper } from "rsuite";
import styles from "../PoliticCard/PoliticCard.module.css";

const PoliticCard = ({ name, description, deleteItem, editItem }) => {
  const editarTooltip = <Tooltip>Editar</Tooltip>;

  const BorrarTooltip = <Tooltip>Borrar</Tooltip>;

  return (
    <div className={styles.container}>
      <span>{name}</span>
      <span>{description}</span>
      <div className={styles.iconAd}>
        <Whisper
          placement="bottom"
          controlId="control-id-hover"
          trigger="hover"
          speaker={editarTooltip}
        >
          <i
            className="fa-regular fa-pencil-square fa-lg"
            onClick={editItem}
            style={{ color: "#D0731D" }}
          ></i>
        </Whisper>
        <Whisper
          placement="bottom"
          controlId="control-id-hover"
          trigger="hover"
          speaker={BorrarTooltip}
        >
          <i className="fa-regular fa-trash-can fa-lg" onClick={deleteItem}></i>
        </Whisper>
      </div>
    </div>
  );
};

export default PoliticCard;
