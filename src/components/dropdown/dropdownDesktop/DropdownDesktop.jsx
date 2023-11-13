import { Link } from "react-router-dom";
import ListCategorias from "../../list/ListCategorias";
import styles from "./DropdownDesktop.module.css";
import { useEffect, useRef, useState } from "react";

const DropdownDesktop = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const closeDropdownCategory = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropbtn} onClick={toggleDropdown}>
        Herramientas
        <i className="fa-regular fa-chevron-down"></i>
      </button>
      <div
        className={`${styles.dropdownContent} ${
          dropdownOpen ? styles.show : ""
        }`}
      >
        <div className={styles.header + " spacing-grid"}>
          <h2>Categorías</h2>
          <Link to="/allFilters" onClick={toggleDropdown}>
            <i className="fa-regular fa-arrow-right"></i> Explorar
          </Link>
        </div>
        <div className="spacing-grid">
        <ListCategorias onCategoryClick={closeDropdownCategory}/>
        </div>
      </div>
    </div>
  );
};

export default DropdownDesktop;
