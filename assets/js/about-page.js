// ============================================
// About Page - Counter & Skill Bar Animations
// ============================================

(function () {
  'use strict';

  // ============================================
  // Skill Bar Animation
  // ============================================
  function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      fill.style.width = `${width  }%`;
    });
  }

  // ============================================
  // Initialize Animations
  // ============================================
  function init() {
    if (!('IntersectionObserver' in window)) return;

    const observer = Utils.createObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('animated');

        // Trigger counter animation for stat cards
        if (entry.target.classList.contains('stat-card')) {
          const counter = entry.target.querySelector('.stat-number');
          if (counter && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            const target = parseInt(counter.getAttribute('data-target'));
            Utils.animateCounter(counter, target);
          }
        }

        // Trigger skill bar animation
        if (entry.target.classList.contains('skills-meters-section')) {
          animateSkillBars();
        }
      });
    });

    // Observe elements
    document.querySelectorAll('.stat-card').forEach(card => observer.observe(card));

    const skillsSection = document.querySelector('.skills-meters-section');
    if (skillsSection) observer.observe(skillsSection);
  }

  initAnimateOnView();
  onDomReady(init);

})();
