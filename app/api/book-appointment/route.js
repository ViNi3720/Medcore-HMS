import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    //cookies se token find
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    //verify kro
    if (!token) {
      return NextResponse.json(
        { message: "Please login first" },
        { status: 401 },
      );
    }
    const user = jwt.verify(token.value, process.env.JWT_SECRET);
    //shirph patient se appoint ment book kr skta hia
    if (user.role !== "patient") {
      return NextResponse.json(
        { message: "Only Patient can book appointment" },
        { status: 403 },
      );
    }
    //frontend se data lo aur check kro
    const { doctor_id, appointment_date, time_slot, reason } = await req.json();
    if (!doctor_id || !appointment_date || !time_slot) {
      return NextResponse.json(
        { message: "All feilds are required" },
        { status: 400 },
      );
    }
    const patientResult = await pool.query(
      "SELECT id FROM patients WHERE user_id = $1",
      [user.id],
    );
    if (patientResult.rows.length === 0) {
      return NextResponse.json(
        { message: "Patient profile are not found" },
        { status: 404 },
      );
    }
    const patientId = patientResult.rows[0].id;
    await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, time_slot, reason)
       VALUES ($1, $2, $3, $4, $5)`,
      [patientId, doctor_id, appointment_date, time_slot, reason],
    );
    //success Responce
    return NextResponse.json(
      { message: "Appointment booked" },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
