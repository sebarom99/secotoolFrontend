import { useState } from "react";
import styles from "./Carousel.module.css";

function Carousel({ images }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const indicadorimages = `${imagenActual + 1}/${images.length}`;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (!Array.isArray(images) || images.length === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual === images.length - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? images.length - 1 : imagenActual - 1);
  };

  return (
    <>
      <div className={styles.containerCarouselMobile}>
        <div className={styles.indicadorImg}>{indicadorimages}</div>
        {images.map((image, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              key={image.id}
              className={
                imagenActual === index
                  ? `${styles.slide} ${styles.active}`
                  : styles.slide
              }
            >
              {imagenActual === index && (
                <img
                  key={index}
                  className={styles.imgProduct}
                  src={image.url}
                  alt=""
                />
              )}
            </div>
          );
        })}
        <div className={styles.boxControlsCarousel}>
          <button onClick={anteriorImagen}>
            <i className="fa-regular fa-chevron-left"></i>
          </button>
          <button onClick={siguienteImagen}>
            <i className="fa-regular fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className={styles.containerCarousel}>
        <div className={styles.carouselGrid}>
          <div className={styles.leftColumn}>
            <img className={styles.imgProduct} src={images[0].url} alt="" />
          </div>
          <div className={styles.rightColumn}>
            {images.slice(1, 5).map((image, index) => (
              <div key={index}>
                <img
                  className={styles.rightImgProduct}
                  src={image.url}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        {showMore && (
          <div className={styles.moreImagesContainer}>
            {images.slice(5).map((image, index) => (
              <div key={index}>
                <img className={styles.moreImgProduct} src={image.url} alt="" />
              </div>
            ))}
          </div>
        )}
        {showMore ? (
          <button
            className={styles.btnChevron + " button-transparent"}
            onClick={toggleShowMore}
          >
            Ver menos<i className="fa-regular fa-chevron-up"></i>
          </button>
        ) : (
          <button
            className={styles.btnChevron + " button-transparent"}
            onClick={toggleShowMore}
          >
            Ver más<i className="fa-regular fa-chevron-down"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Carousel;
