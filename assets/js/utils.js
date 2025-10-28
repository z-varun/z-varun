// ============================================
// Utility Functions - Shared Across All Pages
// ============================================

const Utils = {
  /**
   * Debounce function to limit how often a function runs
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function to ensure function runs at most once per interval
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Animate counter from 0 to target value
   */
  animateCounter(element, target, duration = 2000) {
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  },

  /**
   * Create Intersection Observer with common options
   */
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  },

  /**
   * Smooth scroll to element
   */
  smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * Close dropdown when clicking outside
   */
  closeOnClickOutside(trigger, dropdown, activeClass = 'show') {
    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove(activeClass);
        trigger.classList.remove('active');
      }
    });
  },

  /**
   * Toggle element visibility
   */
  toggle(element, className = 'show') {
    element.classList.toggle(className);
  }
};

// Make Utils available globally
window.Utils = Utils;
