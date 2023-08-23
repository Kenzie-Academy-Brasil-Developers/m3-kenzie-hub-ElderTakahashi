import { TechList } from "../../components/sections/TechList";
import { UserInfo } from "../../components/sections/UserInfo";
import styles from "./style.module.scss";

export const DashboardPage = () => {
  return (
    <>
      <main>
        <div className={styles.boxBorder}>
          <UserInfo />
        </div>
        <TechList />
      </main>
    </>
  );
};
