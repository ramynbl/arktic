import { eq, inArray, count as sqlCount } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { inscriptions, InsertInscription } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Inscription queries
export async function createInscription(data: InsertInscription) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(inscriptions).values(data);
  return result;
}

export async function getInscriptions(eventId: string = "prochain-event") {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return db.select().from(inscriptions).where(eq(inscriptions.eventId, eventId));
}

export async function getInscriptionCount(eventId: string = "prochain-event") {
  const db = await getDb();
  if (!db) {
    return 0;
  }

  const result = await db
    .select({ value: sqlCount() })
    .from(inscriptions)
    .where(eq(inscriptions.eventId, eventId));
  return result[0]?.value ?? 0;
}

export async function deleteInscription(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(inscriptions).where(eq(inscriptions.id, id));
}

export async function deleteManyInscriptions(ids: number[]) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(inscriptions).where(inArray(inscriptions.id, ids));
}

export async function deleteAllInscriptions(eventId: string = "prochain-event") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.delete(inscriptions).where(eq(inscriptions.eventId, eventId));
}
