"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      const data = await res.json();
      console.log("Navbar data:", data);
      setUser(data.user);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  }
  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className=" px-6 py-4 flex items-center justify-between">
        <div className="flex item-center gap-2">
          <Image src="/logo1.jpg" alt="MedCore Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-teal-700">Medcore</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link
            href="/"
            className="hover:text-teal-700 hover:underline font-bold"
          >
            Home
          </Link>
          <Link
            href="/#features"
            className="hover:text-teal-700 hover:underline font-bold"
          >
            Features
          </Link>
          <Link
            href="/doctors"
            className="hover:text-teal-700 hover:underline font-bold"
          >
            Doctors
          </Link>
          <Link
            href="/about"
            className="hover:text-teal-700 hover:underline font-bold"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-teal-700 hover:underline font-bold"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-black hover:bg-gray-600 transition text-white px-6 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-black hover:bg-teal-700 transition text-white px-6 py-2 rounded-lg font-semibold"
              >
                Login
              </Link>
            )}
          </div>
          {user?.role === "patient" && (
            <Link
              href="/book-appointment"
              className="px-4 py-2 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 transition"
            >
              Book Appointment
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
