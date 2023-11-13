import stylesHeader from "./Header.module.css";
import NavBarHeader from "../navbar/NavBarHeader";
import { useMediaQuery } from "@react-hook/media-query";

function Header() {

  const isScreenSmall = useMediaQuery("(max-width: 768px)");

  return (
    <header className={stylesHeader.headerDefault}>
      {isScreenSmall ? <img src="../src/assets/img/barra-mobile-tablet.png" /> :
      <img src="../src/assets/img/barra-desktop.png" />}
        <NavBarHeader></NavBarHeader>
    </header>
  );
}
export default Header;
