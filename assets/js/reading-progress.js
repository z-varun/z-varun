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

        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateProgressBar();
                    ticking = false;
                });
                ticking = true;
            }
        }

        updateProgressBar();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateProgressBar, { passive: true });
    }

    onDomReady(initReadingProgressBar);
})();
