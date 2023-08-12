import styles from "./style.module.scss";

export const UserInfo = ({ user }) => {
  return (
    <section className={styles.sectionBox}>
      <h1 className="title one">Olá, {user?.name}</h1>
      <p className="headline bold">{user?.course_module}</p>
    </section>
  );
};
