import { useEffect, useState } from "react";
import ListCaracteristicas from "../../list/ListCaracteristicas";
import ListPoliticas from "../../list/listPoliticas/ListPoliticas";
import styles from "./Resume.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";

const Resume = ({ productData }) => {
  const [policies, setPolicies] = useState();
  const { globalVariable } = useGlobal();

  async function getPolitics() {
    await axios
      .get(`${globalVariable}/v1/api/politics/open`)
      .then(function (response) {
        setPolicies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getPolitics();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.sectionResume}>
      <h4>Detalles del producto</h4>
      <div className={styles.boxDescription}>
        <h5 className={styles.h5}>Descripción</h5>
        <p className={styles.p}>{productData.description}</p>
      </div>
      <div>
        <h5 className={styles.h5}>Características</h5>
        {productData.productFeatures ? (
          <ListCaracteristicas
            caracteris={productData.productFeatures}
          ></ListCaracteristicas>
        ) : (
          <p className="font-sm">El producto no posee características.</p>
        )}
      </div>
      <div>
        <h5 className={styles.h5}>Políticas</h5>
        {policies && <ListPoliticas policies={policies} />}
      </div>
    </div>
  );
};
export default Resume;
