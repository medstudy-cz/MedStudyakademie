import { NextRequest, NextResponse } from "next/server";

/** Lightweight analytics sink used by the quiz UI (no persistence yet). */
export async function POST(req: NextRequest) {
  try {
    await req.json();
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
