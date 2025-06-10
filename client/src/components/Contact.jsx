import React from "react";

function Contact() {
  return (
    <>
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Contact
        </h1>
        <p className="text-lg mt-4 text-slate-600">We are a here to help.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
        <div>
          <h2 class="font-medium text-2xl text-gray-800">Contact Astroship</h2>
          <p class="text-lg leading-relaxed text-slate-500 mt-3">
            Have something to say? We are here to help. Fill up the form or send
            email or call phone.
          </p>
          <div class="mt-5">
            <div class="flex items-center mt-2 space-x-2 text-gray-600">
              <i class="fas fa-pin text-gray-400 w-4 h-4"></i>
              <span>1734 Sanfransico, CA 93063</span>
            </div>
            <div class="flex items-center mt-2 space-x-2 text-gray-600">
              <i class="fas fa-mail text-gray-400 w-4 h-4"></i>
              <a href="mailto:hello@astroshipstarter.com">
                hello@astroshipstarter.com
              </a>
            </div>
            <div class="flex items-center mt-2 space-x-2 text-gray-600">
              <i class="fas fa-phone text-gray-400 w-4 h-4"></i>
              <a href="tel:+1 (987) 4587 899">+1 (987) 4587 899</a>
            </div>
          </div>
        </div>
        <div>
          {/* unused */}
          <Contactform />
        </div>
      </div>
    </>
  );
}

export default Contact;
