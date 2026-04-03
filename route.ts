import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

// 👉 GET: Fetch all trees
export async function GET() {
  try {
    const db = await getDB();

    const trees = await db.all("SELECT * FROM trees");

    return NextResponse.json(trees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trees" },
      { status: 500 }
    );
  }
}

// 👉 POST: Add new tree
export async function POST(req: Request) {
  try {
    const db = await getDB();

    const body = await req.json();
    const { name, location, health } = body;

    // basic validation
    if (!name || !location || !health) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await db.run(
      "INSERT INTO trees (name, location, health) VALUES (?, ?, ?)",
      [name, location, health]
    );

    return NextResponse.json({
      message: "Tree added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add tree" },
      { status: 500 }
    );
  }
}
