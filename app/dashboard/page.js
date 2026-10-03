import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import AppointmentActions from "@/components/AppointmentActions";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let user = null;

  if (token) {
    try {
      user = jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (err) {
      user = null;
    }
  }
  console.log(user);
  // user varify ho gya
  // user verify hone ke baad, return se pehle:

  let appointments = [];

  if (user?.role === "patient") {
    // pehle patients table se apni actual id nikalo
    const patientResult = await pool.query(
      "SELECT id FROM patients WHERE user_id = $1",
      [user.id],
    );
    const patientId = patientResult.rows[0]?.id;

    if (patientId) {
      const result = await pool.query(
        `SELECT appointments.*, doctors.name AS doctor_name
       FROM appointments
       JOIN doctors ON appointments.doctor_id = doctors.id
       WHERE appointments.patient_id = $1`,
        [patientId],
      );
      appointments = result.rows;
    }
  }
  // doctor ke liye
  let doctorAppointments = [];

  if (user?.role === "doctor") {
    // pehle doctors table se apni actual id nikalo
    const doctorResult = await pool.query(
      "SELECT id FROM doctors WHERE user_id = $1",
      [user.id],
    );
    const doctorId = doctorResult.rows[0]?.id;

    if (doctorId) {
      const result = await pool.query(
        `SELECT appointments.*, patients.name AS patient_name
       FROM appointments
       JOIN patients ON appointments.patient_id = patients.id
       WHERE appointments.doctor_id = $1`,
        [doctorId],
      );
      doctorAppointments = result.rows;
    }
  }
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user?.name}!
      </h1>
      {user?.role === "patient" && (
        <div>
          <Link
            href="/book-appointment"
            className="inline-block mt-4 bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800"
          >
            Book New Appointment
          </Link>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Appointments
            </h2>
            <div className="mt-4 space-y-3">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      Dr. {appt.doctor_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(appt.appointment_date).toLocaleDateString()} -{" "}
                      {appt.time_slot}
                    </p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-teal-50 text-teal-700">
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            <div className="mt-4 border rounded-lg p-4 space-y-2">
              <p>
                <span className="text-gray-600">Name:</span>
                {user?.name}
              </p>
              <p>
                <span className="text-gray-600">Email:</span> {user?.email}
              </p>
              <p>
                <span className="text-gray-600">Phone:</span> 1234567890
              </p>
              <Link
                href="/edit-profile"
                className="mt-2 text-teal-700 font-medium hover:underline"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      {user?.role === "doctor" && (
        <div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Today's Appointments
            </h2>
            <div className="mt-4 space-y-3">
              {doctorAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {appt.patient_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(appt.appointment_date).toLocaleDateString()}—{" "}
                      {appt.time_slot}
                    </p>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-teal-50 text-teal-700">
                    {appt.status}
                  </span>
                  {appt.status === "pending" && (
                    <AppointmentActions appointmentId={appt.id} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            <div className="mt-4 border rounded-lg p-4 space-y-2">
              <p>
                <span className="text-gray-600">Name:</span> {user?.name}
              </p>
              <p>
                <span className="text-gray-600">Specialization:</span>{" "}
                Specialization
              </p>
              <p>
                <span className="text-gray-600">Email:</span>
                {user?.email}
              </p>
              <Link
                href="/edit-profile"
                className="mt-2 text-teal-700 font-medium hover:underline"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
