// app/api/profile/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Step 1: cookie se token nikalo aur verify karo
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 },
      );
    }
    const user = jwt.verify(token.value, process.env.JWT_SECRET);

    // Step 2: role ke hisaab se sahi table se data nikalo
    if (user.role === "patient") {
      const result = await pool.query(
        "SELECT name, phone, age, gender, address, blood_group FROM patients WHERE user_id = $1",
        [user.id],
      );
      return NextResponse.json(
        { role: "patient", ...result.rows[0] },
        { status: 200 },
      );
    } else if (user.role === "doctor") {
      const result = await pool.query(
        "SELECT name, phone, specialization, experience, availability FROM doctors WHERE user_id = $1",
        [user.id],
      );
      return NextResponse.json(
        { role: "doctor", ...result.rows[0] },
        { status: 200 },
      );
    }

    return NextResponse.json({ message: "Invalid role" }, { status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
