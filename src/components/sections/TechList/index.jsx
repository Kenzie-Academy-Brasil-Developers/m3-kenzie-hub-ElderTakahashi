import { TechCard } from "./TechCard";
import styles from "./style.module.scss";
import plusIcon from "../../../assets/plusIcon.svg";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { TechContext } from "../../../providers/TechContext";
import { EditTechModal } from "../../modal/EditTechModal";
import { CreateTechModal } from "../../modal/CreateTechModal";

export const TechList = () => {
  const { techList } = useContext(UserContext);
  const { createTechModalVisible, setCreateTechModalVisible, currentTech } =
    useContext(TechContext);
  return (
    <>
      <section className={styles.sectionBox}>
        <div>
          <h2 className="title two">Tecnologias</h2>
          <button
            className="addTech"
            aria-label="add tech"
            title="Add tech"
            onClick={() => setCreateTechModalVisible(true)}
          >
            <img src={plusIcon} alt="Add icon" />
          </button>
        </div>
        {techList.length > 0 ? (
          <ul>
            {techList.map((tech) => (
              <TechCard
                key={tech.id}
                id={tech.id}
                title={tech.title}
                status={tech.status}
              />
            ))}
          </ul>
        ) : (
          <h2 className="title two">
            Você ainda não adicionou nenhuma tecnologia
          </h2>
        )}
      </section>
      {currentTech !== null ? <EditTechModal /> : null}
      {createTechModalVisible ? <CreateTechModal /> : null}
    </>
  );
};
