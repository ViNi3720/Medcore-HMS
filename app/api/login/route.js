import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    //fronted se email aur password lo
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All feilds are required" },
        { status: 400 },
      );
    }
    //user exist hai ke nhi ye check krna
    const existUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    //user nahi mila man le
    if (existUser.rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password " },
        { status: 401 },
      );
    }
    //user mil gya db mai to password compare
    const user = existUser.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    //match nhi hua tb
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password " },
        { status: 401 },
      );
    }
    //match ho gya to token set krte hai
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    const responce = NextResponse.json(
      {
        message: "Login Successfull",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    );
    // responce bn gya isko cokkies mai set kro
    responce.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });
    //ab bs responce return kr do
    return responce;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something is wrong" },
      { status: 500 },
    );
  }
}
