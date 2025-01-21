import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-100">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-300">
            We’re here to answer your questions and provide the support you need. 
            Reach out to us anytime!
          </p>
        </div>

        {/* Contact Details and Map Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Location
              </h3>
              <p className="text-gray-300">
                123 Wellness Street, Health City, State, 56789
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-300">Phone: +1 234 567 890</p>
              <p className="text-gray-300">Email: info@clinicexample.com</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                Office Hours
              </h3>
              <p className="text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-300">Saturday: 10:00 AM - 3:00 PM</p>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345090937!2d-122.41941518468272!3d37.77492927975937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b91f0bdb%3A0xdeadbeefcafebabe!2s123%20Wellness%20Street%2C%20Health%20City!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
            Send Us a Message
          </h3>
          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-300 text-sm mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-300 text-sm mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg hover:from-teal-500 hover:to-green-500 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
