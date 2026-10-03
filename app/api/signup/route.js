import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    //fronted se data late hai
    const { name, email, password, role } = await request.json();
    //check feild empty to nhi hai
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fiels are required" },
        { status: 400 },
      );
    }
    //check krte hai ke phle se koi user to exist nhi kr rha ha same email se
    const existingUser = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email],
    );
    //user exist
    if (existingUser.rows.lenght > 0) {
      return NextResponse.json(
        { message: "user alredy exist" },
        { status: 409 },
      );
    }
    // user nahi hai tb password hash kro aur database mai data save kro
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users(name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role",
      [name, email, hashedPassword, role],
    );

    const newUser = result.rows[0];
    if (role === "patient") {
      await pool.query("INSERT INTO patients(user_id, name) VALUES ($1, $2)", [
        newUser.id,
        name,
      ]);
    } else if (role === "doctor") {
      await pool.query("INSERT INTO doctors(user_id, name) VALUES ($1, $2)", [
        newUser.id,
        name,
      ]);
    }

    // ab bs success ka responce return kr de
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
