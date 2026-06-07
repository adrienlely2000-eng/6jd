import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { store } from "../store";

export const participantRouter = createRouter({
  list: publicQuery.query(() => {
    return store.getParticipants();
  }),

  create: publicQuery
    .input(
      z.object({
        nom: z.string().min(1),
        parcours: z.string().min(1),
        categorie: z.string().min(1),
        club: z.string().default("-"),
        typeCourse: z.string().default("Course"),
        dateNaissance: z.string().default(""),
        adresse: z.string().default(""),
        telephone: z.string().default(""),
        sexe: z.string().default(""),
        email: z.string().default(""),
        tailleMaillot: z.string().default(""),
      })
    )
    .mutation(({ input }) => {
      const result = store.addParticipant({
        nom: input.nom.toUpperCase(),
        parcours: input.parcours,
        categorie: input.categorie,
        club: input.club ? input.club.toUpperCase() : "-",
        typeCourse: input.typeCourse,
        dateNaissance: input.dateNaissance,
        adresse: input.adresse,
        telephone: input.telephone,
        sexe: input.sexe,
        email: input.email,
        tailleMaillot: input.tailleMaillot,
      });
      return { id: result.id, success: true };
    }),

  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      store.deleteParticipant(input.id);
      return { success: true };
    }),
});
