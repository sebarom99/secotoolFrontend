const NewImage = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "var(--darkGrey)",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <i className="fa-regular fa-image"></i>
        <span>{props.imageName}</span>
      </div>
      <i className="fa-regular fa-xmark" onClick={props.deleteImage}></i>
    </div>
  );
};

export default NewImage;
