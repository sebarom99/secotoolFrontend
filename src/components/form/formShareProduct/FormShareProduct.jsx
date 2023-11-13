import styles from "./FormShareProduct.module.css";
import CardProductShare from "../../card/cardProductShare/CardProductShare";
import { useState } from "react";

const FormShareProduct = ({ product }) => {
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [textareaContent, setTextareaContent] = useState("");

  console.log(product);

  const toggleSocial = (social) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(selectedSocials.filter((s) => s !== social));
    } else {
      setSelectedSocials([...selectedSocials, social]);
    }
  }

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location}`;
    selectedSocials.forEach((social) => {
      if (social === "whatsapp") {
        const whatsappText = `${textareaContent}\n${url}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
          whatsappText
        )}`;
        window.open(whatsappLink, "_blank");
      } else if (social === "facebook") {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(textareaContent)}`;
        window.open(facebookShareUrl, "FacebookShare", "width=600,height=400");
      } else if (social === "twitter") {
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(textareaContent)}`;
        window.open(twitterShareUrl, "TwitterShare", "width=600,height=400");
      }
    });
    setSelectedSocials([]); // Limpiar las redes sociales seleccionadas
    setTextareaContent(""); // Limpiar el contenido del textarea
  };


  const handleOnClick = (e, social) => {
    e.preventDefault();
    toggleSocial(social);
  };

  return (
    <form className={styles.formShare} onSubmit={handleShare}>
      <div className={styles.boxRedes}>
        <p>Selecciona alguna red social</p>
        <div className={styles.iconsShare}>
          <button
            className={`${styles.icons} ${
              selectedSocials.includes("facebook") ? styles.active : ""
            }`}
            onClick={(e) => handleOnClick(e, "facebook")}
          >
            <i className="fa-brands fa-facebook"></i>
            <span>Facebook</span>
          </button>
          <button
            className={`${styles.icons} ${
              selectedSocials.includes("twitter") ? styles.active : ""
            }`}
            onClick={(e) => handleOnClick(e, "twitter")}
          >
            <i className="fa-brands fa-twitter"></i>
            <span>Twitter</span>
          </button>
          <button
            className={`${styles.icons} ${
              selectedSocials.includes("whatsapp") ? styles.active : ""
            }`}
            onClick={(e) => handleOnClick(e, "whatsapp")}
          >
            <i className="fa-brands fa-whatsapp"></i>
            <span>Whatsapp</span>
          </button>
        </div>
      </div>
      <div className={styles.boxEndForm}>
        <CardProductShare product={product}></CardProductShare>
        <textarea
          name=""
          id=""
          cols="60"
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          style={{ padding: 10 }}
          placeholder="Escribe aquí un mensaje personalizado para acompañar el contenido que deseas compartir"
        ></textarea>
      </div>
      <button type="submit" className={styles.buttonCompartir}>
        Compartir
      </button>
    </form>
  );
};
export default FormShareProduct;
