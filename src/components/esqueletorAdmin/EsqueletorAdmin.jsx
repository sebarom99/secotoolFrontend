import { Loader } from "rsuite";
import styles from "./EsqueletorAdmin.module.css";

const EsqueletorAdmin = () => {
  const renderDiezElementos = () => {
    const elementos = [];

    for (let i = 0; i < 10; i++) {
      elementos.push(<div key={i} className={styles.elemento} />);
    }
    return elementos;
  };

  return (
    <>
      {renderDiezElementos()}
      <Loader size="md" content="Cargando" className={styles.loader} />
    </>
  );
};

export default EsqueletorAdmin;
