/* MMGA Studio — GDPR cookie consent banner + gated Google Analytics loader.
   Included on every page. GA only loads after explicit "Accept all". */
(function () {
  var GA_ID = 'G-835821K3BT';
  var STORAGE_KEY = 'mmga_cookie_consent';
  var COOKIE_POLICY_URL = '/legal/cookie-policy.pdf';

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (window.__mmgaGaLoaded) return;
    window.__mmgaGaLoaded = true;
    window['ga-disable-' + GA_ID] = false;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function disableAnalytics() {
    window['ga-disable-' + GA_ID] = true;
    var names = ['_ga', '_gid', '_gat', '_ga_' + GA_ID.replace('G-', '')];
    names.forEach(function (name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname + ';';
    });
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.id = 'mmga-cookie-banner-styles';
    style.textContent =
      '#mmga-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:1000;' +
      'background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.08);' +
      'padding:24px 48px;transform:translateY(100%);opacity:0;pointer-events:none;' +
      'transition:transform 0.55s cubic-bezier(0.22,1,0.36,1),opacity 0.4s ease;}' +
      '#mmga-cookie-banner.visible{transform:translateY(0);opacity:1;pointer-events:auto;}' +
      '#mmga-cookie-banner .mmga-cc-inner{max-width:1200px;margin:0 auto;display:flex;' +
      'align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}' +
      '#mmga-cookie-banner .mmga-cc-text{flex:1 1 380px;font-family:"DM Sans",sans-serif;' +
      'font-size:13px;line-height:1.65;color:rgba(255,255,255,0.55);letter-spacing:0.01em;}' +
      '#mmga-cookie-banner .mmga-cc-text strong{color:rgba(255,255,255,0.9);font-weight:600;}' +
      '#mmga-cookie-banner .mmga-cc-text a{color:rgba(255,255,255,0.85);text-decoration:underline;' +
      'text-underline-offset:2px;transition:color 0.2s;}' +
      '#mmga-cookie-banner .mmga-cc-text a:hover{color:#fff;}' +
      '#mmga-cookie-banner .mmga-cc-actions{display:flex;gap:12px;flex-wrap:wrap;flex-shrink:0;}' +
      '#mmga-cookie-banner button{font-family:"DM Sans",sans-serif;cursor:pointer;font-size:12px;' +
      'font-weight:500;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;' +
      'padding:12px 22px;white-space:nowrap;' +
      'transition:background 0.22s ease,color 0.22s ease,border-color 0.22s ease,transform 0.22s cubic-bezier(0.22,1,0.36,1);}' +
      '#mmga-cookie-banner .mmga-cc-reject{background:transparent;color:rgba(255,255,255,0.65);' +
      'border:1px solid rgba(255,255,255,0.18);}' +
      '#mmga-cookie-banner .mmga-cc-reject:hover{color:#fff;border-color:rgba(255,255,255,0.4);transform:translateY(-1px);}' +
      '#mmga-cookie-banner .mmga-cc-accept{background:#fff;color:#0a0a0a;border:none;}' +
      '#mmga-cookie-banner .mmga-cc-accept:hover{background:rgba(255,255,255,0.88);transform:translateY(-1px);}' +
      '#mmga-cookie-banner button:focus-visible{outline:2px solid rgba(255,255,255,0.6);outline-offset:3px;}' +
      '@media (max-width:640px){' +
      '#mmga-cookie-banner{padding:20px 20px 24px;}' +
      '#mmga-cookie-banner .mmga-cc-inner{flex-direction:column;align-items:stretch;gap:18px;}' +
      '#mmga-cookie-banner .mmga-cc-actions{justify-content:stretch;}' +
      '#mmga-cookie-banner .mmga-cc-actions button{flex:1 1 auto;}' +
      '}';
    document.head.appendChild(style);
  }

  var bannerEl = null;
  function buildBanner() {
    var el = document.createElement('div');
    el.id = 'mmga-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML =
      '<div class="mmga-cc-inner">' +
        '<p class="mmga-cc-text"><strong>We value your privacy.</strong> We use cookies to run this site and, only with your consent, to measure traffic with Google Analytics. Read our <a href="' + COOKIE_POLICY_URL + '" target="_blank" rel="noopener">Cookie Policy</a>.</p>' +
        '<div class="mmga-cc-actions">' +
          '<button type="button" class="mmga-cc-reject">Reject non-essential</button>' +
          '<button type="button" class="mmga-cc-accept">Accept all</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector('.mmga-cc-accept').addEventListener('click', function () {
      setConsent('accepted');
      loadAnalytics();
      hideBanner();
    });
    el.querySelector('.mmga-cc-reject').addEventListener('click', function () {
      setConsent('rejected');
      disableAnalytics();
      hideBanner();
    });
    return el;
  }

  function showBanner() {
    if (!bannerEl) bannerEl = buildBanner();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bannerEl.classList.add('visible'); });
    });
  }
  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove('visible');
  }

  function init() {
    injectStyles();

    var consent = getConsent();
    if (consent === 'accepted') loadAnalytics();
    if (!consent) showBanner();

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (trigger) {
        e.preventDefault();
        showBanner();
      }
    });
  }

  init();
})();
