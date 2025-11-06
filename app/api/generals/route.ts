import { NextResponse } from "next/server";
import { fetchAllDocsList } from "@/app/api/fetcher";

export async function GET() {
  try {
    const docs = await fetchAllDocsList();
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Failed to fetch docs:", error);
    return NextResponse.json([], { status: 500 });
  }
}
