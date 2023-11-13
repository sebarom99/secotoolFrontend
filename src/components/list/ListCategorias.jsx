import { Link } from "react-router-dom";
import style from "./ListCategorias.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobal } from "../../contexts/GlobalContext";
import CardCategory from "../card/cardCategory/CardCategory";
const ListCategorias = ({onCategoryClick}) => {
  const [categorias, setCategorias] = useState([]);
  const { globalVariable } = useGlobal();

  const handleCategoryClick = () => {
    onCategoryClick();
  };

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

  return (
    <>
      <ul className={style.listCategorias}>
        {categorias.map((categ) => (
          <li key={categ.id}>
            <Link
              to={`/allProducts/${categ.id}`}
              className={style.containerCardLink}
              onClick={handleCategoryClick}
            >
              <CardCategory
                categoryImg={categ.image.url}
                categoryName={categ.name}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ListCategorias;
