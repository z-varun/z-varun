// Blog Filter and Search Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn:not(.filter-more)');
    const dropdownBtns = document.querySelectorAll('.filter-btn-dropdown');
    const moreFiltersBtn = document.getElementById('moreFiltersBtn');
    const moreFilters = document.getElementById('moreFilters');
    const posts = document.querySelectorAll('.blog-post-item');
    const activeFilterDisplay = document.getElementById('activeFilterDisplay');
    const activeFilterTag = document.getElementById('activeFilterTag');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    const blogFilters = document.querySelector('.blog-filters');

    // Search elements
    const searchInput = document.getElementById('tagSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchResultsCount = document.getElementById('searchResultsCount');
    const resultsCountText = document.getElementById('resultsCountText');

    let currentFilter = 'all';
    let isSearching = false;

    // Toggle dropdown
    if (moreFiltersBtn) {
        moreFiltersBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            moreFilters.classList.toggle('show');
            this.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (moreFilters && !event.target.closest('.filter-dropdown')) {
            moreFilters.classList.remove('show');
            if (moreFiltersBtn) {
                moreFiltersBtn.classList.remove('active');
            }
        }
    });

    // Filter function
    function applyFilter(filter, buttonElement) {
        if (isSearching) return;

        currentFilter = filter;

        // Update active states
        filterBtns.forEach(b => b.classList.remove('active'));
        dropdownBtns.forEach(b => b.classList.remove('active'));

        if (buttonElement) {
            buttonElement.classList.add('active');
        }

        // Show/hide active filter display
        if (filter === 'all') {
            activeFilterDisplay.style.display = 'none';
        } else {
            activeFilterDisplay.style.display = 'flex';
            activeFilterTag.textContent = filter;
        }

        // Filter posts with animation
        let visibleCount = 0;

        posts.forEach(post => {
            const tags = post.getAttribute('data-tags');

            if (filter === 'all' || tags.includes(filter)) {
                post.style.display = 'flex';
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });

        // Show "no results" message if needed
        updateNoResultsMessage(visibleCount, filter);

        // Close dropdown
        if (moreFilters) {
            moreFilters.classList.remove('show');
            if (moreFiltersBtn) {
                moreFiltersBtn.classList.remove('active');
            }
        }

        // Smooth scroll to posts
        if (filter !== 'all') {
            setTimeout(() => {
                const container = document.querySelector('.blog-container');
                if (container) {
                    container.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            if (searchTerm.length > 0) {
                isSearching = true;
                blogFilters.classList.add('searching');
                clearSearchBtn.style.display = 'block';
                activeFilterDisplay.style.display = 'none';

                let matchCount = 0;

                posts.forEach(post => {
                    const tags = post.getAttribute('data-tags').toLowerCase();
                    const title = post.getAttribute('data-title');
                    const excerpt = post.getAttribute('data-excerpt');

                    const matches = tags.includes(searchTerm) ||
                        title.includes(searchTerm) ||
                        excerpt.includes(searchTerm);

                    if (matches) {
                        post.style.display = 'flex';
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                        matchCount++;
                    } else {
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });

                // Show search results count
                searchResultsCount.style.display = 'block';
                resultsCountText.innerHTML = `Found <strong>${matchCount}</strong> post${matchCount !== 1 ? 's' : ''} matching "<strong>${e.target.value}</strong>"`;

                updateNoResultsMessage(matchCount, `search: ${searchTerm}`);
            } else {
                clearSearch();
            }
        });

        // Clear search button
        clearSearchBtn.addEventListener('click', function () {
            clearSearch();
        });
    }

    function clearSearch() {
        if (searchInput) {
            searchInput.value = '';
        }
        isSearching = false;
        blogFilters.classList.remove('searching');
        clearSearchBtn.style.display = 'none';
        searchResultsCount.style.display = 'none';

        // Reapply current filter
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            applyFilter(currentFilter, activeBtn);
        }
    }

    function updateNoResultsMessage(count, filterName) {
        const postsContainer = document.querySelector('.posts-list');
        let noResults = document.querySelector('.no-results-message');

        if (count === 0 && !noResults && postsContainer) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>No posts match "${filterName}". Try adjusting your filter or search!</p>
            `;
            postsContainer.appendChild(message);
        } else if (count > 0 && noResults) {
            noResults.remove();
        }
    }

    // Main filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (isSearching) {
                clearSearch();
            }
            const filter = this.getAttribute('data-filter');
            applyFilter(filter, this);
        });
    });

    // Dropdown filter buttons
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isSearching) {
                clearSearch();
            }
            const filter = this.getAttribute('data-filter');
            applyFilter(filter, this);
        });
    });

    // Clear filter button
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function () {
            const allPostsBtn = document.querySelector('.filter-btn[data-filter="all"]');
            applyFilter('all', allPostsBtn);
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // ESC to close dropdown or clear search
        if (e.key === 'Escape') {
            if (moreFilters && moreFilters.classList.contains('show')) {
                moreFilters.classList.remove('show');
                moreFiltersBtn?.classList.remove('active');
            } else if (isSearching) {
                clearSearch();
            }
        }

        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput?.focus();
        }
    });
});
