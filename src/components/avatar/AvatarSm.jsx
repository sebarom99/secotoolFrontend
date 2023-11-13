import style from "./Avatar.module.css";

const AvatarSm = ({toggle, user }) => {

  const firstLetterName = user.firstName
  ? user.firstName.charAt(0).toUpperCase()
  : "";

const firstLetterLastName = user.lastName
  ? user.lastName.charAt(0).toUpperCase()
  : "";

  return (
    <div className={style.avatarSm} onClick={toggle}>
      <div className={style.iniciales}>
        <span>{firstLetterName}</span>
        <span>{firstLetterLastName}</span>
      </div>
    </div>
  );
};
export default AvatarSm;
