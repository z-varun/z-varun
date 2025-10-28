// ============================================
// Main JavaScript - Core Functionality
// ============================================

(function() {
  'use strict';

  // ============================================
  // Font Awesome Loading
  // ============================================
  function loadFontAwesome() {
    const faCSS = document.getElementById('fontawesome-css');
    if (faCSS && faCSS.media === 'print') {
      faCSS.media = 'all';
    }
  }

  // ============================================
  // Navigation & Resume Dropdown
  // ============================================
  function initNavigation() {
    const resumeToggle = document.getElementById('resumeToggle');
    const resumeDropdown = document.getElementById('resumeDropdown');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    // Resume dropdown
    if (resumeToggle && resumeDropdown) {
      resumeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        Utils.toggle(resumeToggle, 'active');
        Utils.toggle(resumeDropdown, 'show');
      });

      Utils.closeOnClickOutside(resumeToggle, resumeDropdown);

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeDropdown.classList.contains('show')) {
          resumeDropdown.classList.remove('show');
          resumeToggle.classList.remove('active');
        }
      });
    }

    // Mobile menu
    if (mobileMenuToggle && mobileNav) {
      mobileMenuToggle.addEventListener('click', () => {
        Utils.toggle(mobileMenuToggle, 'active');
        Utils.toggle(mobileNav, 'show');
      });

      // Close mobile menu when clicking on links
      mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('show');
          mobileMenuToggle.classList.remove('active');
        });
      });
    }
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target && target !== '#') {
          Utils.smoothScrollTo(target, 80);
        }
      });
    });
  }

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = Utils.createObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  // ============================================
  // Initialize All
  // ============================================
  function init() {
    loadFontAwesome();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
