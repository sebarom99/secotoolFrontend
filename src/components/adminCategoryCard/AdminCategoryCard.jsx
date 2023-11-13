import { Tooltip, Whisper } from "rsuite";
import styles from "./AdminCategoryCard.module.css";

const AdminCategoryCard = (props) => {
  const editarTooltip = (
    <Tooltip>
      Editar
    </Tooltip>
  );

  const BorrarTooltip = (
    <Tooltip>
      Eliminar
    </Tooltip>
  );
  return (
    <div className={styles.container}>
      <span>{props.name}</span>
      <span>{props.description}</span>
      <a href={props.image} target="blank">
        <i
          className="fa-regular fa-image"
          style={{ color: "var(--darkGrey)" }}
        ></i>
      </a>
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

export default AdminCategoryCard;
