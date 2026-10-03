"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  //common feild
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // patient-only fields
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  // doctor-only fields
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");

  //  jb tk data fetch na ho tb tak form na dikhe
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      const data = await res.json();

      setRole(data.role);
      setName(data.name || "");
      setPhone(data.phone || "");
      setAge(data.age || "");
      setGender(data.gender || "");
      setAddress(data.address || "");
      setBloodGroup(data.blood_group || "");
      setSpecialization(data.specialization || "");
      setExperience(data.experience || "");
      setAvailability(data.availability || "");

      setLoading(false);
    }
    fetchProfile();
  }, []);

  // Step 2: submit hone pe updated data backend ko bhejo
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/edit-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        age,
        gender,
        address,
        blood_group: bloodGroup,
        specialization,
        experience,
        availability,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Something went wrong");
    }
  }

  // data fetch hone tak loading dikhao
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  return (
    <div className="max-w-2xl mx-auto px-6 py-1-">
      <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white p-6 border rounded-xl space-y-4"
      >
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {role === "patient" && (
          <>
            <div>
              <label className="text-sm text-gray-600">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Blood Group</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </>
        )}

        {role === "doctor" && (
          <>
            <div>
              <label className="text-sm text-gray-600">Specialization</label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Experience (years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Availability</label>
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="e.g. Mon-Fri, 10am-5pm"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
