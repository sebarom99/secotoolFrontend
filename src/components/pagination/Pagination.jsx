import "../../index.css";
import styles from "./Pagination.module.css"
const Pagination = ({
  totalPosts,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.containerPagination}>
      <i
        className="fa-regular fa-arrow-left-to-line"
        onClick={() => setCurrentPage(1)}
      ></i>
      <i
        className="fa-regular fa-angle-left"
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      ></i>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            style={
              currentPage === page
                ? {
                    color: "var(--dark)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }
                : {
                    color: "var(--darkGrey)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }
            }
          >
            {page}
          </button>
        );
      })}
      <i
        className="fa-regular fa-angle-right"
        onClick={() =>
          setCurrentPage(
            currentPage < pages.length ? currentPage + 1 : currentPage
          )
        }
      ></i>
      <i
        className="fa-regular fa-arrow-right-to-line"
        onClick={() => setCurrentPage(pages.length)}
      ></i>
    </div>
  );
};

export default Pagination;
