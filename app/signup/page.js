"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // ab backend se api fetch krte hai
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    //success ke bad msg show aur return to login page
    if (res.ok) {
      alert("Account created successfully !Please login");
      router.push("/login");
    } else {
      alert(data.message);
    }
  }
  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-50">
      <div className="bg-white p-16 rounded-xl shadow-lg w-[550px]">
        <p className="text-sm font-bold text-gray-700 mb-6">
          Please enter your details
        </p>
        <h1 className="text-3xl font-bold text-center mb-15">
          Create Your Account
        </h1>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
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
          <input
            type="password"
            placeholder="Conferm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:border-black"
          />
          <div className="mt-4">
            <label className="text-sm text-gray-600">Role</label>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Patient
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Doctor
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition duration-300 cursor-pointer"
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Alredy have an account?{" "}
          <Link
            href="/login"
            className="text-black font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
