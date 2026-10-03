// components/AppointmentActions.js
"use client"; // onClick use ho raha hai, isliye client component zaroori hai

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentActions({ appointmentId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // status update karne ka common function (Confirm aur Cancel dono ke liye use hoga)
  async function updateStatus(newStatus) {
    setLoading(true);

    const res = await fetch("/api/update-appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_id: appointmentId,
        new_status: newStatus,
      }),
    });

    setLoading(false);

    if (res.ok) {
      // page refresh karo taaki dashboard ka naya status dikhe
      router.refresh();
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <>
      <button
        onClick={() => updateStatus("confirmed")}
        disabled={loading}
        className="text-sm px-3 py-1 rounded-lg bg-teal-700 text-white hover:bg-teal-800"
      >
        Confirm
      </button>
      <button
        onClick={() => updateStatus("cancelled")}
        disabled={loading}
        className="text-sm px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Cancel
      </button>
    </>
  );
}
