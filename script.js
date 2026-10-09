/* =========================================================
   SKYBRIDGE AG TRAVELS: MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- MOBILE MENU ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  /* =========================================================
     PACKAGES: data, modal, filter
     ========================================================= */
  (function () {
    "use strict";

    var packageData = {
      france: {
        country: "🇫🇷 FRANCE", title: "Paris & French Riviera", location: "France", days: "7 Days", rating: "4.9",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
        description: "Experience the elegance of France with the romance of Paris, charming French streets, beautiful coastal towns and unforgettable cuisine.",
        places: ["Eiffel Tower", "Louvre Museum", "Champs-Élysées", "Nice", "Monaco", "French Riviera"]
      },
      switzerland: {
        country: "🇨🇭 SWITZERLAND", title: "Swiss Alps Escape", location: "Switzerland", days: "7 Days", rating: "4.9",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85",
        description: "Explore the breathtaking Swiss Alps, peaceful lakes, charming villages and some of Europe's most scenic mountain landscapes.",
        places: ["Zurich", "Lucerne", "Interlaken", "Jungfraujoch", "Zermatt", "Lake Geneva"]
      },
      italy: {
        country: "🇮🇹 ITALY", title: "Rome & Amalfi Coast", location: "Italy", days: "8 Days", rating: "4.8",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85",
        description: "Discover ancient history, beautiful architecture, authentic Italian food and the spectacular landscapes of the Amalfi Coast.",
        places: ["Rome", "Colosseum", "Vatican City", "Florence", "Positano", "Amalfi Coast"]
      },
      japan: {
        country: "🇯🇵 JAPAN", title: "Tokyo & Kyoto", location: "Japan", days: "8 Days", rating: "4.9",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
        description: "Experience the contrast of modern Tokyo and traditional Kyoto with ancient temples, Japanese gardens and vibrant city life.",
        places: ["Tokyo", "Kyoto", "Mount Fuji", "Fushimi Inari", "Arashiyama", "Shibuya"]
      },
      uae: {
        country: "🇦🇪 UNITED ARAB EMIRATES", title: "Dubai & Abu Dhabi", location: "UAE", days: "5 Days", rating: "4.7",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
        description: "Explore futuristic skylines, desert landscapes, luxury experiences and the rich cultural heritage of the United Arab Emirates.",
        places: ["Burj Khalifa", "Dubai Marina", "Palm Jumeirah", "Desert Safari", "Abu Dhabi", "Sheikh Zayed Mosque"]
      },
      thailand: {
        country: "🇹🇭 THAILAND", title: "Thailand Island Escape", location: "Thailand", days: "6 Days", rating: "4.8",
        image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
        description: "Relax on tropical beaches, explore beautiful islands and experience the colourful culture and incredible food of Thailand.",
        places: ["Bangkok", "Phuket", "Phi Phi Islands", "Krabi", "Koh Samui", "Patong Beach"]
      }
    };

    var lastFocused = null;
    function byId(id) { return document.getElementById(id); }
    function setText(id, value) { var el = byId(id); if (el) el.textContent = value; }

    function openPackage(key) {
      var info = packageData[key];
      var modal = byId("packageModal");
      if (!info) { console.error("Package not found:", key); return; }
      if (!modal) { console.error("#packageModal is missing from the HTML."); return; }

      var img = byId("modalImage");
      if (img) { img.src = info.image; img.alt = info.title; }

      setText("modalCountry", info.country);
      setText("modalTitle", info.title);
      setText("modalDescription", info.description);
      setText("modalDays", info.days);
      setText("modalRating", info.rating);
      setText("modalLocation", info.location);

      var places = byId("modalPlaces");
      if (places) {
        places.innerHTML = "";
        info.places.forEach(function (place) {
          var chip = document.createElement("span");
          chip.className = "modal-place";
          chip.textContent = place;
          places.appendChild(chip);
        });
      }

      lastFocused = document.activeElement;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");

      var closeBtn = modal.querySelector(".package-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function closePackage() {
      var modal = byId("packageModal");
      if (!modal) return;
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function applyFilter(filter) {
      document.querySelectorAll(".package-card").forEach(function (card) {
        card.hidden = !(filter === "all" || card.dataset.region === filter);
      });
    }

    document.addEventListener("click", function (event) {
      var openBtn = event.target.closest("[data-package]");
      if (openBtn) { event.preventDefault(); openPackage(openBtn.dataset.package); return; }

      if (event.target.closest("[data-close]")) { closePackage(); return; }

      var filterBtn = event.target.closest(".country-filter");
      if (filterBtn) {
        document.querySelectorAll(".country-filter").forEach(function (b) { b.classList.remove("active"); });
        filterBtn.classList.add("active");
        applyFilter(filterBtn.dataset.filter);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePackage();
    });

    window.openPackage = openPackage;
    window.closePackage = closePackage;
  })();

  /* =========================================================
     PACKAGES SHOW / HIDE
     Hidden until "View all destinations", a destination card,
     or any link to #packages is clicked.
     Uses only: .packages, .ds-all, .ds-card, .ds-top,
     .country-filter, #packages, #destinations
     ========================================================= */
  (function () {
    "use strict";

    var packages = document.getElementById("packages");
    if (!packages) return;

    var toggle = document.querySelector(".ds-all");   /* the "View all destinations" link */

    /* swap the button text: "View all destinations" <-> "Hide all destinations" */
    function updateButton() {
      if (!toggle) return;
      var open = !packages.hidden;
      var arrow = toggle.querySelector("span");
      var textNode = toggle.firstChild;               /* the text before the arrow */
      if (textNode && textNode.nodeType === 3) {
        textNode.nodeValue = open ? "Hide all destinations " : "View all destinations ";
      }
      if (arrow) arrow.textContent = open ? "\u2191" : "\u2192";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function regionOf(link) {
      var tag = link.querySelector(".ds-top span:last-child");
      var text = tag ? tag.textContent.trim().toLowerCase() : "";
      return text === "europe" || text === "asia" ? text : "all";
    }

    function filterBy(region) {
      var btn = packages.querySelector('.country-filter[data-filter="' + region + '"]');
      if (btn) btn.click();
    }

    function openPackages(region) {
      packages.hidden = false;
      filterBy(region || "all");
      updateButton();
      packages.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function closePackages() {
      packages.hidden = true;
      updateButton();
      var dest = document.getElementById("destinations");
      if (dest) dest.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href="#packages"]');
      if (!link) return;
      e.preventDefault();

      /* the toggle button: show when hidden, hide when shown */
      if (link.classList.contains("ds-all")) {
        if (packages.hidden) openPackages("all");
        else closePackages();
        return;
      }

      /* cards, nav, hero and footer links always show packages */
      openPackages(link.classList.contains("ds-card") ? regionOf(link) : null);
    });

    if (location.hash === "#packages") packages.hidden = false;
    updateButton();
  })();

  /* ---------- SEARCH (runs only if #searchBtn exists) ---------- */
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const styleSelect = document.getElementById("styleSelect");

  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const packageCards = Array.from(document.querySelectorAll(".package-card"));
      const filterButtons = Array.from(document.querySelectorAll(".country-filter"));
      const destination = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const style = styleSelect ? styleSelect.value.trim().toLowerCase() : "";
      let shown = 0;

      packageCards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const show = (!destination || text.includes(destination)) &&
                     (!style || style === "any experience" || text.includes(style));
        card.style.display = show ? "" : "none";
        if (show) shown++;
      });

      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      const allFilter = document.querySelector('.country-filter[data-filter="all"]');
      if (allFilter) allFilter.classList.add("active");

      const packagesSection = document.getElementById("packages");
      if (packagesSection) {
        packagesSection.hidden = false;
        packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (shown === 0) {
        packageCards.forEach(function (card) { card.style.display = ""; });
        setTimeout(function () {
          alert("No exact match found. Showing all curated packages.");
        }, 300);
      }
    });
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  let testimonialIndex = 0;
  const testimonials = Array.from(document.querySelectorAll(".testimonial"));

  function showTestimonial(index) {
    if (testimonials.length === 0) return;
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach(function (item, i) {
      item.classList.toggle("active", i === testimonialIndex);
    });
  }

  const nextButton = document.querySelector(".next");
  const previousButton = document.querySelector(".prev");
  if (nextButton) nextButton.addEventListener("click", function () { showTestimonial(testimonialIndex + 1); });
  if (previousButton) previousButton.addEventListener("click", function () { showTestimonial(testimonialIndex - 1); });
  if (testimonials.length > 1) setInterval(function () { showTestimonial(testimonialIndex + 1); }, 6500);

  /* ---------- BOOKING FORM (WEB3FORMS) ---------- */
  const bookingForm = document.getElementById("bookingForm");
  const formMessage = document.getElementById("formMessage");
  const bookingSubmit = document.getElementById("bookingSubmit");
  const submitText = document.getElementById("submitText");
  const submitArrow = document.getElementById("submitArrow");

  function resetSubmit() {
    bookingSubmit.disabled = false;
    if (submitText) submitText.textContent = "Send travel enquiry";
    if (submitArrow) submitArrow.textContent = "↗";
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (!formMessage || !bookingSubmit) { console.error("Booking form elements are missing."); return; }

      formMessage.textContent = "";
      formMessage.className = "form-note";
      bookingSubmit.disabled = true;
      if (submitText) submitText.textContent = "Sending enquiry...";
      if (submitArrow) submitArrow.textContent = "…";

      try {
        const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(bookingForm) });
        const data = await response.json();

        if (data.success) {
          formMessage.textContent = "Thank you! Your travel enquiry has been sent successfully. Our team will contact you shortly.";
          formMessage.classList.add("success");
          bookingForm.reset();
          if (submitText) submitText.textContent = "Enquiry sent successfully";
          if (submitArrow) submitArrow.textContent = "✓";
          setTimeout(function () {
            resetSubmit();
            formMessage.textContent = "";
            formMessage.className = "form-note";
          }, 5000);
        } else {
          formMessage.textContent = data.message || "Something went wrong. Please try again.";
          formMessage.classList.add("error");
          resetSubmit();
        }
      } catch (error) {
        console.error("Booking form error:", error);
        formMessage.textContent = "Unable to send your enquiry right now. Please try again or contact us directly.";
        formMessage.classList.add("error");
        resetSubmit();
      }
    });
  }

  /* ---------- DATE INPUT: no past dates ---------- */
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  /* ---------- HEADER SCROLL EFFECT ---------- */
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  console.log("✅ Skybridge main.js loaded successfully");
});


