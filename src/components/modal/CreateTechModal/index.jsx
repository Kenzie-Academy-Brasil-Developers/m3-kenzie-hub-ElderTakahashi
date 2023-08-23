import { useContext, useEffect } from "react";
import { CreateTechForm } from "../../Forms/CreateTechForm";
import { MdClose } from "react-icons/md";
import { TechContext } from "../../../providers/TechContext";

export const CreateTechModal = () => {
  const { setCreateTechModalVisible } = useContext(TechContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCreateTechModalVisible(false);
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
          <h3 className="title two">Cadastrar Tecnologia</h3>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setCreateTechModalVisible(false)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <CreateTechForm />
      </div>
    </div>
  );
};
