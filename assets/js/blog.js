// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn:not(.filter-more)');
    const dropdownBtns = document.querySelectorAll('.filter-btn-dropdown');
    const moreFiltersBtn = document.getElementById('moreFiltersBtn');
    const moreFilters = document.getElementById('moreFilters');
    const posts = document.querySelectorAll('.blog-post-item');
    const activeFilterDisplay = document.getElementById('activeFilterDisplay');
    const activeFilterTag = document.getElementById('activeFilterTag');
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    
    let currentFilter = 'all';
    
    // Toggle dropdown
    if (moreFiltersBtn) {
        moreFiltersBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            moreFilters.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (moreFilters && !event.target.closest('.filter-dropdown')) {
            moreFilters.classList.remove('show');
            if (moreFiltersBtn) {
                moreFiltersBtn.classList.remove('active');
            }
        }
    });
    
    // Filter function
    function applyFilter(filter, buttonElement) {
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
        const postsContainer = document.querySelector('.posts-list');
        let noResults = document.querySelector('.no-results-message');
        
        if (visibleCount === 0 && !noResults && postsContainer) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>No posts match the filter "<strong>${filter}</strong>". Try another tag!</p>
            `;
            postsContainer.appendChild(message);
        } else if (visibleCount > 0 && noResults) {
            noResults.remove();
        }
        
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
    
    // Main filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter, this);
        });
    });
    
    // Dropdown filter buttons
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const filter = this.getAttribute('data-filter');
            applyFilter(filter, this);
        });
    });
    
    // Clear filter button
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function() {
            const allPostsBtn = document.querySelector('.filter-btn[data-filter="all"]');
            applyFilter('all', allPostsBtn);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && moreFilters && moreFilters.classList.contains('show')) {
            moreFilters.classList.remove('show');
            if (moreFiltersBtn) {
                moreFiltersBtn.classList.remove('active');
            }
        }
    });
});
