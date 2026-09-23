// ============================================
// STEWART GADGETDROP - CART PAGE SCRIPT
// ============================================

const DELIVERY_FEE = 5000;

document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});

function renderCart() {
    const container = document.getElementById('cartContent');
    const cart = getCart();

    // Empty cart
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    container.innerHTML = `
        <div class="cart-layout">
            <!-- Cart Items -->
            <div class="cart-items">
                <div class="cart-items-header">
                    <h2>Your Items (${cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                    <button class="clear-cart-btn" onclick="handleClearCart()">Clear Cart</button>
                </div>

                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}" 
                                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'cart-item-placeholder\\'>${item.name}</div>';">
                        </div>
                        <div class="cart-item-info">
                            <span class="cart-item-brand">${item.brand}</span>
                            <a href="product.html?id=${item.id}" class="cart-item-name">${item.name}</a>
                            <div class="cart-item-price-mobile">${formatPrice(item.price)}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" onclick="handleUpdateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="handleUpdateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <div class="cart-item-total">
                            ${formatPrice(item.price * item.quantity)}
                        </div>
                        <button class="cart-item-remove" onclick="handleRemoveItem(${item.id})" aria-label="Remove">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>

            <!-- Order Summary -->
            <div class="cart-summary">
                <h2>Order Summary</h2>
                
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="summary-row">
                    <span>Delivery Fee</span>
                    <span>${formatPrice(deliveryFee)}</span>
                </div>
                
                <div class="summary-total">
                    <span>Total</span>
                    <span>${formatPrice(total)}</span>
                </div>

                <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top: 1rem;">
                    Proceed to Checkout
                </a>
                
                <a href="shop.html" class="continue-link">← Continue Shopping</a>
            </div>
        </div>
    `;
}

function handleUpdateQuantity(id, quantity) {
    updateQuantity(id, quantity);
    renderCart();
}

function handleRemoveItem(id) {
    removeFromCart(id);
    showToast('Item removed');
    renderCart();
    updateCartCount();
}

function handleClearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        showToast('Cart cleared');
        renderCart();
    }
}