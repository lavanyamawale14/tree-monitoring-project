import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function getDB() {

  const db = await open({
    filename: "./trees.db",
    driver: sqlite3.Database
  });

  return db;

}