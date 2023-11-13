import { useMediaQuery } from "@react-hook/media-query";
import styles from "./RentalDetails.module.css";
import { Message, Rate, Steps, useToaster } from "rsuite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Resume from "../resume/Resume";
import { useEffect, useState } from "react";
import PersonalInfo from "../personalInfo/PersonalInfo";
import Confirm from "../confirm/Confirm";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const RentalDetails = () => {
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [productData, setProductData] = useState({});
  const [dataRentail, setDataRentail] = useState({});
  const [documento, setDocumento] = useState("");
  const toaster = useToaster();
  const location = useLocation();
  const { globalVariable } = useGlobal();
  const { token } = useAuth();
  const navigate = useNavigate();

  const messageErr = (
    <Message showIcon type="error" closable>
      No se ha podido alquilar el producto
    </Message>
  );

  const messageConfirmRent = (
    <Message showIcon type="success" closable>
      El producto se reservó correctamente. Puede chequear todas sus reservas en
      la sección Mis Alquileres.
    </Message>
  );

  async function handleRent() {
    if (documento !== "") {
      await axios
        .put(
          `${globalVariable}/v1/api/users/update/dni`,
          {
            "dni": documento,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(documento)
    }

    if (dataRentail.startDate && dataRentail.endDate) {
      const startDate = dataRentail.startDate;
      const endDate = dataRentail.endDate;
      await axios
        .post(
          `${globalVariable}/v1/api/rentals`,
          {
            productId: productData.id,
            startDate: startDate,
            endDate: endDate,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          navigate(`/product/${productData.id}`);
          toaster.push(messageConfirmRent, {
            placement: "bottomStart",
            duration: 5000,
          });
        })
        .catch(function (error) {
          console.log(error);
          toaster.push(messageErr, {
            placement: "bottomStart",
            duration: 5000,
          });
        });
    } else {
      alert("Debes seleccionar alguna fecha para alquilar el producto");
    }
  }

  const onChange = (nextStep) => {
    setCurrentStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
  };

  const onNext = () => onChange(currentStep + 1);
  const onPrevious = () => onChange(currentStep - 1);

  useEffect(() => {
    setProductData(location.state.productData);
    setDataRentail(location.state.dataRentail);
  }, []);

  return (
    <section className={styles.sectionRentalDetails}>
      <div className={styles.headRentalDetails}>
        <h3>Solicitud de Alquiler</h3>
        {isScreenSmall ? (
          <Steps current={currentStep} className={styles.steps}>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
          </Steps>
        ) : (
          <Steps current={currentStep} className={styles.steps}>
            <Steps.Item title="Resumen" />
            <Steps.Item title="Tus datos" />
            <Steps.Item title="Confirmación" />
          </Steps>
        )}
      </div>
      {productData && dataRentail && (
        <div className={styles.boxSolicitud}>
          <div className={styles.boxEnd}>
            <div className={styles.cardProductDetails}>
              <img
                src={productData.images ? productData.images[0].url : ""}
              ></img>
              <h3>{productData.name}</h3>
              <div className={styles.boxScore}>
                <span>{productData.averageScore}</span>
                <Rate
                  readOnly
                  allowHalf
                  max={5}
                  value={productData.averageScore}
                  defaultValue={0}
                  size="xs"
                />
              </div>
              <hr />
              <div className={styles.boxDates}>
                <div>
                  <div>
                    <span>Desde</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-calendar"></i>
                    <span> {dataRentail.startDate}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Hasta</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-calendar"></i>
                    <span> {dataRentail.endDate}</span>
                  </div>
                </div>
              </div>
            </div>
            {currentStep !== 2 ? (
              <div className={styles.boxPriceDetails}>
                <h4>Detalles del precio</h4>
                <div className="d-flex jc-space-bw">
                  <span>Alquiler de herramienta</span>
                  <span>${productData.price}</span>
                </div>
                <div>
                  <span>${productData.price}</span>
                  <span> x {dataRentail.totalDays} dias</span>
                </div>
                <hr />
                <div className="d-flex jc-space-bw font-bold">
                  <span>Total</span>
                  <span>${dataRentail.TotalPrice}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {currentStep === 0 ? (
            <Resume className={styles.boxResume} productData={productData} />
          ) : currentStep === 1 ? (
            <PersonalInfo
              documento={documento}
              setDocumento={setDocumento}
              className={styles.boxPersonalInfo}
            ></PersonalInfo>
          ) : (
            <div>
              <Confirm productName={productData.name} />
              <div className={styles.boxPriceDetails}>
                <h4>Detalles del precio</h4>
                <div className="d-flex jc-space-bw">
                  <span>Alquiler de herramienta</span>
                  <span>${productData.price}</span>
                </div>
                <div>
                  <span>${productData.price}</span>
                  <span> x {dataRentail.totalDays} dias</span>
                </div>
                <hr />
                <div className="d-flex jc-space-bw font-bold">
                  <span>Total</span>
                  <span>${dataRentail.TotalPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.boxButtons}>
        <Link
          className={styles.btnCta}
          onClick={currentStep === 2 ? () => handleRent() : onNext}
        >
          {currentStep === 2 ? "Confirmar alquiler" : "Continuar"}
        </Link>
        {currentStep === 0 ? (
          <Link
            className={styles.btnSecondary}
            to={`/product/${productData.id}`}
          >
            Volver al producto
          </Link>
        ) : (
          <Link className={styles.btnSecondary} onClick={onPrevious}>
            Volver un paso anterior
          </Link>
        )}
      </div>
    </section>
  );
};
export default RentalDetails;
