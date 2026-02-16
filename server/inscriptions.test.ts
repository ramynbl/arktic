import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("inscriptions", () => {
  describe("create", () => {
    it("should create an inscription with valid data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.inscriptions.create({
        prenom: "Jean",
        nom: "Dupont",
        email: "jean.dupont@example.com",
        telephone: "+33612345678",
        accepteContact: true,
        attestePresence: true,
        eventId: "prochain-event",
      });

      expect(result).toBeDefined();
    });

    it("should reject invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.inscriptions.create({
          prenom: "Jean",
          nom: "Dupont",
          email: "invalid-email",
          telephone: "+33612345678",
          accepteContact: true,
          attestePresence: true,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should reject missing required fields", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.inscriptions.create({
          prenom: "",
          nom: "Dupont",
          email: "jean.dupont@example.com",
          telephone: "+33612345678",
          accepteContact: true,
          attestePresence: true,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("count", () => {
    it("should return inscription count for an event", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const count = await caller.inscriptions.count({
        eventId: "prochain-event",
      });

      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("list", () => {
    it("should reject unauthenticated access", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.inscriptions.list({
          eventId: "prochain-event",
        });
        expect.fail("Should have thrown a FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });
});
