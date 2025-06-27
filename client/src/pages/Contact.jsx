import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Contact</h1>
        <p className="text-slate-300 text-lg mb-10">
          Have thoughts, suggestions, or want to say hi? Even though the creator
          is anonymous, your message still matters.
        </p>

        <form className="space-y-6 text-left">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Type your message here..."
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-md text-white font-semibold"
          >
            Send Message
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-10 italic">
          Note: Replies might take a while — the creator prefers code over
          chatter.
        </p>
      </div>
    </div>
  );
}

export default Contact;
