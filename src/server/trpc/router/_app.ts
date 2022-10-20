// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./guestbook";
import { authRouter } from "./auth";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
