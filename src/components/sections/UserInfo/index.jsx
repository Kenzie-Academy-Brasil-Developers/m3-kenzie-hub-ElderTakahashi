import { useContext } from "react";
import styles from "./style.module.scss";
import { UserContext } from "../../../providers/UserContext";

export const UserInfo = () => {
  const { user } = useContext(UserContext);
  return (
    <section className={styles.sectionBox}>
      <h1 className="title one">Olá, {user?.name}</h1>
      <p className="headline bold">{user?.course_module}</p>
    </section>
  );
};
