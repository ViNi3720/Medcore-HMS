// app/api/update-appointment/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req) {
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

    // Step 2: sirf doctor hi status update kar sakta hai
    if (user.role !== "doctor") {
      return NextResponse.json(
        { message: "Only doctors can update status" },
        { status: 403 },
      );
    }

    // Step 3: frontend se appointment_id aur new_status lo
    const { appointment_id, new_status } = await req.json();
    if (!appointment_id || !new_status) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Step 4: doctors table se apni actual id nikalo (security check ke liye)
    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [user.id],
    );
    const doctorId = doctorResult.rows[0]?.id;

    // Step 5: status update karo, par sirf agar ye appointment usi doctor ki hai
    const result = await pool.query(
      "UPDATE appointments SET status = $1 WHERE id = $2 AND doctor_id = $3",
      [new_status, appointment_id, doctorId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Status updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
