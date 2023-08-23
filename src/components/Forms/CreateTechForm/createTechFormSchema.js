import { z } from "zod";

export const createTechFormSchema = z.object({
  title: z.string().nonempty("Insira uma tech"),
  status: z.string().nonempty("Selecione seu nível de conhecimento"),
});
