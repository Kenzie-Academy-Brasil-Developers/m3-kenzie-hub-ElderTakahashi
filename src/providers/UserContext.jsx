import { createContext, useEffect, useState } from "react";
import { kenzieHubApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [techList, setTechList] = useState();
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@TOKEN"));

    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await kenzieHubApi.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
        setTechList(data.techs);
        navigate(pathname);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      getUser();
    }
  }, []);

  const userLogin = async (formData, setLoading, reset) => {
    try {
      setLoading(true);
      const { data } = await kenzieHubApi.post("/sessions", formData);
      localStorage.setItem("@TOKEN", JSON.stringify(data.token));
      localStorage.setItem("@USERID", JSON.stringify(data.user.id));

      setUser(data.user);
      setTechList(data.user.techs);
      reset();
      toast.success("Login realizado com sucesso");
    } catch (error) {
      if (
        error.response?.data.message ===
        "Incorrect email / password combination"
      ) {
        toast.error("O email e a senha não correspondem.");
      }
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (formData, setLoading, reset) => {
    setLoading(true);
    try {
      await kenzieHubApi.post("/users", formData);
      toast.success(
        "Conta criada com sucesso, redirecionando para a página de login"
      );
      reset();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.response?.data.message === "Email already exists") {
        toast.error("Usuário já cadastrado");
      } else {
        toast.error("Ops! Algo deu errado");
      }
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    setVisible(false);
    navigate("/");
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    toast.warning("Você foi desconectado");
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        techList,
        setTechList,
        userLogin,
        userRegister,
        userLogout,
        setVisible,
        isVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
