import { NextResponse } from "next/server";
import { getDB } from "../../../lib/db";

export async function GET() {

  const db = await getDB();

  const trees = await db.all("SELECT * FROM trees");

  return NextResponse.json(trees);

}