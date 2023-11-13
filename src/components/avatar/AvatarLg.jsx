import style from "./Avatar.module.css";

const AvatarLg = ({ user }) => {
  const firstLetterName = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";

  const firstLetterLastName = user.lastName
    ? user.lastName.charAt(0).toUpperCase()
    : "";

  return (
    <div className={style.avatarLg}>
      <div className={style.iniciales}>
        <span>{firstLetterName}</span>
        <span>{firstLetterLastName}</span>
      </div>
    </div>
  );
};
export default AvatarLg;
