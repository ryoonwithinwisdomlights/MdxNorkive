import { NextResponse } from "next/server";
import { fetchAllRecordList } from "@/app/api/fetcher";

export async function GET() {
  try {
    const records = await fetchAllRecordList();
    return NextResponse.json(records);
  } catch (error) {
    console.error("Failed to fetch records:", error);
    return NextResponse.json([], { status: 500 });
  }
}
