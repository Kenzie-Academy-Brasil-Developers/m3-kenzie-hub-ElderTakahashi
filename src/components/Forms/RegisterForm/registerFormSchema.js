import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().nonempty("Ensira o seu nome"),
    email: z
      .string()
      .nonempty("Ensira o seu e-mail")
      .email("Forneça um e-mail válido"),
    password: z
      .string()
      .nonempty("Digite uma senha válida")
      .min(8, "São necessários pelo menos oito caracteres")
      .regex(/[A-Z]+/, "É necessário conter pelo menos uma letra maiúscula")
      .regex(/[a-z]+/, "É necessário conter pelo menos uma letra minúscula")
      .regex(/[0-9]+/, "É necessário pelo menos um número")
      .regex(
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/,
        "É necessário pelo menos um caracter especial."
      ),
    confirmPassword: z.string().nonempty("Confirme a sua senha"),
    bio: z.string().nonempty("A bio é obrigatória"),
    contact: z.string().nonempty("Informe pelo menos um contato"),
    course_module: z.string().nonempty("Selecione o seu módulo"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });
