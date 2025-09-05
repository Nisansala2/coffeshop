import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Coffee from "../../../models/Coffee";

export async function GET(_: Request, { params }: any) {
  await connectDB();
  const item = await Coffee.findById(params.id);
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const data = await req.json();
  const updated = await Coffee.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  await connectDB();
  await Coffee.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
