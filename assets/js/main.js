// ============================================
// Main JavaScript - Core Functionality
// ============================================

(function () {
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
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Resume dropdown with Chrome compatibility
    if (resumeToggle && resumeDropdown) {
      resumeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = resumeToggle.getAttribute('aria-expanded') === 'true';

        // Close any other open dropdowns
        document.querySelectorAll('.dropdown-menu.show, .resume-dropdown.show').forEach(otherMenu => {
          if (otherMenu !== resumeDropdown) {
            otherMenu.classList.remove('show');
            const btn = otherMenu.previousElementSibling;
            if (btn) {
              btn.classList.remove('active');
              btn.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // Toggle this dropdown
        if (isExpanded) {
          resumeDropdown.classList.remove('show');
          resumeToggle.classList.remove('active');
          resumeToggle.setAttribute('aria-expanded', 'false');
        } else {
          // Apply active state immediately for icon
          resumeToggle.classList.add('active');
          resumeToggle.setAttribute('aria-expanded', 'true');

          // Force reflow for Chrome
          resumeDropdown.style.display = 'block';
          void resumeDropdown.offsetWidth;

          requestAnimationFrame(() => {
            resumeDropdown.classList.add('show');
          });
        }
      });

      // Close on click outside
      Utils.closeOnClickOutside(resumeToggle, resumeDropdown, () => {
        resumeDropdown.classList.remove('show');
        resumeToggle.classList.remove('active');
        resumeToggle.setAttribute('aria-expanded', 'false');
      });

      // Allow links to work but close dropdown after click
      resumeDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          setTimeout(() => {
            resumeDropdown.classList.remove('show');
            resumeToggle.classList.remove('active');
            resumeToggle.setAttribute('aria-expanded', 'false');
          }, 100);
        }
      });
    }

    // Mobile menu - mobileMenuToggle version
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

      // Close on click outside
      Utils.closeOnClickOutside(mobileMenuToggle, mobileNav, () => {
        mobileNav.classList.remove('show');
        mobileMenuToggle.classList.remove('active');
      });
    }

    // Mobile menu - navToggle version (if different from above)
    if (navToggle && navMenu && navToggle !== mobileMenuToggle) {
      navToggle.addEventListener('click', () => {
        Utils.toggle(navMenu, 'active');
        Utils.toggle(navToggle, 'active');
      });

      // Close on click outside
      Utils.closeOnClickOutside(navToggle, navMenu, () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    }

    // Global Escape key handler for all dropdowns/menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close resume dropdown
        if (resumeDropdown && resumeDropdown.classList.contains('show')) {
          resumeDropdown.classList.remove('show');
          resumeToggle.classList.remove('active');
          resumeToggle.setAttribute('aria-expanded', 'false');
          resumeToggle.focus();
        }
        // Close mobile nav
        if (mobileNav && mobileNav.classList.contains('show')) {
          mobileNav.classList.remove('show');
          mobileMenuToggle.classList.remove('active');
        }
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  } // <-- This was missing

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
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
    initAnimateOnView();
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

  onDomReady(init);
})();
