// ============================================
// LOAD FONT AWESOME (Replaces inline onload)
// ============================================
(function() {
    // Font Awesome is now loaded directly, no async needed
    // This function is just a placeholder for any init code
})();

// ============================================
// Existing code below...
// ============================================

// Load Font Awesome after page load (at the top of main.js)
(function() {
    const faCSS = document.getElementById('fontawesome-css');
    if (faCSS && faCSS.media === 'print') {
        faCSS.media = 'all';
    }
})();


// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });
    
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ============================================
// Resume Dropdown Menu - CHROME COMPATIBLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const resumeDropdown = document.getElementById('resumeDropdown');
    const resumeMenu = document.getElementById('resumeMenu');
    
    if (resumeDropdown && resumeMenu) {
        // Toggle dropdown on button click
        resumeDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close any other open dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== resumeMenu) {
                    menu.classList.remove('show');
                    const btn = menu.previousElementSibling;
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle this dropdown with small delay for Chrome
            if (isExpanded) {
                resumeMenu.classList.remove('show');
                this.setAttribute('aria-expanded', 'false');
            } else {
                // Force reflow for Chrome
                resumeMenu.style.display = 'block';
                void resumeMenu.offsetWidth; // Trigger reflow
                
                requestAnimationFrame(() => {
                    resumeMenu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                });
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!resumeDropdown.contains(e.target) && !resumeMenu.contains(e.target)) {
                resumeMenu.classList.remove('show');
                resumeDropdown.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close dropdown on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && resumeMenu.classList.contains('show')) {
                resumeMenu.classList.remove('show');
                resumeDropdown.setAttribute('aria-expanded', 'false');
                resumeDropdown.focus();
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        resumeMenu.addEventListener('click', function(e) {
            // Allow links to work but close dropdown after click
            if (e.target.tagName === 'A') {
                setTimeout(() => {
                    resumeMenu.classList.remove('show');
                    resumeDropdown.setAttribute('aria-expanded', 'false');
                }, 100);
            }
        });
    }
});
