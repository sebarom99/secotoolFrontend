import { useEffect, useState } from "react";
import style from "./FormFilterCategory.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";

const FormFilterCategory = ({ close, updateFilteredProducts, products }) => {
  const [categorias, setCategorias] = useState([]);
  const { globalVariable } = useGlobal();
  console.log(products);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          `${globalVariable}/v1/api/categories/open`
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Estado para mantener el registro de checkboxes seleccionados
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Función para manejar el cambio en la selección de checkboxes
  const handleCheckboxChange = (event) => {
    const categoryName = parseInt(event.target.value);
    console.log(categoryName);
    if (event.target.checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryName]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== categoryName)
      );
    }
  };

  // Función para filtrar los productos según las categorías seleccionadas
  const filterProductsByCategories = () => {
    console.log("Categorias seleccionadas:", selectedCategories);
    if (selectedCategories.length > 0) {
      // Enviar las categorías seleccionadas a la función de actualización
      updateFilteredProducts(selectedCategories);
    }
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    updateFilteredProducts([]);
  };

  return (
    <form className={style.form}>
      <h4>Categorías</h4>
      {categorias.map((categ) => (
        <div key={categ.id} className={style.boxInputCheck}>
          <input
            id={categ.id}
            type="checkbox"
            value={categ.id}
            onChange={handleCheckboxChange}
          />
          <label>{categ.name}</label>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          filterProductsByCategories(); // Aplicar filtros utilizando la función
          close(); // Cerrar el formulario si es necesario
        }}
        className={style.btnFilter}
      >
        Aplicar filtros
      </button>
      <button
        type="button"
        onClick={() => {
          handleClearFilters(); // Aplicar filtros utilizando la función
          close(); // Cerrar el formulario si es necesario
        }}
        className={style.btnClear}
      >
        Limpiar filtros
      </button>
    </form>
  );
};
export default FormFilterCategory;
