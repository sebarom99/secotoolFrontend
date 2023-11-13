import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import SkeletonCard from "../../skeletonCard/SkeletonCard";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [filteredProductsF, setFilteredProductsF] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para el loader
  const { globalVariable } = useGlobal();
  const { idCateg } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("tokenUserLog");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Realiza la solicitud para obtener todos los productos sin filtros con el encabezado de autorización si existe el token
        const response = await axios.get(
          `${globalVariable}/v1/api/products/open`,
          { headers }
        );

        setProductsF(response.data);
        setIsLoading(false); // Cambia isLoadingProducts a false cuando los productos se cargan correctamente
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Cambia isLoadingProducts a false en caso de error
      }
    };

    fetchData();
  }, []);

  const isScreenSmall = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    // Filtra los productos basados en los filtros seleccionados
    if (filterProducts.length > 0) {
      let filteredProducts = productsF.filter((product) => {
        // Verifica si al menos un valor de productCategories.id está en filterProducts
        return product.productCategories.some((category) =>
          filterProducts.includes(category.id)
        );
      });
      setFilteredProductsF(filteredProducts);
    } else {
      // Si no hay filtros seleccionados, muestra todos los productos
      setFilteredProductsF(productsF);
    }
  }, [filterProducts, productsF]);

  const updatefilterProducts = (filterProducts) => {
    setfilterProducts(filterProducts);
  };

  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <div>
          <span>{filteredProductsF.length}</span>
          <span> de </span>
          <span>{productsF.length}</span>
          <span> resultados</span>
        </div>
        {!isScreenSmall ? (
          <>
            <h4>Categorías</h4>
            <hr />
            <FormFilterDesktop
              updatefilterProducts={updatefilterProducts}
              selectedCategoryId={idCateg}
              productsLoading={isLoading}
            />
          </>
        ) : (
          <ModalFilters updatefilterProducts={updatefilterProducts} productos={productsF} />
        )}
      </div>
      <div className={style.contenedorCards}>
        <h4 className={style.titleContenedorCards}>Todas las herramientas</h4>
        {isLoading ? (
          <SkeletonCard /> // Muestra el SkeletonCard mientras se están cargando los productos
        ) : (
          <ListProducts products={filteredProductsF} />
        )}
      </div>
    </section>
  );
};

export default Filters;

