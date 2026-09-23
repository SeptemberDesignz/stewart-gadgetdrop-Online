// ============================================
// STEWART GADGETDROP - SWAP PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('swapForm');
    if (form) {
        form.addEventListener('submit', handleSwapSubmit);
    }
});

function generateSwapReference() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SGD-SWAP-${year}-${random}`;
}

function handleSwapSubmit(e) {
    e.preventDefault();

    // Get all form values
    const currentBrand = document.getElementById('currentBrand').value;
    const currentModel = document.getElementById('currentModel').value.trim();
    const currentStorage = document.getElementById('currentStorage').value;
    const currentCondition = document.getElementById('currentCondition').value;
    const screenCondition = document.getElementById('screenCondition').value;
    const bodyCondition = document.getElementById('bodyCondition').value;

    const desiredBrand = document.getElementById('desiredBrand').value;
    const desiredModel = document.getElementById('desiredModel').value.trim();
    const desiredStorage = document.getElementById('desiredStorage').value;
    const desiredColor = document.getElementById('desiredColor').value.trim();

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const notes = document.getElementById('notes').value.trim();

    // Validation
    if (!currentBrand || !currentModel || !currentStorage || !currentCondition ||
        !screenCondition || !bodyCondition || !desiredBrand || !desiredModel ||
        !desiredStorage || !desiredColor || !fullName || !phone || !email) {
        showToast('Please fill in all required fields');
        return;
    }

    if (!email.includes('@')) {
        showToast('Please enter a valid email address');
        return;
    }

    // Generate reference number
    const reference = generateSwapReference();

    // Show success state
    showSwapSuccess(reference, {
        currentBrand, currentModel, currentStorage, currentCondition,
        desiredBrand, desiredModel, desiredStorage, desiredColor,
        fullName, phone, email
    });
}

function showSwapSuccess(reference, data) {
    const container = document.getElementById('swapFormWrap');

    container.innerHTML = `
        <div class="swap-success">
            <div class="order-success-icon" style="background-color: #dcfce7; color: #16a34a;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h2>Swap Request Submitted!</h2>
            <p>Thank you, ${data.fullName}. We've received your swap request and will contact you soon.</p>

            <div class="order-number-box">
                <span>Reference Number</span>
                <strong>${reference}</strong>
            </div>

            <div class="swap-summary-box">
                <h3>Swap Details</h3>
                <div class="swap-summary-row">
                    <span>From:</span>
                    <strong>${data.currentBrand} ${data.currentModel} (${data.currentStorage})</strong>
                </div>
                <div class="swap-summary-row">
                    <span>To:</span>
                    <strong>${data.desiredBrand} ${data.desiredModel} (${data.desiredStorage})</strong>
                </div>
                <div class="swap-summary-row">
                    <span>Contact:</span>
                    <strong>${data.phone}</strong>
                </div>
            </div>

            <div class="swap-info-note">
                <p>We will review your request and contact you within 24 hours to schedule an inspection and give you a final quote.</p>
            </div>

            <div class="order-success-actions">
                <a href="index.html" class="btn btn-primary">Return to Home</a>
                <a href="shop.html" class="btn btn-secondary">Browse Phones</a>
            </div>
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Swap request submitted');
}