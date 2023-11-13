import { Link, useLocation, useParams } from "react-router-dom";
import Carousel from "../../carousel/Carousel";
import { useState, useEffect } from "react";
import ListCaracteristicas from "../../list/ListCaracteristicas";
import styles from "./Details.module.css";
import { DateRangePicker, Loader, Message, Progress, useToaster } from "rsuite";
import { useMediaQuery } from "@react-hook/media-query";
import { useFetch, statuses } from "../../../customHooks/useFetch";
import ModalShare from "../../modal/ModalShare";
import ListPoliticas from "../../list/listPoliticas/ListPoliticas";
import CardReview from "../../card/cardReview/CardReview";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import FormVal from "../../form/formValoraciones/FormVal";

const LoadingIndicator = () => <Loader size="md" content="CARGANDO" />;

const NetworkError = () => <p>Network Error</p>;

const { beforeToday, combine } = DateRangePicker;

function Details() {

  const locationData = useLocation()

  const params = useParams();
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [isSticky, setIsSticky] = useState(false);
  const { globalVariable } = useGlobal();
  const { token } = useAuth();
  const URL_API = `${globalVariable}/v1/api/products/open/${params.id}`;
  const { data, status } = useFetch(URL_API, {});
  const [policies, setPolicies] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(locationData.state !== null ? [new Date(locationData.state.dates[0]),new Date(locationData.state.dates[1])] : []);
  const [dataRentail, setDataRentail] = useState(null);
  const [isValidDate, setIsValidDate] = useState(false);

  useEffect(() => {
    console.log(locationData.state)
  },[])

  const toaster = useToaster();

  const messageDateError = (
    <Message showIcon type="error" closable>
      No se ha podido seleccionar la fecha correctamente, por favor intentelo de nuevo.
    </Message>
  );

  const messageDateLength = (
    <Message showIcon type="error" closable>
      Por favor seleccione una fecha de inicio y una fecha de fin.
    </Message>
  );


  function handleScroll() {
    const scrollPosition = window.scrollY;
    const bottomElement = document.querySelector(
      `.${styles.boxInfoProductBottomEnd}`
    );

    if (bottomElement) {
      const bottomElementOffset = bottomElement.offsetTop;
      setIsSticky(scrollPosition > bottomElementOffset);
    }
  }

  async function getPolitics() {
    await axios
      .get(`${globalVariable}/v1/api/politics/open`)
      .then(function (response) {
        setPolicies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const validateRentals = () => {
    if (selectedDateRange.length !== 2) {
      // Maneja el caso en el que el rango de fechas no esté seleccionado correctamente
      console.error("El rango de fechas no está seleccionado correctamente");
      toaster.push(messageDateLength, { placement: "bottomStart", duration: 5000 });

      return;
    }


    const startDate = selectedDateRange[0].toISOString().split("T")[0];
    const endDate = selectedDateRange[1].toISOString().split("T")[0];

    const requestData = {
      productId: data.id,
      startDate,
      endDate,
    };


    fetch(`${globalVariable}/v1/api/rentals/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          // Maneja el caso en el que la solicitud no sea exitosa
          throw new Error("La solicitud no pudo completarse");
        }
        return response.json();
      })
      .then((responseData) => {
        // Procesa la respuesta exitosa
        console.log("Respuesta exitosa:", responseData);
        setDataRentail(responseData);
        setIsValidDate(true)
      })
      .catch((error) => {
        // Maneja errores de la solicitud
        console.error("Error en la solicitud:", error);
        toaster.push(messageDateError, { placement: "bottomStart", duration: 5000 });
      });
  };

  const calculateDisabledDates = () => {
    let newDisabledDates = [];

    if (status !== statuses.ERROR && data) {
      console.log(data.productRentals);
      data.productRentals.forEach((rental) => {
        const startDate = new Date(rental.rentalStartDate + "T00:00:00-03:00");
        const endDate = new Date(rental.rentalEndDate + "T00:00:00-03:00");
        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          newDisabledDates.push(new Date(date));
        }
      });
      setDisabledDates(newDisabledDates);
    }
  };

  useEffect(() => {
    calculateDisabledDates();
  }, [status, data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getPolitics();
  }, []);

  useEffect(() => {
    if (selectedDateRange != null && selectedDateRange.length != 0 && data)
      validateRentals();
    console.log(selectedDateRange)
  }, [selectedDateRange,data]);

  const ComponentDetailProduct =
    status !== statuses.ERROR && data ? (
      <>
        <Link to="/home">
          <button className="button-transparent font-btn-transparent pt-large">
            <i className="fa-regular fa-arrow-left"></i>Volver atrás
          </button>
        </Link>
        <div className={styles.boxInfoProduct}>
          <div>
            <div className={styles.boxShareProduct}>
              <h1 className="title-lg">{data.name}</h1>
              <ModalShare product={data}></ModalShare>
            </div>
            <Carousel images={data.images}></Carousel>
          </div>
          <div className={styles.boxInfoProductBottom}>
            <div className={styles.boxInfoProductBottomStart}>
              <div className="pt-24">
                <h4 className={styles.titleDetails + " font-regular mb-16"}>
                  Descripción
                </h4>
                <p className="font-sm">{data.description}</p>
              </div>
              <div>
                <h4 className={styles.titleDetails + " font-regular mb-16"}>
                  Características
                </h4>
                {data.productFeatures ? (
                  <ListCaracteristicas
                    caracteris={data.productFeatures}
                  ></ListCaracteristicas>
                ) : (
                  <p className="font-sm">
                    El producto no posee características.
                  </p>
                )}
              </div>
            </div>
            {/*---------------------------Seccion Calendario + precio ------------------------*/}
            <div
              className={
                styles.boxInfoProductBottomEnd +
                (isSticky ? " " + styles.stickyEnd : "")
              }
            >
              <div className={styles.boxPrecioFechas}>
                <div className={styles.boxCalendarTop}>
                  <div className={styles.boxTexts}>
                    <span className={styles.titleSm}>Precio total</span>
                    <div className={styles.textPrecio}>
                      <span>$</span>
                      <span>
                        {dataRentail ? (
                          <span>
                            {dataRentail.TotalPrice} x{" "}
                            {dataRentail.totalDays > 1 ? (
                              <span>{dataRentail.totalDays} dias</span>
                            ) : (
                              <span>dia</span>
                            )}{" "}
                          </span>
                        ) : (
                          data.price
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <form className={styles.boxCalendar}>
                  <label className={styles.titleSm}>Desde - Hasta</label>
                  {isScreenSmall ? (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
                      showOneCalendar
                      shouldDisableDate={combine(
                        (date) =>
                          disabledDates.some(
                            (disabledDate) =>
                              date.getDate() === disabledDate.getDate() &&
                              date.getMonth() === disabledDate.getMonth() &&
                              date.getFullYear() === disabledDate.getFullYear()
                          ),
                        beforeToday()
                      )}
                      value={selectedDateRange}
                      onChange={setSelectedDateRange}
                      onClean={()=> setIsValidDate(false)}
                    />
                  ) : (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
                      shouldDisableDate={combine(
                        (date) =>
                          disabledDates.some(
                            (disabledDate) =>
                              date.getDate() === disabledDate.getDate() &&
                              date.getMonth() === disabledDate.getMonth() &&
                              date.getFullYear() === disabledDate.getFullYear()
                          ),
                        beforeToday()
                      )}
                      value={selectedDateRange}
                      onChange={setSelectedDateRange}
                      className={styles.inputCalendar}
                      onClean={()=> setIsValidDate(false)}
                    />
                  )}
                </form>
              </div>
              {!isValidDate ? (
                <button href="" className={styles.buttonCtaDisabled} disabled>
                  Alquilar
                </button>
              ) : (
                <Link
                  className={styles.buttonCta}
                  to={!token ? "/auth/login" :"/rentaldetails"}
                  state={{ dataRentail: dataRentail, productData: data, dates: selectedDateRange }}
                >
                  Alquilar
                </Link>
              )}
            </div>
          </div>
          <div className={styles.boxList}>
            {/*---------------------------Seccion Políticas------------------------*/}
            <div className={styles.sectionPoliticas}>
              <h4 className={styles.titleDetails + " font-regular mb-16"}>
                Políticas
              </h4>
              <ListPoliticas policies={policies} />
            </div>
            {/*---------------------------Seccion Valoraciones------------------------*/}
            <div className={styles.sectionVal}>
              <h4 className={styles.titleDetails + " font-regular mb-16"}>
                Valoraciones
              </h4>
              <div className={"d-flex " + styles.containerVal}>
                <FormVal productReviews={data} />
                <div className={styles.boxProgressLines}>
                  <div className="d-flex">
                    <span>5</span>
                    <Progress.Line
                      showInfo={false}
                      percent={
                        data.productReviews.length !== 0
                          ? (data.productReviews.filter(
                              (product) => product.score === 5
                            ).length /
                              data.productReviews.length) *
                            100
                          : 0
                      }
                    />
                  </div>
                  <div className="d-flex">
                    <span>4</span>
                    <Progress.Line
                      showInfo={false}
                      percent={
                        data.productReviews.length !== 0
                          ? (data.productReviews.filter(
                              (product) => product.score === 4
                            ).length /
                              data.productReviews.length) *
                            100
                          : 0
                      }
                    />
                  </div>
                  <div className="d-flex">
                    <span>3</span>
                    <Progress.Line
                      showInfo={false}
                      percent={
                        data.productReviews.length !== 0
                          ? (data.productReviews.filter(
                              (product) => product.score === 3
                            ).length /
                              data.productReviews.length) *
                            100
                          : 0
                      }
                    />
                  </div>
                  <div className="d-flex">
                    <span>2</span>
                    <Progress.Line
                      showInfo={false}
                      percent={
                        data.productReviews.length !== 0
                          ? (data.productReviews.filter(
                              (product) => product.score === 2
                            ).length /
                              data.productReviews.length) *
                            100
                          : 0
                      }
                    />
                  </div>
                  <div className="d-flex">
                    <span>1</span>
                    <Progress.Line
                      showInfo={false}
                      percent={
                        data.productReviews.length !== 0
                          ? (data.productReviews.filter(
                              (product) => product.score === 1
                            ).length /
                              data.productReviews.length) *
                            100
                          : 0
                      }
                    />
                  </div>
                </div>
              </div>
              {/*-----------Aqui va el map de las valoraciones del producto-------*/}
              <ul className={styles.listReviews}>
                <CardReview productReviews={data.productReviews} />
              </ul>
            </div>
          </div>
        </div>
      </>
    ) : null;

  return (
    <div className="d-flex f-dir-colum">
      {status === statuses.LOADING ? (
        <LoadingIndicator />
      ) : (
        ComponentDetailProduct
      )}
      {status === statuses.ERROR && <NetworkError />}
    </div>
  );
}

export default Details;
