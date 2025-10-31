// Reading Progress Bar
(function () {
    'use strict';

    function initReadingProgressBar() {
        const progressBar = document.getElementById('reading-progress-bar');

        if (!progressBar) return;

        const article = document.querySelector('article.post-content') ||
            document.querySelector('main.main-content') ||
            document.querySelector('article');

        if (!article) return;

        function updateProgressBar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const articleEnd = articleTop + articleHeight - windowHeight;
            const readingProgress = (scrollTop - articleTop) / (articleEnd - articleTop);
            const progress = Math.max(0, Math.min(1, readingProgress));

            progressBar.style.width = (progress * 100) + '%';
        }

        // Use shared throttle utility instead of custom ticking guard
        const throttledUpdate = Utils.throttle(updateProgressBar, 16);

        updateProgressBar();
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        window.addEventListener('resize', updateProgressBar, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReadingProgressBar);
    } else {
        initReadingProgressBar();
    }
})();
