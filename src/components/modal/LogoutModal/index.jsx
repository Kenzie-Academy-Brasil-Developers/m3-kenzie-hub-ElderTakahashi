import { MdClose } from "react-icons/md";
import styles from "./style.module.scss";
import { useEffect } from "react";

export const LogoutModal = ({ userLogout, setVisible }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.modalOverlay} role="dialog">
      <div className={styles.modal}>
        <button
          className="closeModal"
          aria-label="close"
          title="Fechar"
          onClick={() => setVisible(false)}
        >
          <MdClose size={21} color="gray" />
        </button>
        <h1 className="title one">Tem certeza que quer se desconectar?</h1>
        <div>
          <button className="modalButton" onClick={userLogout}>
            Sim
          </button>
          <button className="modalButton" onClick={() => setVisible(false)}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
};
