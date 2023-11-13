import { useEffect} from "react";
import AvatarLg from "../../avatar/AvatarLg";
import style from "./Profile.module.css";
import { useFunction } from "../../../contexts/FunctionsContext";
import { useAuth } from "../../../contexts/AuthContext";

const Profile = () => {

  const {token} = useAuth();

  const {fetchUser, user } = useFunction();

  useEffect(() => {
    fetchUser(token);
  },[]);

  return (
    <section className={style.sectionProfile + " spacing-grid"}>
      <h3>Mi perfil</h3>
      <AvatarLg user={user}/>
      <h4>{user.firstName + " " + user.lastName}</h4>
      <div className={style.containerInfo}>
        <div className={style.boxInfo}>
          <span>Nombre</span>
          <p>{user.firstName}</p>
        </div>
        <div className={style.boxInfo}>
          <span>Apellido</span>
          <p>{user.lastName}</p>
        </div>
        <div className={style.boxInfo}>
          <span>Email</span>
          <p>{user.username}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
