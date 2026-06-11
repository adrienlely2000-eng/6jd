import { createRouter, publicQuery } from "./middleware";
import { participantRouter } from "./routers/participants";
import { adminRouter } from "./routers/admin";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  participants: participantRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
