import { Input } from "../Input";
import { Select } from "../Select";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { createTechFormSchema } from "./createTechFormSchema";
import { TechContext } from "../../../providers/TechContext";

export const CreateTechForm = () => {
  const { addTech } = useContext(TechContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTechFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const submit = (formData) => {
    addTech(formData, setLoading);
    setLoading(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        placeholder="Typescript"
        {...register("title")}
        error={errors.title}
        disabled={loading}
      />

      <Select
        label="Selecionar status"
        {...register("status")}
        error={errors.status}
        disabled={loading}
      >
        <option value="">Selecione um status</option>
        <option value="Iniciante">Iniciante</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </Select>

      <button type="submit" className="submitModal" disabled={loading}>
        {loading ? (
          <span className="spinner sml"></span>
        ) : (
          "Cadastrar Tecnologia"
        )}
      </button>
    </form>
  );
};
