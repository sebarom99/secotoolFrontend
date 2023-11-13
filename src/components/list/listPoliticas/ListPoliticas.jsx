import styles from "./ListPoliticas.module.css";

const ListPoliticas = ({ policies }) => {

  return (
    <ul className={styles.listPoliticas}>
      {policies.map((politica) => (
        <li key={politica.id}>
          <h5>{politica.title}</h5>
          <p className="font-sm">{politica.description}</p>
        </li>
      ))}
    </ul>
  );
};
export default ListPoliticas;
