import { ContentSection } from "../../components/sections/ContentSection";
import { UserInfo } from "../../components/sections/UserInfo";
import styles from "./style.module.scss";

export const DashboardPage = ({ user }) => {
  return (
    <>
      <main>
        <div className={styles.boxBorder}>
          <UserInfo user={user} />
        </div>
        <ContentSection />
      </main>
    </>
  );
};
