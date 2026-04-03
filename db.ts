import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any;

export async function getDB() {
  if (!db) {
    db = await open({
      filename: "./trees.db",
      driver: sqlite3.Database,
    });

    // Create table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS trees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        health TEXT
      )
    `);
  }

  return db;
}
