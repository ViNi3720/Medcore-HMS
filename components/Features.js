export default function Features() {
  //feature ko array mai store kr lete hai
  const features = [
    {
      icon: "📅",
      title: "Online Appointment Booking",
      desc: "Book appointments with doctors in just a few clicks.",
    },
    {
      icon: "👨‍⚕️",
      title: "Doctor Management",
      desc: "Manage doctor profiles, specializations, and availability.",
    },
    {
      icon: "📋",
      title: "Patient Records",
      desc: "Keep patient history and details organized and accessible.",
    },
    {
      icon: "📊",
      title: "Admin Dashboard",
      desc: "Get a complete overview of hospital operations at a glance.",
    },
  ];
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Our Features
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl hover:shadow-md transition"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
