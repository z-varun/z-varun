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
// Resume Dropdown Menu Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const resumeDropdown = document.getElementById('resumeDropdown');
    const resumeMenu = document.getElementById('resumeMenu');
    
    if (resumeDropdown && resumeMenu) {
        // Toggle dropdown on button click
        resumeDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close any other open dropdowns first
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== resumeMenu) {
                    menu.classList.remove('show');
                    const btn = menu.previousElementSibling;
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle this dropdown
            if (isExpanded) {
                resumeMenu.classList.remove('show');
                this.setAttribute('aria-expanded', 'false');
            } else {
                resumeMenu.classList.add('show');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!resumeDropdown.contains(e.target) && !resumeMenu.contains(e.target)) {
                resumeMenu.classList.remove('show');
                resumeDropdown.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close dropdown when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                resumeMenu.classList.remove('show');
                resumeDropdown.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Prevent dropdown from closing when clicking inside menu
        resumeMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
