import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createInscription, getInscriptions, getInscriptionCount, deleteInscription, deleteManyInscriptions, deleteAllInscriptions } from "./db";
import { SignJWT, jwtVerify } from "jose";
import { TRPCError } from "@trpc/server";
import { parse as parseCookieHeader } from "cookie";

const ADMIN_COOKIE = "admin_session";

function getAdminSecret() {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return new TextEncoder().encode(secret);
}

async function verifyAdminCookie(cookieHeader: string | undefined): Promise<boolean> {
  if (!cookieHeader) return false;

  const cookies = parseCookieHeader(cookieHeader);
  const token = cookies[ADMIN_COOKIE];
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getAdminSecret(), {
      algorithms: ["HS256"],
    });
    return payload.admin === true;
  } catch {
    return false;
  }
}

const requireAdmin = async (cookieHeader: string | undefined) => {
  const isAdmin = await verifyAdminCookie(cookieHeader);
  if (!isAdmin) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Accès refusé. Connectez-vous en tant qu'admin.",
    });
  }
};

export const appRouter = router({
  system: systemRouter,

  admin: router({
    login: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const expected = process.env.ADMIN_PASSWORD;
        if (!expected || input.password !== expected) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Mot de passe incorrect",
          });
        }

        const token = await new SignJWT({ admin: true })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setExpirationTime(Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000)) // 7 days
          .sign(getAdminSecret());

        ctx.res.cookie(ADMIN_COOKIE, token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { success: true } as const;
      }),
    verify: publicProcedure.query(async ({ ctx }) => {
      const isAdmin = await verifyAdminCookie(ctx.req.headers.cookie);
      return { authenticated: isAdmin };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(ADMIN_COOKIE, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: -1,
      });
      return { success: true } as const;
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
      .query(async ({ input, ctx }) => {
        await requireAdmin(ctx.req.headers.cookie);
        return getInscriptions(input.eventId || "prochain-event");
      }),
    count: publicProcedure
      .input(z.object({
        eventId: z.string().optional(),
      }))
      .query(async ({ input }) => {
        return getInscriptionCount(input.eventId || "prochain-event");
      }),
    delete: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        await requireAdmin(ctx.req.headers.cookie);
        await deleteInscription(input.id);
        return { success: true };
      }),
    deleteMany: publicProcedure
      .input(z.object({
        ids: z.array(z.number()).min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        await requireAdmin(ctx.req.headers.cookie);
        await deleteManyInscriptions(input.ids);
        return { success: true };
      }),
    deleteAll: publicProcedure
      .input(z.object({
        eventId: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await requireAdmin(ctx.req.headers.cookie);
        await deleteAllInscriptions(input.eventId || "prochain-event");
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
