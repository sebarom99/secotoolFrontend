import { useEffect, useState } from "react";
import style from "./FormFilterDesktop.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { Placeholder } from "rsuite";

const FormFilterDesktop = ({ updatefilterProducts, productsLoading }) => {
  const [categoryData, setCategoryData] = useState([]);
  const { globalVariable } = useGlobal();
  const [isLoading, setIsLoading] = useState(true); // Estado para el loader

  const { idCateg } = useParams();
  const idParams = parseInt(idCateg);

  // Estado para mantener el registro de checkboxes seleccionados
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    idParams ? [idParams] : []
  );

  useEffect(() => {
    // Realizar la solicitud Fetch al endpoint usando Axios
    axios
      .get(`${globalVariable}/v1/api/categories/open`)
      .then((response) => {
        setCategoryData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Este efecto se ejecutará cuando idCateg cambie
    const idCategValue = parseInt(idCateg);
    if (!isNaN(idCategValue)) {
      // Verifica que idCateg sea un número válido
      setSelectedCategories([idCategValue]);
    }
  }, [idCateg]);

  useEffect(() => {
    // Llama a la función de actualización cuando cambie la selección de categorías
    updatefilterProducts(selectedCategories);
  }, [selectedCategories, updatefilterProducts]);

  console.log(selectedCategories);

  // Función para manejar el cambio en la selección de checkboxes
  const handleCheckboxChange = (event) => {
    const categoryID = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryID]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== categoryID)
      );
    }
    updatefilterProducts(selectedCategories);
  };

  const placeholders = Array.from({ length: 7 }, (_, index) => (
    <div key={index} className={style.boxInputCheck}>
      <Placeholder.Graph width={"100%"} height={20} active />
    </div>
  ));

  return (
    <form className={style.form}>
      {isLoading || productsLoading
        ? // Muestra los placeholders mientras se están cargando las categorías o los productos
          placeholders
        : categoryData.map((categ) => (
            <div key={categ.id} className={style.boxInputCheck}>
              <input
                id={categ.id}
                type="checkbox"
                value={categ.id}
                onChange={handleCheckboxChange}
                checked={selectedCategories.includes(categ.id)}
              />
              <label>{categ.name}</label>
            </div>
          ))}
    </form>
  );
};
export default FormFilterDesktop;
