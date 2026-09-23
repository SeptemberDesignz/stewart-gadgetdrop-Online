// ============================================
// STEWART GADGETDROP - SHOP PAGE SCRIPT
// Search, filters, sorting
// ============================================

let currentFilters = {
    search: '',
    category: 'all',
    sort: 'newest'
};

function renderShopProducts() {
    const container = document.getElementById('shopProducts');
    const noResults = document.getElementById('noResults');
    if (!container) return;

    let products = [...allProducts];

    // Filter by search
    if (currentFilters.search) {
        const q = currentFilters.search.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }

    // Filter by category
    if (currentFilters.category !== 'all') {
        products = products.filter(p => p.category === currentFilters.category);
    }

    // Sort
    switch (currentFilters.sort) {
        case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
        default:
            products.sort((a, b) => b.id - a.id);
    }

    if (products.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        container.innerHTML = products.map(createProductCard).join('');
        if (noResults) noResults.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check URL for category
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
        const categoryMap = {
            'phones': 'Phones',
            'earbuds': 'Earbuds',
            'watches': 'Smartwatches',
            'accessories': 'Accessories'
        };
        currentFilters.category = categoryMap[category.toLowerCase()] || 'all';

        // Highlight the active pill
        document.querySelectorAll('.filter-pill').forEach(pill => {
            if (pill.dataset.category === currentFilters.category) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    // Initial render
    renderShopProducts();

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentFilters.search = e.target.value;
            renderShopProducts();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            currentFilters.sort = e.target.value;
            renderShopProducts();
        });
    }

    // Filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentFilters.category = this.dataset.category;
            renderShopProducts();
        });
    });
});