/**
 * HAPPY WORLD PEST CONTROL SERVICES
 * Interactive Scripts - Modular, Fast, Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // 2. STICKY HEADER & SCROLL INDICATOR
  // ==========================================================================
  const header = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    updateActiveNav();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 3. ACTIVE NAV LINK ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (targetLink) {
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }

  // ==========================================================================
  // 4. BOOKING MODAL SYSTEM
  // ==========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const bookingModalClose = document.getElementById('bookingModalClose');
  const modalTriggers = document.querySelectorAll('[data-open-modal="booking"]');
  const modalServiceField = document.getElementById('modalServiceSelect');

  function openBookingModal(serviceName = '') {
    if (!bookingModal) return;
    if (modalServiceField && serviceName) {
      modalServiceField.value = serviceName;
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  bookingModalClose?.addEventListener('click', closeBookingModal);

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingModal();
    }
  });

  // ==========================================================================
  // 5. SERVICE DETAILS MODAL (DATA STORE & DYNAMIC POPUP)
  // ==========================================================================
  const serviceDetails = {
    termite: {
      title: "Termite Control & Soil Treatment (উইপোকা দমন)",
      image: "service-termite.jpg",
      badge: "5–10 Year Written Warranty",
      lead: "Complete chemical barrier and deep drilling treatment ensuring permanent elimination of subterranean and wood termites.",
      features: [
        "Pre & Post-Construction Treatment",
        "Deep Wall & Floor Chemical Barrier",
        "Govt. Approved Odorless Termiticides",
        "100% Structural Protection Guarantee"
      ],
      process: "1. Comprehensive acoustic & visual inspection; 2. Precision drilling at foundation wall joints; 3. High-pressure injection of termiticide; 4. Professional sealing & certification."
    },
    cockroach: {
      title: "Cockroach Gel & Herbal Treatment (তেলাপোকা দমন)",
      image: "service-cockroach.jpg",
      badge: "100% Odorless & Herbal Gel",
      lead: "Food-safe, odorless micro-gel baiting system targeting German and American cockroaches at the nesting source.",
      features: [
        "No Need to Vacate Kitchen or Home",
        "Safe Around Children & Pets",
        "Long-lasting Bait Action (6-12 Months)",
        "Zero Chemical Odor or Staining"
      ],
      process: "1. Inspection of cracks, hinges & drainage; 2. Targeted micro-dot herbal gel placement; 3. Nymph and egg cycle disruption; 4. Free follow-up check."
    },
    bedbug: {
      title: "Bed Bug Heat & Elimination Service (ছারপোকা দমন)",
      image: "service-bedbug.jpg",
      badge: "100% Eradication Guarantee",
      lead: "Intensive deep-steaming and dual-action residual spray penetrating mattresses, bed frames, and upholstery.",
      features: [
        "Destroys Both Adult Bugs and Eggs",
        "Deep Thermal Steam Treatment",
        "Fast Same-Day Relief",
        "Free 3-Month Follow-Up Warranty"
      ],
      process: "1. Mattress, headboard and furniture stripping; 2. High-temp dry steam penetrating seams; 3. Residual chemical misting; 4. Re-inspection warranty."
    },
    rodent: {
      title: "Rodent & Rat Control System (ইঁদুর দমন)",
      image: "service-rodent.jpg",
      badge: "Commercial & Home Grade",
      lead: "Multi-layered rodent exclusion, tamper-resistant bait stations, and electronic trapping system.",
      features: [
        "Tamper-Resistant Safety Bait Boxes",
        "Entry Point Identification & Exclusion",
        "Zero Danger to Pets or Humans",
        "Scheduled Monitoring & Disposal"
      ],
      process: "1. Entry burrow & runway mapping; 2. Safe strategic station placement; 3. Anti-coagulant blocks; 4. Entry hole caulking & mesh barriers."
    },
    fogging: {
      title: "Mosquito & Vector Fogging (মশা ও পতঙ্গ নিয়ন্ত্রণ)",
      image: "service-fogging.jpg",
      badge: "Thermal Fog & Cold Mist",
      lead: "ULV cold misting and thermal fogging targeting adult dengue/malaria vectors and larvicide water treatment.",
      features: [
        "Rapid Reduction in Mosquito Density",
        "Dengue & Vector Prevention",
        "Eco-Friendly Larvicide Spray",
        "Ideal for Gardens, Rooftops & Offices"
      ],
      process: "1. Identification of stagnant water breeding spots; 2. Biological larvicide application; 3. Outdoor thermal fogging; 4. Indoor ULV micro-misting."
    },
    commercial: {
      title: "Commercial & Industrial Pest Management",
      image: "service-commercial.jpg",
      badge: "HACCP & ISO Compliant",
      lead: "Tailored IPM (Integrated Pest Management) programs for restaurants, food factories, pharmaceuticals, and corporate facilities.",
      features: [
        "Full Regulatory Compliance Audits",
        "Monthly Service & Logbook Documentation",
        "Non-Disruptive Off-Hour Treatments",
        "Emergency Call-Out Rapid Dispatch"
      ],
      process: "1. Facility risk assessment; 2. Custom IPM schedule; 3. Digital trap and insect monitoring; 4. Executive reporting & audit-ready certification."
    }
  };

  const serviceModal = document.getElementById('serviceModal');
  const serviceModalClose = document.getElementById('serviceModalClose');
  const serviceDetailBtns = document.querySelectorAll('[data-service-key]');

  function openServiceModal(key) {
    const data = serviceDetails[key];
    if (!data || !serviceModal) return;

    document.getElementById('serviceModalTitle').textContent = data.title;
    document.getElementById('serviceModalImg').src = data.image;
    document.getElementById('serviceModalBadge').textContent = data.badge;
    document.getElementById('serviceModalLead').textContent = data.lead;
    document.getElementById('serviceModalProcess').textContent = data.process;

    const listContainer = document.getElementById('serviceModalFeatures');
    listContainer.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${feat}</span>
      `;
      listContainer.appendChild(li);
    });

    const bookModalBtn = document.getElementById('serviceModalBookBtn');
    if (bookModalBtn) {
      bookModalBtn.setAttribute('data-service', data.title);
    }

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  serviceDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service-key');
      openServiceModal(key);
    });
  });

  serviceModalClose?.addEventListener('click', closeServiceModal);

  serviceModal?.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });

  const serviceModalBookBtn = document.getElementById('serviceModalBookBtn');
  if (serviceModalBookBtn) {
    serviceModalBookBtn.addEventListener('click', () => {
      const sName = serviceModalBookBtn.getAttribute('data-service') || '';
      closeServiceModal();
      setTimeout(() => {
        openBookingModal(sName);
      }, 200);
    });
  }

  // ==========================================================================
  // 6. GALLERY FILTERING & LIGHTBOX
  // ==========================================================================
  const galleryFilterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'Happy World Pest Control - Field Inspection';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.gallery-img');
      const title = card.querySelector('h4')?.textContent || '';
      if (img) {
        openLightbox(img.src, title);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-dialog')) {
      closeLightbox();
    }
  });

  // Global ESC key listener for all open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeServiceModal();
      closeLightbox();
    }
  });

  // ==========================================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #111827;
        color: #FFFFFF;
        padding: 14px 26px;
        border-radius: 9999px;
        font-size: 0.92rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="#22c55e" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 50);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4500);
  }

  // ==========================================================================
  // 8. FORM DISPATCH (MODAL BOOKING FORM -> WHATSAPP)
  // ==========================================================================
  const modalBookingForm = document.getElementById('modalBookingForm');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || 'Customer';
      const phone = document.getElementById('modalPhone')?.value || '';
      const service = document.getElementById('modalServiceSelect')?.value || 'Pest Control Service';
      const address = document.getElementById('modalAddress')?.value || 'Dhaka';

      const waMsg = encodeURIComponent(
        `*Happy World Pest Control - Booking Request*%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Location:* ${address}%0APlease confirm my inspection schedule.`
      );

      closeBookingModal();
      showToast(`Booking request sent! Opening WhatsApp desk...`);
      modalBookingForm.reset();

      setTimeout(() => {
        window.open(`https://wa.me/8801771577776?text=${waMsg}`, '_blank');
      }, 1200);
    });
  }
});
