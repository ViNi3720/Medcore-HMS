import Image from "next/image";

export default function About() {
  return (
    <div>
      <div className="max-w-5xl mx-auto bg-teal-700 px-6 py-16">
        <h1 className="text-4xl font-bold  text-center">About MedCore</h1>
        <p className="mt-4 max-w-2xl mx-auto text-teal-50 leading-relaxed">
          MedCore is a Hospital Management System designed to streamline
          hospital operations and improve patient care. It helps manage
          patients, doctors, appointments, medical records, and other hospital
          activities efficiently. The system aims to reduce manual work, improve
          accessibility of healthcare information, and provide a better
          experience for both patients and healthcare staff.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-teal-50 rounded-xl">
            <p className="text-3xl font-bold text-teal-700">500+</p>
            <p className="mt-1 text-sm text-gray-600">Patients</p>
          </div>
          <div className="text-center p-6 bg-teal-50 rounded-xl">
            <p className="text-3xl font-bold text-teal-700">50+</p>
            <p className="mt-1 text-sm text-gray-600">Doctors</p>
          </div>
          <div className="text-center p-6 bg-teal-50 rounded-xl">
            <p className="text-3xl font-bold text-teal-700">10+</p>
            <p className="mt-1 text-sm text-gray-600">Departments</p>
          </div>
          <div className="text-center p-6 bg-teal-50 rounded-xl">
            <p className="text-3xl font-bold text-teal-700">24/7</p>
            <p className="mt-1 text-sm text-gray-600">Support</p>
          </div>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              We believe healthcare management shouldn't be complicated. MedCore
              brings patients and doctors onto one platform, making appointments
              faster and records easier to access — for everyone involved.
            </p>
          </div>
          <Image
            src="/doc.webp"
            alt="MedCore Hospital"
            width={500}
            height={300}
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
