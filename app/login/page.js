"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // api fetch
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("Loging succesfull", data);
      window.location.href = "/dashboard"; // ya jo bhi page bnna hai aage chl ke
    } else {
      alert(data.message);
    }
  }
  return (
    <div className="max-h-screen flex item-center justify-center bg-gray-50">
      <div className="bg-white p-16 rounded-xl shadow-lg w-full max-w-md mt-18">
        <p className="text-sm font-bold text-gray-700 mb-6">
          Please enter your details
        </p>
        <h1 className="text-3xl font-bold text-center mb-15">Welcome back</h1>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transation duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
