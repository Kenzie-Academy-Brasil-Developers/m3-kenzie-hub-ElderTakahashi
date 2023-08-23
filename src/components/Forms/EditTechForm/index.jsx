import { useContext, useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTechFormSchema } from "./editTechFormSchema";
import { TechContext } from "../../../providers/TechContext";

export const EditTechForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTechFormSchema),
  });

  const { currentTech, editTech } = useContext(TechContext);
  const [loading, setLoading] = useState(false);

  const submit = (formData) => {
    if (formData.status !== currentTech.status) {
      editTech(currentTech.id, formData);
      setLoading(true);
      reset();
    }
  };

  return (
    <>
      {currentTech !== null ? (
        <form onSubmit={handleSubmit(submit)}>
          <Input
            label="Nome"
            type="text"
            placeholder={currentTech.title}
            error={errors.title}
            disabled
          />

          <Select label="Status" {...register("status")} error={errors.status}>
            <option value="">{currentTech.status}</option>
            {currentTech.status !== "Iniciante" ? (
              <option value="Iniciante">Iniciante</option>
            ) : null}
            {currentTech.status !== "Intermediário" ? (
              <option value="Intermediário">Intermediário</option>
            ) : null}
            {currentTech.status !== "Avançado" ? (
              <option value="Avançado">Avançado</option>
            ) : null}
          </Select>

          <button type="submit" className="submitModal disable">
            {loading ? (
              <span className="spinner sml"></span>
            ) : (
              "Salvar alterações"
            )}
          </button>
        </form>
      ) : null}
    </>
  );
};
