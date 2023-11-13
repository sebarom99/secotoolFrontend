import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "../card/cardProduct/CardProduct";
import style from "./ListProducts.module.css";
import Pagination from "../pagination/Pagination";

const ListProducts = ({ products }) => {
  //-------------- CONFIGURACION DE LA PAGINACION -------------------->
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Función para barajar los productos de forma aleatoria
  const shuffleProducts = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Barajar los productos al inicio y cada vez que cambie la página
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    setShuffledProducts(shuffleProducts(products));
  }, [products]);

  const lastPostIndex = currentPage * itemsPerPage;
  const firstPostIndex = lastPostIndex - itemsPerPage;
  const currentPost = shuffledProducts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={`d-flex f-dir-colum ${style.contenedorLista}`}>
      <div className={style.listProducts}>
        {
          currentPost.map((product) => (
            <Grid
              className={style.contenedorCard}
              container
              key={product.id ? product.id : product.productDto.id}
            >
              <Card
                product={product.productDto ? product.productDto : product}
                style={{ width: "100%" }}
              />
            </Grid>
          ))
        }
      </div>
      <Pagination
        totalPosts={shuffledProducts.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        className={style.paginationList}
      />
    </div>
  );
};
export default ListProducts;
