---
layout: null
permalink: /assets/js/search.js
---

(function () {
  'use strict';

  let searchIndex = null;
  let searchData = [];

  function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');

    if (!searchInput) {
      console.error('Search input element not found');
      return;
    }

    fetch('/search.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Search data loaded:', data.length, 'posts');
        searchData = data;

        searchIndex = lunr(function () {
          this.ref('id');
          this.field('title', { boost: 10 });
          this.field('excerpt', { boost: 3 });
          this.field('content');

          data.forEach((doc, idx) => {
            doc.id = idx.toString();
            this.add(doc);
          });
        });

        console.log('Search index built successfully');

        if (searchResults) {
          searchResults.innerHTML = '';
        }
      })
      .catch(error => {
        console.error('Error loading search index:', error);
        if (searchResults) {
          searchResults.innerHTML = '<div class="search-message error">Failed to load search index.</div>';
        }
      });

    searchInput.addEventListener('input', function (e) {
      const query = e.target.value.trim();

      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchContainer.classList.remove('has-results');
        return;
      }

      performSearch(query);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchContainer.classList.remove('has-results');
      }
    });
  }

  function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');

    if (!searchIndex) {
      searchResults.innerHTML = '<div class="search-message">Search index still loading...</div>';
      return;
    }

    try {
      const results = searchIndex.search(query + '~1 ' + query + '*');

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-message">No results found for "' + escapeHtml(query) + '"</div>';
        searchContainer.classList.add('has-results');
        return;
      }

      let html = '<div class="search-results-count">' + results.length + ' result(s) found</div>';
      html += '<ul class="search-results-list">';

      results.slice(0, 10).forEach(result => {
        const item = searchData[result.ref];
        const excerpt = highlightText(item.excerpt || '', query);

        html += `
        <li class="search-result-item">
          <h3 class="search-result-title">
            <a href="${item.url}">${highlightText(item.title, query)}</a>
          </h3>
          <div class="search-result-meta">
            <span class="search-result-date">${item.date}</span>
          </div>
          <p class="search-result-excerpt">${excerpt}</p>
        </li>
      `;
      });

      html += '</ul>';
      searchResults.innerHTML = html;
      searchContainer.classList.add('has-results');

    } catch (error) {
      console.error('Search error:', error);
      searchResults.innerHTML = '<div class="search-message error">Search error occurred</div>';
    }
  }

  function highlightText(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
