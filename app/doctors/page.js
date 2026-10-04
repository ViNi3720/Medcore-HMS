// app/doctors/page.js
import pool from "@/lib/db";

export default async function Doctors() {
  // database se saare doctors ki list nikalo
  const result = await pool.query(
    "SELECT id, name, specialization, experience FROM doctors",
  );
  const doctors = result.rows;

  return (
    <div>
      <div className="bg-teal-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold">Our Doctors</h1>
        <p className="mt-4 max-w-2xl mx-auto text-white leading-relaxed">
          Meet our team of experienced and dedicated doctors.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="p-6 border rounded-xl hover:shadow-md transition text-center"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full mx-auto flex items-center justify-center text-teal-700 font-bold text-xl">
                {doc.name?.charAt(0)}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Dr. {doc.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{doc.specialization}</p>
              <p className="mt-1 text-sm text-gray-500">
                {doc.experience} years experience
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
