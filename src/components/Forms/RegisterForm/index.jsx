import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";
import { InputPassword } from "../InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { kenzieHubApi } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userRegister = async (formData) => {
    setLoading(true);
    try {
      await kenzieHubApi.post("/users", formData);
      toast.success(
        "Conta criada com sucesso, redirecionando para a página de login"
      );
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

  const submit = (formData) => {
    userRegister(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        placeholder="Digite aqui seu nome"
        {...register("name")}
        error={errors.name}
        disabled={loading}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Digite aqui seu email"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />

      <InputPassword
        label="Senha"
        placeholder="Digite aqui sua senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
      />

      <InputPassword
        label="Confirmar Senha"
        placeholder="Digite novamente sua senha"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
        disabled={loading}
      />

      <Input
        label="Bio"
        type="text"
        placeholder="Fale sobre você"
        {...register("bio")}
        error={errors.bio}
        disabled={loading}
      />

      <Input
        label="Contato"
        type="text"
        placeholder="Opções de contato"
        {...register("contact")}
        error={errors.contact}
        disabled={loading}
      />

      <Select
        label="Selecionar módulo"
        {...register("course_module")}
        error={errors.course_module}
        disabled={loading}
      >
        <option value="">Selecione um módulo</option>
        <option value="Primeiro módulo (Introdução ao Frontend)">
          Primeiro Módulo
        </option>
        <option value="Segundo módulo (Frontend Avançado)">
          Segundo Módulo
        </option>
        <option value="Terceiro módulo (Introdução ao Backend)">
          Terceiro Módulo
        </option>
        <option value="Quarto módulo (Backend Avançado)">Quarto Módulo</option>
      </Select>

      <button type="submit" className="signIn colorNegative" disabled={loading}>
        Cadastrar
      </button>
      {loading ? (
        <div className="spinnerBox">
          <p>Cadastrando</p>
          <span className="spinner"></span>
          <p>Aguarde</p>
        </div>
      ) : null}
    </form>
  );
};
