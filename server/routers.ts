import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createInscription, getInscriptions, getInscriptionCount } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  inscriptions: router({
    create: publicProcedure
      .input(z.object({
        prenom: z.string().min(1),
        nom: z.string().min(1),
        email: z.string().email(),
        telephone: z.string().min(1),
        accepteContact: z.boolean(),
        attestePresence: z.boolean(),
        eventId: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createInscription({
          prenom: input.prenom,
          nom: input.nom,
          email: input.email,
          telephone: input.telephone,
          accepteContact: input.accepteContact ? 1 : 0,
          attestePresence: input.attestePresence ? 1 : 0,
          eventId: input.eventId || "prochain-event",
        });
      }),
    list: publicProcedure
      .input(z.object({
        eventId: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return getInscriptions(input.eventId || "prochain-event");
      }),
    count: publicProcedure
      .input(z.object({
        eventId: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return getInscriptionCount(input.eventId || "prochain-event");
      }),
  }),
});

export type AppRouter = typeof appRouter;
