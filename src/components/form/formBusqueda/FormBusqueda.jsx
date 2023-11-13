import { useEffect, useState } from "react";
import styles from "./FormBusqueda.module.css";
import { AutoComplete, DateRangePicker, InputGroup, Whisper, Popover} from "rsuite";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";

const FormBusqueda = ({ products, setProducts }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [productsNames, setProductsNames] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [errMessage, setErrMessage] = useState(false);
  const { globalVariable } = useGlobal();

  const { beforeToday } = DateRangePicker;

  const handleForm = (e) => {
    e.preventDefault();

    console.log(dateRange)

    if (dateRange === null || dateRange.length == 0) {
      setErrMessage(true)
      console.log("llene el campo de fechas");
    } else {
      fetchFilterProducts();
    }
  };

  const fetchFilterProducts = async () => {
    const formattedStartDate = dateRange[0]
      ? dateRange[0].toISOString().split("T")[0]
      : null;
    const formattedEndDate = dateRange[1]
      ? dateRange[1].toISOString().split("T")[0]
      : null;

    const buscadorValue = buscador.toLocaleLowerCase().trim(" ");

    const url = `${globalVariable}/v1/api/products/open/rentals?startDate=${formattedStartDate}&endDate=${formattedEndDate}&productName=${buscadorValue}`;

    console.log(url);
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setProducts(response.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    if (products)
      setProductsNames(
        products.map((producto) =>
          producto.name ? producto.name : producto.productDto.name
        )
      );
  }, [products]);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <>
      <form
        className={styles.containerFormBusqueda}
        onSubmit={(e) => handleForm(e)}
      >
        <div className={styles.inputBuscador}>
          <InputGroup inside>
            <InputGroup.Addon>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </InputGroup.Addon>
            <AutoComplete
              data={productsNames}
              value={buscador}
              onChange={setBuscador}
              placeholder="Herramienta"
              style={{
                minHeight: "40px",
              }}
            />
          </InputGroup>
        </div>

        <div className={styles.inputDate}>
        <Whisper
            placement="bottomStart"
            open={errMessage}
            speaker={
              <Popover arrow={true}>
                El campo fecha es requerido
              </Popover>
            }
          >
          <InputGroup inside>
            <InputGroup.Addon>
              <i className="fa-regular fa-calendar"></i>
            </InputGroup.Addon>
            
            <DateRangePicker
              showOneCalendar={screenSize < 768 ? true : false}
              character=" hasta "
              style={{
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              shouldDisableDate={beforeToday()}
              value={dateRange}
              onClick={()=>setErrMessage(false)}
              onChange={setDateRange}
              showMeridian
              placeholder="Selecciona fechas"
              format="yyyy-MM-dd"
            />
          </InputGroup>
       
          </Whisper>
        </div>

        <button className={styles.btnBrowser} type="submit">
          Buscar
        </button>
      </form>
    </>
  );
};

export default FormBusqueda;
