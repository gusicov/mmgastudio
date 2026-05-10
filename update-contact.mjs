import { readFileSync, writeFileSync } from 'fs';

const PROJECT_PAGES = [
  'residentialcomplex1.html',
  'residentialcomplex2.html',
  'residentialcomplex3.html',
  'privatehouse1.html',
  'privatehouse2.html',
  'privatehouse3.html',
  'privatehouse4.html',
  'privatehouse5.html',
  'industrial.html',
  'interiordesign.html',
  'kindergarten.html',
  'industrialhall2.html',
];

const CONTACT_CSS = `
    /* ── Contact Section ── */
    .project-contact {
      background: #0a0a0a;
      padding: 112px 48px;
    }
    .project-contact .contact-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 96px;
      align-items: start;
    }
    .project-contact .section-label-white {
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      font-weight: 500;
    }
    .project-contact .contact-heading {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(64px, 8vw, 128px);
      line-height: 0.9;
      letter-spacing: -0.02em;
      color: white;
      margin-top: 16px;
    }
    .project-contact .contact-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.4);
      line-height: 1.75;
      font-weight: 300;
      margin-top: 24px;
      max-width: 340px;
    }
    .project-contact .contact-detail {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .project-contact .contact-detail a {
      font-size: 15px;
      color: rgba(255,255,255,0.72);
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .project-contact .contact-detail a:hover { color: white; }
    .project-contact .contact-detail a span {
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.45);
      width: 100px;
      flex-shrink: 0;
    }
    .project-contact .form-group { margin-bottom: 16px; }
    .project-contact .form-input {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 3px;
      padding: 16px 20px;
      color: white;
      width: 100%;
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 300;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
      -webkit-font-smoothing: antialiased;
    }
    .project-contact .form-input::placeholder { color: rgba(255,255,255,0.45); }
    .project-contact .form-input:focus {
      border-color: rgba(255,255,255,0.28);
      background: rgba(255,255,255,0.08);
    }
    .project-contact textarea.form-input {
      resize: none;
      min-height: 160px;
    }
    .project-contact .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .project-contact .form-submit {
      width: 100%;
      padding: 18px;
      background: white;
      color: #0a0a0a;
      border: none;
      border-radius: 3px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      margin-top: 8px;
      transition: opacity 0.2s, transform 0.15s;
    }
    .project-contact .form-submit:hover { opacity: 0.9; }
    .project-contact .form-submit:active { transform: scale(0.99); }
    /* Scroll reveal for contact */
    .project-contact .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .project-contact .reveal.visible { opacity: 1; transform: none; }
    @media (max-width: 768px) {
      .project-contact { padding: 64px 20px; }
      .project-contact .contact-inner { grid-template-columns: 1fr; gap: 44px; }
      .project-contact .contact-sub { max-width: 100%; }
      .project-contact .form-row { grid-template-columns: 1fr; gap: 0; }
    }`;

const CONTACT_HTML = `

<!-- ────────────────── CONTACT ────────────────── -->
<section class="project-contact">
  <div class="contact-inner">
    <div class="contact-left reveal">
      <div class="section-label-white">Get in touch</div>
      <h2 class="contact-heading">Let's<br/>talk</h2>
      <p class="contact-sub">Tell us about your project. We'll get back to you within 24 hours with an initial scope and quote.</p>
      <div class="contact-detail">
        <a href="mailto:office@mmgastudio.com">
          <span>Email</span>
          office@mmgastudio.com
        </a>
        <a href="tel:+40724132413">
          <span>Phone</span>
          +40 724 132 413
        </a>
        <a href="tel:+17138709353">
          <span></span>
          +1 713 870 9353
        </a>
        <div style="font-size:15px;color:rgba(255,255,255,0.72);letter-spacing:0.02em;display:flex;align-items:center;gap:10px;">
          <span style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.45);width:100px;flex-shrink:0;">Available</span>
          Worldwide
        </div>
      </div>
    </div>
    <div class="reveal">
      <form id="contact-form" action="https://formspree.io/f/xwvrjjoz" method="POST">
        <div class="form-row">
          <div class="form-group">
            <input class="form-input" type="text" name="first_name" placeholder="First name" required />
          </div>
          <div class="form-group">
            <input class="form-input" type="text" name="last_name" placeholder="Last name" required />
          </div>
        </div>
        <div class="form-group">
          <input class="form-input" type="email" name="email" placeholder="Email address" required />
        </div>
        <div class="form-group">
          <input class="form-input" type="text" name="project_type" placeholder="Project type (e.g. Residential exterior)" />
        </div>
        <div class="form-group">
          <textarea class="form-input" name="message" placeholder="Tell us about your project..."></textarea>
        </div>
        <button class="form-submit" type="submit">Send Message</button>
      </form>
      <div id="form-success" style="display:none; margin-top:24px; padding:20px 24px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.85); font-size:14px; letter-spacing:0.04em; line-height:1.6;">
        Thank you — we'll get back to you within 24 hours.
      </div>
    </div>
  </div>
</section>

`;

const CONTACT_JS = `
<script>
  // Contact form — Formspree AJAX submit
  (function() {
    var contactForm = document.getElementById('contact-form');
    var formSuccess = document.getElementById('form-success');
    if (!contactForm) return;
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.form-submit');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      try {
        var res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.style.display = 'none';
          formSuccess.style.display = 'block';
        } else {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          alert('Something went wrong. Please try again.');
        }
      } catch(err) {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again.');
      }
    });
    // Scroll reveal for contact section
    var revealEls = document.querySelectorAll('.project-contact .reveal');
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          var idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * 0.12) + 's';
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el) { revealObs.observe(el); });
  })();
</script>
`;

// Footer comment variants found in project pages
const FOOTER_MARKERS = [
  '<!-- Footer -->\n<footer',
  '<!-- ────────────────── FOOTER ────────────────── -->\n\n<footer',
  '<!-- ────────────────── FOOTER ────────────────── -->\n<footer',
];

let updated = 0;
let skipped = 0;

for (const file of PROJECT_PAGES) {
  let html = readFileSync(file, 'utf8');

  // Skip if already has contact section
  if (html.includes('project-contact')) {
    console.log(`SKIP (already has contact): ${file}`);
    skipped++;
    continue;
  }

  // 1. Add CSS before closing </style> of the first <style> block
  const styleCloseIdx = html.indexOf('</style>');
  if (styleCloseIdx === -1) {
    console.log(`WARN: no </style> found in ${file}`);
    continue;
  }
  html = html.slice(0, styleCloseIdx) + CONTACT_CSS + '\n  ' + html.slice(styleCloseIdx);

  // 2. Insert contact HTML before the footer
  let inserted = false;
  for (const marker of FOOTER_MARKERS) {
    if (html.includes(marker)) {
      html = html.replace(marker, CONTACT_HTML + marker);
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    // Fallback: insert before <footer
    const footerIdx = html.indexOf('<footer');
    if (footerIdx !== -1) {
      html = html.slice(0, footerIdx) + CONTACT_HTML + html.slice(footerIdx);
      inserted = true;
    }
  }
  if (!inserted) {
    console.log(`WARN: could not find footer insertion point in ${file}`);
    continue;
  }

  // 3. Add JS before </body>
  html = html.replace('</body>', CONTACT_JS + '</body>');

  writeFileSync(file, html, 'utf8');
  console.log(`UPDATED: ${file}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
