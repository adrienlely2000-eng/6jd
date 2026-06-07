import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode("6jda-secret-key-2027-ultra-endurance");

export const adminRouter = createRouter({
  login: publicQuery
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      if (input.username === "admin" && input.password === "6jda2027") {
        const token = await new SignJWT({ username: "admin" })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("7d")
          .sign(JWT_SECRET);
        return { success: true, token };
      }
      return { success: false, token: null };
    }),
  verify: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const { payload } = await jwtVerify(input.token, JWT_SECRET, { clockTolerance: 60 });
        return { valid: true, username: payload.username as string };
      } catch {
        return { valid: false, username: null };
      }
    }),
});
