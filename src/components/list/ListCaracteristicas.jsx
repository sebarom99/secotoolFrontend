import styles from './ListCaracteristicas.module.css'
const ListCaracteristicas = ({ caracteris }) => {
  console.log(caracteris)
  return (
    <ul className={styles.listCaract}>
      {caracteris.map((caract) => (
          <li key={caract.id}><i className={caract.icon}></i>{caract.name}</li>
      ))}
    </ul>
  );
};
export default ListCaracteristicas;
