import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";

import Coffee from "../../models/Coffee";

export async function GET() {
  try {
    await connectDB();
    const items = await Coffee.find({});
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newItem = await Coffee.create(data);
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
