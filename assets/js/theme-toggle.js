(function () {
    'use strict';

    const STORAGE_KEY = 'theme-preference';

    const getColorPreference = () => {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    };

    const setPreference = (theme) => {
        localStorage.setItem(STORAGE_KEY, theme);
        reflectPreference(theme);
    };

    const reflectPreference = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            updateToggleIcon(themeToggle, theme);
        }
    };

    const updateToggleIcon = (button, theme) => {
        // Icon for CURRENT mode (not the mode it will switch to)
        // If in dark mode, show sun (to switch to light)
        // If in light mode, show moon (to switch to dark)

        const sunIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;

        const moonIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

        // Show opposite icon (what clicking will switch to)
        const icon = theme === 'dark' ? sunIcon : moonIcon;
        button.innerHTML = icon;
        button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem(STORAGE_KEY) || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setPreference(newTheme);
    };

    // Set theme on page load
    reflectPreference(getColorPreference());

    // Initialize after DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');

        if (themeToggle) {
            reflectPreference(getColorPreference());
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(STORAGE_KEY)) {
                    setPreference(e.matches ? 'dark' : 'light');
                }
            });
        }
    });
})();
