import { Message, Toggle, toaster, Tooltip, Whisper } from "rsuite";
import styles from "./UsersAdminCard.module.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useGlobal } from "../../contexts/GlobalContext";
import { useState } from "react";

const UsersAdminCard = ({ selectedUser, getData }) => {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();

  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [tooltipMessage, setTooltipMessage] = useState(selectedUser.userRole === "ADMIN" ? "Cambiar a rol usuario" : "Cambiar a rol administrador"); // Estado del mensaje del Tooltip

  const message = (
    <Message showIcon type="success" closable>
      El rol se ha actualizado exitosamente
    </Message>
  );

  async function handleRole() {
    return {
      ...selectedUser,
      userRole: selectedUser.userRole === "USER" ? "ADMIN" : "USER",
    };
  }

  const updateAdminRole = async () => {
    const updatedUserBody = await handleRole();

    setIsLoading(true);
  
    console.log("soy updated user", updatedUserBody);
  
    try {
      const response = await axios.put(
        `${globalVariable}/v1/api/users/admin/change_role`,
        {
          userId: selectedUser.id,
          userRole: updatedUserBody.userRole,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  
      console.log(response);
      setIsLoading(false);
      
      // Actualizar el mensaje del Tooltip según el estado del Toggle
      setTooltipMessage(updatedUserBody.userRole === "ADMIN" ? "Cambiar a rol usuario" : "Cambiar a rol administrador");

      toaster.push(message, { placement: "bottomStart", duration: 5000 });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <span>{selectedUser.id}</span>
      <span>
        {selectedUser.firstName}, {selectedUser.lastName}
      </span>
        <Whisper placement="bottom" controlId="controls-id-hover" trigger={"hover"} speaker={<Tooltip>{tooltipMessage}</Tooltip>}>
      <div>
        <Toggle
          size="md"
          checkedChildren="ADMIN"
          unCheckedChildren="USER"
          checked={selectedUser.userRole === "ADMIN"}
          onChange={updateAdminRole}
          arial-label="Switch"
          loading={isLoading}
          className={styles.toggleUser}
        />
      </div>
        </Whisper>
    </div>
  );
};

export default UsersAdminCard;
