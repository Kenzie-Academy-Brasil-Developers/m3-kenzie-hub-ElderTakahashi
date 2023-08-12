import { useState } from "react";
import { DefaultTemplate } from "./components/DefaultTemplate";
import { RoutesMain } from "./routes";
import { useNavigate } from "react-router-dom";
import "./styles/index.scss";
import { toast } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();

  const userLogout = () => {
    setUser(null);
    setVisible(false);
    navigate("/");
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    toast.success("Logout realizado com sucesso");
  };

  return (
    <>
      <DefaultTemplate
        userLogout={userLogout}
        setVisible={setVisible}
        isVisible={isVisible}
      >
        <RoutesMain user={user} setUser={setUser} />
      </DefaultTemplate>
    </>
  );
};

export default App;
