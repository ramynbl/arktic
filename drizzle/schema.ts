import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Inscriptions table for event registrations
export const inscriptions = mysqlTable("inscriptions", {
  id: int("id").autoincrement().primaryKey(),
  prenom: varchar("prenom", { length: 255 }).notNull(),
  nom: varchar("nom", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telephone: varchar("telephone", { length: 20 }).notNull(),
  accepteContact: int("accepteContact").default(0).notNull(),
  attestePresence: int("attestePresence").default(0).notNull(),
  eventId: varchar("eventId", { length: 64 }).default("prochain-event").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inscription = typeof inscriptions.$inferSelect;
export type InsertInscription = typeof inscriptions.$inferInsert;