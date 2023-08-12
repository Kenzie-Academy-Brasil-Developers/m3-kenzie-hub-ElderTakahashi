import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { kenzieHubApi } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginFormSchema) });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const userLogin = async (formData) => {
    try {
      setLoading(true);
      const { data } = await kenzieHubApi.post("/sessions", formData);
      localStorage.setItem("@TOKEN", JSON.stringify(data.token));
      localStorage.setItem("@USERID", JSON.stringify(data.user.id));
      setUser(data.user);
      toast.success("Login realizado com sucesso");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
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

  const submit = (formData) => {
    userLogin(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />
      <InputPassword
        label="Senha"
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
      />
      <button type="submit" className="signIn" disabled={loading}>
        {loading ? <span className="spinner sml"></span> : "Entrar"}
      </button>
    </form>
  );
};
