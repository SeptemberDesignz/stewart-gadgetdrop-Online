// ============================================
// STEWART GADGETDROP - CHECKOUT PAGE SCRIPT
// ============================================

const CHECKOUT_DELIVERY_FEE = 5000;

document.addEventListener('DOMContentLoaded', function() {
    renderCheckout();
});

function renderCheckout() {
    const container = document.getElementById('checkoutContent');
    const cart = getCart();

    // Redirect to cart if empty
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
                <p>Add some items to your cart before checking out.</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = CHECKOUT_DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    container.innerHTML = `
        <div class="checkout-layout">
            <!-- Form -->
            <div class="checkout-form-wrap">
                <form id="checkoutForm" class="checkout-form">
                    
                    <!-- Personal Info -->
                    <div class="form-section">
                        <div class="form-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <h2>Personal Information</h2>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="firstName">First Name *</label>
                                <input type="text" id="firstName" required placeholder="John">
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name *</label>
                                <input type="text" id="lastName" required placeholder="Doe">
                            </div>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="form-section">
                        <div class="form-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <h2>Contact Information</h2>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" required placeholder="john@example.com">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" required placeholder="+265 888 888 888">
                            </div>
                        </div>
                    </div>

                    <!-- Delivery Info -->
                    <div class="form-section">
                        <div class="form-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="1" y="3" width="15" height="13"></rect>
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                <circle cx="18.5" cy="18.5" r="2.5"></circle>
                            </svg>
                            <h2>Delivery Information</h2>
                        </div>
                        <div class="form-group">
                            <label for="address">Delivery Address *</label>
                            <input type="text" id="address" required placeholder="123 Main Street">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="city">City / Town *</label>
                                <input type="text" id="city" required placeholder="Lilongwe">
                            </div>
                            <div class="form-group">
                                <label for="postal">Postal Code (Optional)</label>
                                <input type="text" id="postal" placeholder="00000">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="notes">Delivery Notes (Optional)</label>
                            <textarea id="notes" rows="3" placeholder="Special delivery instructions..."></textarea>
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="form-section">
                        <div class="form-section-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                            <h2>Payment Method</h2>
                        </div>
                        <div class="payment-options">
                            <label class="payment-option">
                                <input type="radio" name="payment" value="cash" checked>
                                <div class="payment-option-inner">
                                    <strong>Cash on Delivery</strong>
                                    <span>Pay when you receive your order</span>
                                </div>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="mobile">
                                <div class="payment-option-inner">
                                    <strong>Mobile Money</strong>
                                    <span>MPESA, Airtel Money</span>
                                </div>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="bank">
                                <div class="payment-option-inner">
                                    <strong>Bank Transfer</strong>
                                    <span>Pay via bank</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block checkout-submit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Place Order
                    </button>

                    <p class="checkout-terms">
                        By placing your order, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                </form>
            </div>

            <!-- Order Summary -->
            <div class="checkout-summary">
                <h2>Order Summary</h2>

                <div class="checkout-summary-items">
                    ${cart.map(item => `
                        <div class="checkout-summary-item">
                            <div class="checkout-summary-image">
                                <img src="${item.image}" alt="${item.name}"
                                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'checkout-placeholder\\'>${item.name.charAt(0)}</div>';">
                            </div>
                            <div class="checkout-summary-info">
                                <span class="checkout-summary-name">${item.name}</span>
                                <span class="checkout-summary-qty">x${item.quantity}</span>
                            </div>
                            <span class="checkout-summary-price">${formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="checkout-summary-totals">
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
                </div>

                <a href="cart.html" class="continue-link">← Return to Cart</a>
            </div>
        </div>
    `;

    // Handle form submission
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', handlePlaceOrder);
    }
}

function handlePlaceOrder(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();

    if (!firstName || !lastName || !email || !phone || !address || !city) {
        showToast('Please fill in all required fields');
        return;
    }

    if (!email.includes('@')) {
        showToast('Please enter a valid email');
        return;
    }

    // Generate order number
    const orderNumber = 'SGD-' + Date.now().toString().slice(-8);

    // Show success
    const container = document.getElementById('checkoutContent');
    container.innerHTML = `
        <div class="order-success">
            <div class="order-success-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. We'll process it shortly.</p>
            <div class="order-number-box">
                <span>Order Number</span>
                <strong>${orderNumber}</strong>
            </div>
            <div class="order-success-actions">
                <a href="index.html" class="btn btn-primary">Return to Home</a>
                <a href="shop.html" class="btn btn-secondary">Continue Shopping</a>
            </div>
        </div>
    `;

    // Clear cart
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}