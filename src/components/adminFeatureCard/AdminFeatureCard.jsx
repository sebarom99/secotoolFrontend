import { Tooltip, Whisper } from "rsuite";
import styles from "./AdminFeatureCard.module.css";

const AdminFeatureCard = (props) => {
  const editarTooltip = <Tooltip>Editar </Tooltip>;

  const BorrarTooltip = <Tooltip>Eliminar </Tooltip>;

  return (
    <div className={styles.container}>
      <span>{props.name}</span>
      <i className={props.icon} style={{ color: "var(--Dark)" }}></i>
      <div className={styles.iconAd}>
        <Whisper
          placement="bottom"
          controlId="control-id-hover"
          trigger="hover"
          speaker={editarTooltip}
        >
          <i
            className="fa-regular fa-pencil-square fa-lg"
            onClick={props.editItem}
            style={{ color: "#D0731D" }}
          ></i>
        </Whisper>
        <Whisper
          placement="bottom"
          controlId="control-id-hover"
          trigger="hover"
          speaker={BorrarTooltip}
        >
          <i
            className="fa-regular fa-trash-can fa-lg"
            onClick={props.deleteItem}
          ></i>
        </Whisper>
      </div>
    </div>
  );
};

export default AdminFeatureCard;
