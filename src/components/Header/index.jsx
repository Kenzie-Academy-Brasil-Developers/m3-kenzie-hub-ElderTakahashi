import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import { LogoutModal } from "../modal/LogoutModal";

export const Header = ({ userLogout, setVisible, isVisible }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderButton = () => {
    if (currentPath === "/dashboard") {
      return (
        <button className="logout" onClick={() => setVisible(true)}>
          Sair
        </button>
      );
    } else if (currentPath !== "/") {
      return (
        <button className="transparent">
          <Link to="/" className="link back">
            Voltar
          </Link>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <header>
      <div
        className={`container high ${
          currentPath !== "/" ? "spaceBetween" : ""
        } ${
          currentPath === "/dashboard" || currentPath === "/errorPage"
            ? "wider"
            : ""
        }
        ${currentPath === "/register" ? "marginTop" : ""}
        `}
      >
        <img
          src={logo}
          alt="Kenzie Hub Logo"
          className={`logoSize ${currentPath === "/register" ? "reg" : ""} 
          ${currentPath === "/dashboard" ? "dash" : ""}`}
        />
        {renderButton()}
      </div>

      {isVisible ? (
        <LogoutModal userLogout={userLogout} setVisible={setVisible} />
      ) : null}
    </header>
  );
};
