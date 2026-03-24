// Simple logic for the mobile menu and FAQ accordion

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu handling
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });

    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  // FAQ Accordion handling
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // close others (optional)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // toggle current
        item.classList.toggle('active');
      });
    }
  });

  // Intersection Observer for smooth scroll animations
  const animatedElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .services-grid, .split-layout, .promise-box, .reviews-grid, .faq-item, .contact-info, .map-container, .social-proof-bar'
  );

  animatedElements.forEach((el) => {
    el.classList.add('animate-on-scroll');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
