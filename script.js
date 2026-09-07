/* =========================================================
   JODIKA SELA — PORTFOLIO SCRIPT
   Vanilla JavaScript — tidak menggunakan framework
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. INIT AOS (Animate On Scroll)
  --------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ---------------------------------------------------
     2. LOADING SCREEN
     Sembunyikan loading screen setelah halaman siap.
  --------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
    }, 400);
  });

  /* ---------------------------------------------------
     3. DARK MODE / LIGHT MODE TOGGLE
     Preferensi disimpan di memori (variabel), sesuai
     preferensi sistem sebagai default.
  --------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  // Set tema awal berdasarkan preferensi sistem
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'dark'); // Default: dark (sesuai tema futuristik)

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  /* ---------------------------------------------------
     4. STICKY NAVBAR (berubah gaya saat scroll)
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  /* ---------------------------------------------------
     5. MOBILE MENU TOGGLE
  --------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  // Tutup menu mobile saat salah satu link diklik
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open', 'flex');
      mobileMenu.classList.add('hidden');
      menuIcon.className = 'fa-solid fa-bars';
    });
  });

  /* ---------------------------------------------------
     6. SCROLL PROGRESS BAR
  --------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress);

  /* ---------------------------------------------------
     7. ACTIVE NAV LINK ON SCROLL (scrollspy sederhana)
  --------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ---------------------------------------------------
     8. BACK TO TOP BUTTON
  --------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggleBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     9. ANIMASI PROGRESS BAR SKILL
     Bar akan terisi ketika section skill terlihat di layar.
  --------------------------------------------------- */
  const skillSection = document.getElementById('skills');

  function animateSkillBars() {
    const bars = skillSection.querySelectorAll('.skill-bar div');
    bars.forEach((bar) => {
      bar.style.width = bar.style.width || bar.getAttribute('data-width');
    });
  }

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillSection) {
    // Simpan lebar asli lalu set ke 0 sebelum section terlihat
    const bars = skillSection.querySelectorAll('.skill-bar div');
    bars.forEach((bar) => {
      bar.setAttribute('data-width', bar.style.width);
      bar.style.width = '0';
    });
    skillObserver.observe(skillSection);
  }

  /* ---------------------------------------------------
     10. FORM KONTAK (simulasi pengiriman)
     Catatan untuk pemula: form ini belum terhubung ke
     backend/email service. Untuk menghubungkannya, Anda
     bisa memakai layanan seperti Formspree, EmailJS, atau
     backend sendiri.
  --------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();

      formStatus.textContent = `Terima kasih, ${name}! Pesan Anda telah diterima (mode demo).`;
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = '';
      }, 5000);
    });
  }

  /* ---------------------------------------------------
     11. DOWNLOAD CV (placeholder)
     Ganti href pada tombol ini dengan path file CV asli,
     misal: assets/CV-Jodika-Sela.pdf
  --------------------------------------------------- */
  const downloadCvBtn = document.getElementById('download-cv');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      if (downloadCvBtn.getAttribute('href') === '#') {
        e.preventDefault();
        alert('File CV belum ditambahkan. Silakan ganti tautan tombol "Download CV" pada index.html dengan path file CV Anda.');
      }
    });
  }

});
