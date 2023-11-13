import styles from './Alquileres.module.css'
import AlquilerCard from './AlquilerCard'

const ListAlquileres = ({ alquileres }) => {
  return (
    <>
      {alquileres.length > 0 ? alquileres.map((product) => (
        <AlquilerCard
          key={product.rentalData.id}
          productId={product.productId}
          productImage={product.productImage[0].url}
          productName={product.productName}
          rentalDay={product.rentalData.rentalDay}
          rentalStart={product.rentalData.rentalStartDate}
          rentalEnd={product.rentalData.rentalEndDate}
          total={product.rentalData.rentalPrice}
        />
      )) : <span className={styles.noAlquileres}>¡Aun tenes alquileres!</span>}
    </>
  );
};

export default ListAlquileres;
