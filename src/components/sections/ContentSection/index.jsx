import styles from "./style.module.scss";

export const ContentSection = () => {
  return (
    <section className={styles.sectionBox}>
      <h1 className="title one">Que pena! Estamos em desenvolvimento :(</h1>
      <h2 className="title two">
        Nossa aplicação está em desenvolvimento, em breve teremos novidades
      </h2>
    </section>
  );
};
