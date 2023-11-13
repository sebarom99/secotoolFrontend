import styles from "./home.module.css";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
import ListProducts from "../../list/ListProducts";
import { useEffect, useState } from "react";
import { useGlobal } from "../../../contexts/GlobalContext";
import SkeletonCard from "../../skeletonCard/SkeletonCard";

const LoadingIndicator = () => <SkeletonCard />;
const NetworkError = () => <p>Network Error</p>;

const Home = () => {
  const { globalVariable } = useGlobal();
  const URL_API = `${globalVariable}/v1/api/products/open`;
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const storedToken = localStorage.getItem("tokenUserLog");
        const fetchOptions = {
          headers: {
            Authorization: storedToken ? `Bearer ${storedToken}` : "", // Solo se incluye si hay un token
            "Cache-Control": "no-cache"
          },
        };

        const response = await fetch(URL_API, fetchOptions);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("hola");
      } finally {
        // Independientemente de si hay un error o no, la carga se detiene
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const ComponentListProducts = products ? (
    <ListProducts products={products} />
  ) : null;

  return (
    <>
    <section className={styles.sectionBusqueda}>
      <div className={styles.containerBusqueda}>
        <div className={styles.bgBusqueda}></div>
        <div className={styles.busquedaItems}>
          <h3 className={styles.titulo}>¿Qué herramienta necesitas?</h3>
          <span className={styles.subtitulo}>
            Buscá las mejores herramientas para alquilar en las fechas que
            desees
          </span>
          <FormBusqueda products={products} setProducts={setProducts} />
        </div>
      </div>
      <div className={styles.contenedorCards}>
        {loading ? <LoadingIndicator /> : ComponentListProducts}
        {products === undefined && !loading && <NetworkError />}
      </div>
    </section>
    {/* <section>
      <CategoriasHome></CategoriasHome>
    </section> */}
    </>
  );
};

export default Home;
