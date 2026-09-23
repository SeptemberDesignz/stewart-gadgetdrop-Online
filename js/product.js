// ============================================
// STEWART GADGETDROP - PRODUCT PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const product = getProductById(id);

    if (!product) {
        document.getElementById('productDetail').innerHTML = `
            <div style="text-align:center; padding: 4rem 1rem;">
                <h2>Product Not Found</h2>
                <p style="color: var(--gray-500); margin: 1rem 0;">The product you're looking for doesn't exist.</p>
                <a href="shop.html" class="btn btn-primary">Back to Shop</a>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = product.name + ' — Stewart Gadgetdrop';
    document.getElementById('breadcrumbName').textContent = product.name;

    // Render product detail
    renderProductDetail(product);

    // Render related products
    renderRelatedProducts(product);
});

function renderProductDetail(product) {
    const container = document.getElementById('productDetail');

    const imgSrc = product.image || '';
    const placeholder = `<div class="product-detail-placeholder">${product.name}</div>`;

    container.innerHTML = `
        <div class="product-detail-grid">
            <!-- Image -->
            <div class="product-detail-image">
                <img src="${imgSrc}" alt="${product.name}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-detail-placeholder" style="display:none;">${product.name}</div>
                
                <div class="product-badges">
                    ${product.discount > 0 ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ''}
                    ${product.isNew ? `<span class="product-badge badge-new">NEW</span>` : ''}
                    ${product.isBestSeller ? `<span class="product-badge badge-bestseller">BEST</span>` : ''}
                </div>
            </div>

            <!-- Info -->
            <div class="product-detail-info">
                <span class="product-detail-brand">${product.brand}</span>
                <h1 class="product-detail-name">${product.name}</h1>

                <div class="product-detail-rating">
                    <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span class="rating-value">${product.rating}</span>
                    <span class="review-count">(${product.reviews} reviews)</span>
                    <span class="stock-status ${product.inStock ? 'in-stock' : 'out-stock'}">
                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                <div class="product-detail-price">
                    <span class="price-current">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
                    ${product.discount > 0 ? `<span class="save-badge">Save ${product.discount}%</span>` : ''}
                </div>

                <p class="product-detail-description">
                    ${product.brand} ${product.name} — Premium quality ${product.category.toLowerCase()} 
                    available now at Stewart Gadgetdrop. 100% genuine product with warranty.
                </p>

                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})' ${!product.inStock ? 'disabled' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <a href="contact.html" class="btn btn-secondary">Contact Us</a>
                </div>

                <!-- Features -->
                <div class="product-features">
                    <div class="feature-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>100% Genuine Product</span>
                    </div>
                    <div class="feature-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        </svg>
                        <span>Fast Delivery Available</span>
                    </div>
                    <div class="feature-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>Warranty Included</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRelatedProducts(product) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    // Get products from same category (excluding current)
    const related = allProducts
        .filter(p => p.id !== product.id && p.category === product.category)
        .slice(0, 4);

    // If less than 4, fill with other products
    if (related.length < 4) {
        const extras = allProducts
            .filter(p => p.id !== product.id && p.category !== product.category)
            .slice(0, 4 - related.length);
        related.push(...extras);
    }

    container.innerHTML = related.map(createProductCard).join('');
}