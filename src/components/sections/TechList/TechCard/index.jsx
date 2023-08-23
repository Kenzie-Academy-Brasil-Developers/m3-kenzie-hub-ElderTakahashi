import styles from "./style.module.scss";
import editIcon from "../../../../assets/editIcon.svg";
import deleteIcon from "../../../../assets/deleteIcon.svg";
import { useContext } from "react";
import { TechContext } from "../../../../providers/TechContext";

export const TechCard = ({ id, title, status }) => {
  const { removeTech, setCurrentTech } = useContext(TechContext);

  return (
    <li className={styles.cardBox}>
      <h2 className="title two">{title}</h2>
      <div>
        <p className="headline">{status}</p>
        <div>
          <button
            className="cardButton"
            aria-label="edit"
            title="Editar"
            onClick={() => {
              setCurrentTech({ id, title, status });
            }}
          >
            <img src={editIcon} alt="Edit Icon" />
          </button>

          <button className="cardButton" aria-label="delete" title="Delete">
            <img
              src={deleteIcon}
              alt="Delete Icon"
              onClick={() => removeTech(id)}
            />
          </button>
        </div>
      </div>
    </li>
  );
};
