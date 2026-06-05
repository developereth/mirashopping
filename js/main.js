/* ============================================
   MIRA SHOPPING - COMPLETE JAVASCRIPT
   Mobile Sidebar | Toast Notifications | Cart Functions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE SIDEBAR ==========
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const openBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (openBtn) {
        openBtn.addEventListener('click', openSidebar);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking navigation links
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== TOAST NOTIFICATION SYSTEM ==========
    window.showToast = function(message, duration = 2500) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'toast-msg';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function() {
            toast.classList.remove('show');
        }, duration);
    };
    
    // ========== ADD TO CART BUTTONS (All Pages) ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const itemName = this.getAttribute('data-item') || 'Item';
            showToast(`✓ ${itemName} added to cart!`);
        });
    });
    
    // ========== SHOP NOW BUTTONS ==========
    document.querySelectorAll('.shop-now-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Just redirects to shop page, no toast needed
        });
    });
    
    // ========== ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== CATERING/BULK INQUIRY BUTTONS ==========
    document.querySelectorAll('.catering-inquiry, .bulk-inquiry').forEach(btn => {
        btn.addEventListener('click', function() {
            const formSection = document.getElementById('cateringForm') || document.getElementById('bulkForm');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('📋 Please fill out the form below');
            } else {
                showToast('📋 Please contact us for more information');
            }
        });
    });
    
    // ========== FORM SUBMISSION HANDLERS ==========
    
    // Catering Form Submit
    const submitCatering = document.getElementById('submitCateringBtn');
    if (submitCatering) {
        submitCatering.addEventListener('click', function() {
            const name = document.getElementById('catName')?.value;
            const email = document.getElementById('catEmail')?.value;
            if (!name || !email) {
                showToast('⚠️ Please enter your name and email');
                return;
            }
            showToast('🎉 Request received! We\'ll contact you within 24 hours.');
            // Clear form
            const form = document.getElementById('cateringForm');
            if (form) form.reset();
        });
    }
    
    // Bulk Order Form Submit
    const submitBulk = document.getElementById('submitBulkBtn');
    if (submitBulk) {
        submitBulk.addEventListener('click', function() {
            const name = document.getElementById('bulkName')?.value;
            if (!name) {
                showToast('⚠️ Please enter your name');
                return;
            }
            showToast('✓ Bulk order request sent! We\'ll contact you soon.');
            const form = document.getElementById('bulkForm');
            if (form) form.reset();
        });
    }
    
    // Contact Form Submit
    const sendContact = document.getElementById('sendContactBtn');
    if (sendContact) {
        sendContact.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value;
            const email = document.getElementById('contactEmail')?.value;
            if (!name || !email) {
                showToast('⚠️ Please enter your name and email');
                return;
            }
            showToast('📨 Message sent! We\'ll reply within 24 hours.');
            const form = document.getElementById('contactForm');
            if (form) form.reset();
        });
    }
    
    // Order Form Submit
    const submitOrder = document.getElementById('submitOrderBtn');
    if (submitOrder) {
        submitOrder.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value;
            const phone = document.getElementById('orderPhone')?.value;
            const address = document.getElementById('orderAddress')?.value;
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill all required fields');
                return;
            }
            showToast(`✨ Thanks ${name}! Your order has been placed. We'll call you to confirm.`);
            const form = document.getElementById('orderForm');
            if (form) form.reset();
        });
    }
    
    // ========== ANIMATION FOR CARDS ON SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // ========== CATEGORY FILTER FOR HOME PAGE ==========
    const categoryLinks = document.querySelectorAll('.category-link');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-cat');
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ========== PRODUCT PAGE CATEGORY FILTER ==========
    const catButtons = document.querySelectorAll('.cat-btn');
    if (catButtons.length > 0) {
        catButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                catButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ========== CHECKOUT BUTTON (Shop Page) ==========
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value;
            const phone = document.getElementById('orderPhone')?.value;
            const address = document.getElementById('orderAddress')?.value;
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill Name, Phone, and Address');
                return;
            }
            
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                showToast('🛒 Your cart is empty. Please add items.');
                return;
            }
            
            showToast(`✅ Thanks ${name}! Your order has been placed. We'll call you to confirm.`);
            
            // Clear cart and form (if cart functions exist)
            if (typeof window.clearCart === 'function') {
                window.clearCart();
            }
            
            const orderForm = document.getElementById('orderForm');
            if (orderForm) orderForm.reset();
        });
    }
    
    // ========== ADD TO CART BUTTONS FOR SHOP PAGE ==========
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const itemName = this.closest('.shop-item')?.getAttribute('data-name') || 'Item';
                showToast(`✓ ${itemName} added to cart`);
            });
        });
    }
    
    // ========== QUANTITY BUTTONS STYLING FIX ==========
    // Ensure +/- buttons are visible with proper styling
    const style = document.createElement('style');
    style.textContent = `
        .qty-btn, .minus-btn, .plus-btn {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 32px !important;
            height: 32px !important;
            font-size: 18px !important;
            font-weight: bold !important;
            cursor: pointer !important;
        }
        .cart-controls {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('MIRA SHOPPING - Website loaded successfully!');
});
