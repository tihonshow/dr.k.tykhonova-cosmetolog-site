(function () {
  'use strict';

  /* ---------------------------------------------------- header scroll */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------- mobile nav */
  var burger = document.getElementById('burgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  var msToggle = document.querySelector('.mobile-services-toggle');
  var msList = document.querySelector('.mobile-services-list');
  if (msToggle && msList) {
    msToggle.addEventListener('click', function () {
      var open = msToggle.getAttribute('aria-expanded') === 'true';
      msToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      msList.style.maxHeight = open ? '' : msList.scrollHeight + 'px';
    });
  }

  /* ---------------------------------------------------- FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      // close siblings within the same faq-list for a tidy accordion
      var list = btn.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            var p = document.getElementById(other.getAttribute('aria-controls'));
            if (p) p.style.maxHeight = '';
          }
        });
      }
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.style.maxHeight = open ? '' : panel.scrollHeight + 'px';
    });
  });

  /* ---------------------------------------------------- lightbox */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.lightbox-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lightboxImg.src = btn.getAttribute('data-src');
        lightboxImg.alt = btn.querySelector('img') ? btn.querySelector('img').alt : '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------------------------------------------------- reveal on scroll */
  var revealSelectors = [
    '.value-card', '.service-card', '.gallery-card', '.location-card',
    '.contact-method', '.focus-card', '.cert-card', '.review-card',
    '.steps-list > li', '.contact-location-card', '.faq-item'
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(','));
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(function (el, i) {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------- active year (footer) */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
