import stylesHeader from "./Header.module.css";
import NavBarHeader from "../navbar/NavBarHeader";
import { useMediaQuery } from "@react-hook/media-query";
import barraDesktop from "../../assets/img/barra-desktop.png"
import barraTablet from "../../assets/img/barra-mobile-tablet.png"

function Header() {

  const isScreenSmall = useMediaQuery("(max-width: 768px)");

  return (
    <header className={stylesHeader.headerDefault}>
      {isScreenSmall ? <img src={barraTablet} /> :
      <img src={barraDesktop} />}
        <NavBarHeader></NavBarHeader>
    </header>
  );
}
export default Header;
