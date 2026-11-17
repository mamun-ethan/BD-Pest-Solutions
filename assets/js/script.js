/**
 * BD PEST SOLUTION - Official Interactive Script
 * Handles mobile menu, booking modal, package calculator, 
 * smooth scrolling, WhatsApp dispatch, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Sticky Header with Scroll Indicator
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }

  // 4. Modal Open & Close System
  const modalBackdrop = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('closeModalBtn');
  const bookTriggers = document.querySelectorAll('[data-open-modal]');
  const modalServiceSelect = document.getElementById('modalService');

  function openBookingModal(serviceName = '') {
    if (!modalBackdrop) return;
    if (modalServiceSelect && serviceName) {
      modalServiceSelect.value = serviceName;
    }
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeBookingModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeBookingModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeBookingModal();
    }
  });

  // 5. Interactive Package Calculator
  const calcCheckboxes = document.querySelectorAll('.calc-pkg-check');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');
  const calcDiscountNote = document.getElementById('calcDiscountNote');
  const bookCalcBtn = document.getElementById('bookCalculatedBtn');

  function recalculatePackages() {
    let subtotal = 0;
    let selectedCount = 0;
    const selectedNames = [];

    calcCheckboxes.forEach(cb => {
      if (cb.checked) {
        subtotal += parseInt(cb.getAttribute('data-price') || '0', 10);
        selectedCount++;
        selectedNames.push(cb.getAttribute('data-name'));
      }
    });

    let discount = 0;
    // Combo savings bonus if 2 or more packages are checked!
    if (selectedCount >= 3) {
      discount = 500;
    } else if (selectedCount === 2) {
      discount = 200;
    }

    const total = Math.max(0, subtotal - discount);

    if (calcTotalDisplay) {
      calcTotalDisplay.textContent = `৳ ${total.toLocaleString()}`;
    }

    if (calcDiscountNote) {
      if (discount > 0) {
        calcDiscountNote.textContent = `🎉 Combo discount of ৳${discount} applied!`;
        calcDiscountNote.style.display = 'block';
      } else {
        calcDiscountNote.style.display = 'none';
      }
    }

    if (bookCalcBtn) {
      bookCalcBtn.setAttribute('data-service', selectedNames.join(', ') || 'Custom Package');
    }
  }

  calcCheckboxes.forEach(cb => {
    cb.addEventListener('change', recalculatePackages);
  });
  recalculatePackages();

  // 6. Service Filter Chips
  const filterChips = document.querySelectorAll('.target-chip');
  const serviceCards = document.querySelectorAll('.service-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Toast Notification Utility
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="24" height="24" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 8. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName')?.value || 'Valued Customer';
      const phone = document.getElementById('cPhone')?.value || '';
      const service = document.getElementById('cService')?.value || 'General Inquiry';
      const address = document.getElementById('cAddress')?.value || '';
      const message = document.getElementById('cMessage')?.value || '';

      // Prepare WhatsApp URL for direct dispatch
      const waText = encodeURIComponent(
        `Hello BD Pest Solution!%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Location:* ${address}%0A*Details:* ${message}`
      );
      
      showToast(`Thank you ${name}! Your request has been recorded. Redirecting to WhatsApp...`);
      contactForm.reset();

      setTimeout(() => {
        window.open(`https://wa.me/8801618581001?text=${waText}`, '_blank');
      }, 1500);
    });
  }

  // 9. Quick Booking Modal Form
  const modalBookingForm = document.getElementById('modalBookingForm');
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mName')?.value || 'Customer';
      const phone = document.getElementById('mPhone')?.value || '';
      const service = document.getElementById('modalService')?.value || 'Pest Control Service';
      const address = document.getElementById('mAddress')?.value || 'Dhaka';

      const waText = encodeURIComponent(
        `*Quick Booking Request - BD Pest Solution*%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Package/Service:* ${service}%0A*Address:* ${address}`
      );

      closeBookingModal();
      showToast(`Booking request received! Opening WhatsApp booking desk...`);
      modalBookingForm.reset();

      setTimeout(() => {
        window.open(`https://wa.me/8801618581001?text=${waText}`, '_blank');
      }, 1200);
    });
  }
});
