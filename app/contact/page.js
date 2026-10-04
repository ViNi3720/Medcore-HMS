export default function Contact() {
  return (
    <div>
      <div className="max-w-5xl mx-auto bg-teal-700 text-white px-6 py-16 text-center">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-white leading-relaxed">
          Have a question or need help? Reach out to us — we're happy to assist.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 bg-teal-100 rounded-xl">
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="mt-1 text-gray-600">support@medcore.com</p>
          </div>
          <div className="p-6 bg-teal-100 rounded-xl">
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="mt-1 text-gray-600">+91 12345 67890</p>
          </div>

          <div className="p-6 bg-teal-100 rounded-xl">
            <h3 className="font-semibold text-gray-900">Address</h3>
            <p className="mt-1 text-gray-600">
              Ghaziabad, Uttar Pradesh, India
            </p>
          </div>
        </div>
        <form className="bg-white border rounded-xl p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              rows="4"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
