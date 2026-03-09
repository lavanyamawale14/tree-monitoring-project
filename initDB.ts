import { getDB } from "./db";

export async function initDB() {

  const db = await getDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS trees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      species TEXT,
      location TEXT,
      health TEXT
    )
  `);

}