/* =========================================================
   EMAIL CHOOSER MENU (mailto links)
   ========================================================= */
(function () {
  "use strict";

  var SUBJECT = "Travel enquiry - Sky Bridge Travel & Tourism";
  var BODY = "Hello Sky Bridge team,\n\nI would like to know more about...\n\n";
  var menu = null, activeLink = null, statusEl = null;

  function buildMenu() {
    menu = document.createElement("div");
    menu.className = "mail-menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", "Choose how to send an email");
    menu.hidden = true;
    menu.innerHTML =
      '<p class="mail-menu-title">Send an email with</p>' +
      '<a role="menuitem" class="mail-opt" data-act="gmail" target="_blank" rel="noopener noreferrer">Gmail</a>' +
      '<a role="menuitem" class="mail-opt" data-act="outlook" target="_blank" rel="noopener noreferrer">Outlook</a>' +
      '<a role="menuitem" class="mail-opt" data-act="default">Default email app</a>' +
      '<button role="menuitem" type="button" class="mail-opt" data-act="copy">Copy email address</button>' +
      '<p class="mail-status" role="status" aria-live="polite"></p>';
    document.body.appendChild(menu);
    statusEl = menu.querySelector(".mail-status");

    menu.querySelector('[data-act="copy"]').addEventListener("click", function () { copyText(getAddress(activeLink)); });

    menu.addEventListener("click", function (e) {
      var opt = e.target.closest(".mail-opt");
      if (opt && opt.dataset.act !== "copy") setTimeout(closeMenu, 100);
    });

    menu.addEventListener("keydown", function (e) {
      var items = Array.prototype.slice.call(menu.querySelectorAll(".mail-opt"));
      var i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (e.key === "Home") { e.preventDefault(); items[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); items[items.length - 1].focus(); }
      else if (e.key === "Tab") { closeMenu(true); }
    });
  }

  function getAddress(link) {
    var href = (link && link.getAttribute("href")) || "";
    return href.replace(/^mailto:/i, "").split("?")[0].trim();
  }

  function setLinks(address) {
    var to = encodeURIComponent(address), su = encodeURIComponent(SUBJECT), body = encodeURIComponent(BODY);
    menu.querySelector('[data-act="gmail"]').href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + to + "&su=" + su + "&body=" + body;
    menu.querySelector('[data-act="outlook"]').href = "https://outlook.office.com/mail/deeplink/compose?to=" + to + "&subject=" + su + "&body=" + body;
    menu.querySelector('[data-act="default"]').href = "mailto:" + address + "?subject=" + su + "&body=" + body;
  }

  function copyText(text) {
    function done(ok) {
      statusEl.textContent = ok ? "Copied: " + text : "Could not copy. Please copy it manually: " + text;
      if (ok) setTimeout(function () { closeMenu(true); }, 1600);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    else fallback();
  }

  function openMenu(link) {
    if (!menu) buildMenu();
    activeLink = link;
    statusEl.textContent = "";
    setLinks(getAddress(link));
    menu.hidden = false;
    menu.style.left = "";
    menu.style.top = "";

    if (window.innerWidth > 600) {
      var r = link.getBoundingClientRect(), w = menu.offsetWidth, h = menu.offsetHeight;
      var left = Math.min(Math.max(12, r.left), window.innerWidth - w - 12);
      var top = r.bottom + 8;
      if (top + h > window.innerHeight - 12) top = Math.max(12, r.top - h - 8);
      menu.style.left = left + "px";
      menu.style.top = top + "px";
    }

    link.setAttribute("aria-expanded", "true");
    menu.querySelector(".mail-opt").focus();
  }

  function closeMenu(returnFocus) {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    if (activeLink) {
      activeLink.setAttribute("aria-expanded", "false");
      if (returnFocus) activeLink.focus();
    }
    activeLink = null;
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="mailto:"]');
    if (link && !link.closest(".mail-menu")) {
      e.preventDefault();
      if (menu && !menu.hidden && activeLink === link) closeMenu(true);
      else openMenu(link);
      return;
    }
    if (menu && !menu.hidden && !e.target.closest(".mail-menu")) closeMenu();
  });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(true); });
  window.addEventListener("resize", function () { closeMenu(); });
  window.addEventListener("scroll", function () { if (window.innerWidth > 600) closeMenu(); }, { passive: true });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.setAttribute("aria-haspopup", "menu");
    a.setAttribute("aria-expanded", "false");
  });
})();
(function () {
  var slides = document.querySelectorAll('.tm-slide');
  var dots = document.querySelectorAll('.tm-dot');
  var index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('active', n === index); });
    dots.forEach(function (d, n) { d.classList.toggle('active', n === index); });
  }

  document.getElementById('tmPrev').addEventListener('click', function () { show(index - 1); });
  document.getElementById('tmNext').addEventListener('click', function () { show(index + 1); });
  dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); }); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();