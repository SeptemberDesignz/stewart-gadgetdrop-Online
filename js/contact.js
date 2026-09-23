// ============================================
// STEWART GADGETDROP - CONTACT PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showToast('Please fill in all required fields');
        return;
    }

    if (!email.includes('@')) {
        showToast('Please enter a valid email address');
        return;
    }

    // Show success state
    const formWrap = document.querySelector('.contact-form-wrap');
    formWrap.innerHTML = `
        <div class="contact-success">
            <div class="order-success-icon" style="background-color: #dcfce7; color: #16a34a;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>
            <h2>Message Sent!</h2>
            <p>Thank you, ${name}. We'll get back to you within 24 hours.</p>
            <button onclick="location.reload()" class="btn btn-primary">Send Another Message</button>
        </div>
    `;

    showToast('Message sent successfully');
}