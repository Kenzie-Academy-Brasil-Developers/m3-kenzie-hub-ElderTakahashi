import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { kenzieHubApi } from "../services/api";
import { toast } from "react-toastify";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
  const [createTechModalVisible, setCreateTechModalVisible] = useState(false);
  const { techList, setTechList } = useContext(UserContext);
  const [currentTech, setCurrentTech] = useState(null);

  const addTech = async (formData, setLoading) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const { data } = await kenzieHubApi.post("/users/techs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Tecnologia adicionada com sucesso");
      setTechList([...techList, data]);
      setCreateTechModalVisible(false);
    } catch (error) {
      if (
        error.response.data.message ===
        "User Already have this technology created you can only update it"
      ) {
        toast.error(
          "Você já possui essa tecnologia criada, você só pode atualizá-la."
        );
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const editTech = async (id, formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const { data } = await kenzieHubApi.put(`/users/techs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTechList = (techList) =>
        techList.map((tech) =>
          tech.id === id ? { ...tech, ...formData } : tech
        );
      setTechList(newTechList);
      toast.success("Tecnologia editada com sucesso");
      setCurrentTech(null);
      return data;
    } catch (error) {
      toast.error("Algo deu errado, tente novamente mais tarde");
    }
  };

  const removeTech = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const { data } = await kenzieHubApi.delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newTechList = (techList) =>
        techList.filter((tech) => tech.id !== id);
      setTechList(newTechList);
      toast.success("Tecnologia excluida com sucesso");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <TechContext.Provider
      value={{
        createTechModalVisible,
        setCreateTechModalVisible,
        addTech,
        removeTech,
        currentTech,
        setCurrentTech,
        editTech,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
