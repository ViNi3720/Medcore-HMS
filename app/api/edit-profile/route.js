// app/api/edit-profile/route.js
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

    // Step 2: frontend se aaya data lo
    const {
      name,
      phone,
      age,
      gender,
      address,
      blood_group,
      specialization,
      experience,
      availability,
    } = await req.json();

    // Step 3: role ke hisaab se sahi table update karo
    if (user.role === "patient") {
      await pool.query(
        `UPDATE patients
         SET name = $1, phone = $2, age = $3, gender = $4, address = $5, blood_group = $6
         WHERE user_id = $7`,
        [name, phone, age, gender, address, blood_group, user.id],
      );
    } else if (user.role === "doctor") {
      await pool.query(
        `UPDATE doctors
         SET name = $1, phone = $2, specialization = $3, experience = $4, availability = $5
         WHERE user_id = $6`,
        [name, phone, specialization, experience, availability, user.id],
      );
    }

    // Step 4: success response
    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
