import React, {useEffect} from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl text-center text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have a question, feedback, or collaboration idea? We"d love to hear
          from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-(--color-primary) text-2xl" />
              <div>
                <h4 className="text-lg font-medium text-(--color-primary)">
                  Phone
                </h4>
                <p className="text-gray-600">+91 82107 57108</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-(--color-primary) text-2xl" />
              <div>
                <h4 className="text-lg font-medium text-(--color-primary)">
                  Email
                </h4>
                <p className="text-gray-600">mahankari.hyd@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-(--color-primary) text-2xl" />
              <div>
                <h4 className="text-lg font-medium text-(--color-primary)">
                  Address
                </h4>
                <p className="text-gray-600">Manikonda, Hyderabad, India</p>
              </div>
            </div>

            <div className="mt-6">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15223.206364309992!2d78.352053!3d17.4146628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9422532fb3f7%3A0xc793fad03d2e2af1!2sManikonda%2C%20Telangana!5e0!3m2!1sen!2sin!4v1731142560000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-sm"
              ></iframe>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-(--color-primary) hover:bg-(--color-topbar) text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
