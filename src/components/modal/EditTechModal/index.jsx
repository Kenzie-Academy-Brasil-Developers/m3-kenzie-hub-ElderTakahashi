import { useContext, useEffect } from "react";
import { EditTechForm } from "../../Forms/EditTechForm";
import { MdClose } from "react-icons/md";
import { TechContext } from "../../../providers/TechContext";

export const EditTechModal = () => {
  const { setCurrentTech } = useContext(TechContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCurrentTech(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modalOverlay" role="dialog">
      <div className="modal">
        <div>
          <h3 className="title two">Tecnologia Detalhes</h3>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setCurrentTech(null)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <EditTechForm />
      </div>
    </div>
  );
};
