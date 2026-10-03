import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl max-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* left mai heading jo p tag mai hoga */}
      <div className="flex-1 pl-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight">
          Smart Hospital{" "}
          <span className="text-teal-700">Management System</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Manage patients, doctors, and appointments — all in one place, simple
          and fast.
        </p>
        {/* ab 2 button create kr dete hai */}
        <div className="mt-6 flex gap-4">
          <Link
            href="/book"
            className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
          >
            Book Appointment
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
          >
            Learn More
          </Link>
        </div>
      </div>
      {/*right side mai doctor waka image lga dete hai */}
      <div className="flex-1 flex justify-end">
        <Image
          src="/doctor.jpg"
          alt="Doctor"
          width={700}
          height={700}
          className="rounded-xl -mr-20"
        />
      </div>
    </section>
  );
}
