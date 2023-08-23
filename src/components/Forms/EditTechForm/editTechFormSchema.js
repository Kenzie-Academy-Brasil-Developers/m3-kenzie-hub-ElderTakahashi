import { z } from "zod";

export const editTechFormSchema = z.object({
  status: z.string().nonempty("Altere seu nível de conhecimento"),
});
