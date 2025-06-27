import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#776eb8] to-[#8caeff] py-16 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to WebBlog</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          A digital space where thoughts take shape, stories come alive, and
          voices remain timeless — even when they're anonymous.
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 border-b border-slate-700 pb-2">
          Our Vision
        </h2>
        <p className="text-lg text-slate-300 mb-6">
          WebBlog was born from a simple idea: create a platform that respects
          content over clout. No ads, no noise, no follower counts — just pure
          expression.
        </p>
        <p className="text-lg text-slate-400">
          Built for developers, writers, and thinkers who prefer simplicity and
          speed. Publish your ideas freely. Read without distractions.
        </p>
      </section>

      {/* Features or Values */}
      <section className="bg-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Minimal by Design</h3>
            <p className="text-slate-400">
              Focused on clarity, readability, and content-first design.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Fast & Lightweight</h3>
            <p className="text-slate-400">
              Optimized for performance — no unnecessary bloat.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Open to All</h3>
            <p className="text-slate-400">
              For creators who want to write freely, with or without an
              audience.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Built with ❤️</h3>
            <p className="text-slate-400">
              Maintained by one anonymous — silently shaping digital creativity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
