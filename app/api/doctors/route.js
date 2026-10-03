import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    //doctor table se sari chiz nikale pool use kr ke
    const result = await pool.query(
      "SELECT id, name, specialization FROM doctors",
    );
    return NextResponse.json({ doctors: result.rows }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
