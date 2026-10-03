"use client";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookAppointment() {
  const router = useRouter();
  //doctor ke list stor krne ke liye hme ak arr type ka chahiyr
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");

  //doctor ko fetch kro useEffect lga ke
  useEffect(() => {
    async function fetchDoctors() {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data.doctors || []);
    }
    fetchDoctors();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!doctors || !date || !timeSlot) {
      alert("All feild are required");
      return;
    }

    const res = await fetch("/api/book-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctor_id: doctorId,
        appointment_date: date,
        time_slot: timeSlot,
        reason,
      }),
    });
    const data = await res.json();
    //success ke bad msg show aur return to login page
    if (res.ok) {
      alert("Your appointment is ready");
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Book New Appointment</h1>
      <form
        className="mt-8 bg-white p-6 border rounded-xl space-y-6 "
        onSubmit={handleSubmit}
      >
        {/* Doctor dropdown */}
        <div>
          <label className="text-sm text-gray-600">Select Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Time Slot</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          >
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Reason (optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
            rows="3"
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-emerald-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
