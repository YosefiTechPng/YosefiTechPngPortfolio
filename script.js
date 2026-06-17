// YosefiTechPng — interactivity
// 1) Mobile nav toggle
// 2) Scroll reveal animations
// 3) Auto year in footer
// 4) WhatsApp integration (floating button + dynamic links)

// ============================================================
// WHATSAPP CONFIG — EDIT THESE TWO VALUES TO GO LIVE
// Number: international format, digits only, NO "+" or spaces.
// Example: '67500000000' for PNG (+675 000 0000)
// ============================================================
window.YTP_WHATSAPP = {

  number: '67581264827',
  message: '',

};

function buildWaUrl(customMessage) {

  const cfg = window.YTP_WHATSAPP || {};

  const num = (cfg.number || '').replace(/[^\d]/g, '');

  const msg = encodeURIComponent(customMessage || cfg.message || '');

  return `https://wa.me/${num}${msg ? `?text=${msg}` : ''}`;

}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');

  const links = document.querySelector('.nav-links');

  if (toggle && links) {

    toggle.addEventListener('click', () => links.classList.toggle('open'));

    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))

    );

  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      }

    });

  },
   { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
  
  // Footer year
  document.querySelectorAll('#year, .js-year').forEach(el => {

    el.textContent = new Date().getFullYear();

  });

  // Wire all WhatsApp links (anything with [data-wa])
  document.querySelectorAll('[data-wa]').forEach(el => {

    const msg = el.getAttribute('data-wa-message') || '';

    el.setAttribute('href', buildWaUrl(msg));

    el.setAttribute('target', '_blank');

    el.setAttribute('rel', 'noopener');

  });

  // Inject floating WhatsApp button on every page
  if (!document.querySelector('.wa-float')) {

    const a = document.createElement('a');
    
    a.className = 'wa-float';

    a.href = buildWaUrl();

    a.target = '_blank';

    a.rel = 'noopener';

    a.setAttribute('aria-label', 'Chat with us on WhatsApp');
    
    a.innerHTML = `
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path fill="#fff" d="M19.11 17.27c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM16.04 5.33c-5.91 0-10.71 4.8-10.71 10.71 0 1.89.5 3.74 1.44 5.37L5.34 26.67l5.42-1.42a10.66 10.66 0 0 0 5.28 1.39h.01c5.91 0 10.71-4.8 10.71-10.71S21.95 5.33 16.04 5.33zm0 19.62h-.01a8.9 8.9 0 0 1-4.54-1.24l-.33-.19-3.22.84.86-3.13-.21-.33a8.86 8.86 0 0 1-1.36-4.73c0-4.9 3.99-8.89 8.9-8.89 2.37 0 4.61.93 6.29 2.61a8.83 8.83 0 0 1 2.6 6.29c0 4.9-3.99 8.89-8.88 8.89z"/>
      </svg>
      <span>Chat</span>
    `;
    document.body.appendChild(a);
  }
});

const contactForm = document.getElementById("contactForm");

console.log("Form found:", contactForm);

if (contactForm) {

contactForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    console.log("Sending form data...");


    const formData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        business: document.getElementById("business").value,

        details: document.getElementById("details").value

    };


    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(formData)

        });


        console.log("API response:", response);


        if (response.ok) {

            alert("Thanks! Your message has been sent.");

            contactForm.reset();

        } else {

            alert("Something went wrong.");

        }


    } catch(error) {

        console.log(error);

        alert("Server error.");

    }

});

}