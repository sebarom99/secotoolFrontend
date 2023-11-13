import style from "./CardCategory.module.css";

const CardCategory = ({ categoryName, categoryImg }) => {
  const containerCardStyles = {
    position: "relative",
    backgroundImage: `url(${categoryImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "10px",
    color: "white",
  };

  const overlayStyles = {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.75)",
    zIndex: 1,
    borderRadius: 8,
  };

  return (
    <div style={containerCardStyles} className={style.containerCard}>
      <div style={overlayStyles}></div>
      <span className={style.name}>{categoryName}</span>
    </div>
  );
};

export default CardCategory;
