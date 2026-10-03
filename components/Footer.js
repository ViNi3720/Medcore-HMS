import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/*logo aur short description */}
        <div>
          <span className="text-2xl font-bold uppercase tracking-widest font-serif">
            MedCore
          </span>
          <p className="mt-3 text-gray-400 text-lg">
            Simple and reliable hospital management system for better patient
            care.
          </p>
        </div>
        {/* link stablish krte hai  */}
        <div className="mt-3 space-y-2 text-lg flex flex-col">
          <h4 className="text-white font-bold">Quick Links</h4>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>

        {/*contact info dal de */}
        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-lg text-gray-400">
            <li>Email: nitya3720@gmail.com</li>
            <li>Phone:+91 9569883050</li>
            <li>Address: Ghaziabad Uttar Pradesh</li>
          </ul>
        </div>
      </div>

      {/* Copyright line */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2026 MedCore. All rights reserved.
      </div>
    </footer>
  );
}
