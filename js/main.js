// ============================================
// STEWART GADGETDROP - MAIN SCRIPT
// Navigation, cart, product display
// ============================================

// ===== MOBILE MENU =====
function toggleMenu() {
    // Menu is disabled in current design
}

// ===== CART MANAGEMENT =====
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    showToast('Added to cart');
}

function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
}

function updateQuantity(id, quantity) {
    if (quantity < 1) return;
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = count;
        if (count > 0) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    }
}

// ===== PRODUCT CARD =====
function createProductCard(product) {
    const imgSrc = product.image || '';
    const placeholder = `<div class="product-image-placeholder">${product.name}</div>`;

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${imgSrc}" alt="${product.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-placeholder" style="display:none;">${product.name}</div>
                
                <div class="product-badges">
                    ${product.discount > 0 ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ''}
                    ${product.isNew ? `<span class="product-badge badge-new">NEW</span>` : ''}
                    ${product.isBestSeller ? `<span class="product-badge badge-bestseller">BEST</span>` : ''}
                </div>
                
                <button class="wishlist-btn" onclick="toggleWishlist(event, ${product.id})" aria-label="Add to wishlist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                
                ${!product.inStock ? `<div class="product-out-of-stock"><span>Out of Stock</span></div>` : ''}
            </div>
            
            <div class="product-info">
                <span class="product-brand">${product.brand}</span>
                <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
                
                <div class="product-rating">
                    <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span class="rating-value">${product.rating}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                
                <div class="product-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                
                <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})' ${!product.inStock ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
}

// ===== WISHLIST =====
function toggleWishlist(event, id) {
    event.stopPropagation();
    event.preventDefault();
    const btn = event.currentTarget;
    btn.classList.toggle('active');
    showToast(btn.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist');
}

// ===== TOAST =====
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
    e.preventDefault();
    showToast('Subscribed successfully');
    e.target.reset();
}

function subscribeFooterNewsletter(e) {
    e.preventDefault();
    showToast('Subscribed successfully');
    e.target.reset();
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Update cart count
    updateCartCount();

    // Load featured products on homepage
    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer && typeof allProducts !== 'undefined') {
        const featured = allProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
        featuredContainer.innerHTML = featured.map(createProductCard).join('');
    }

    // Load products on shop page
    const shopContainer = document.getElementById('shopProducts');
    if (shopContainer && typeof allProducts !== 'undefined') {
        shopContainer.innerHTML = allProducts.map(createProductCard).join('');
    }
});