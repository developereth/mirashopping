/* ============================================
   MIRA SHOPPING - COMPLETE FINAL JAVASCRIPT
   Website: Sweets that make life sweeter
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. MOBILE SIDEBAR TOGGLE ==========
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    function openSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('open');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when clicking any navigation link
    document.querySelectorAll('.sidebar-nav a, .sidebar-order-btn').forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // ========== 2. TOAST NOTIFICATION SYSTEM ==========
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
    
    // ========== 3. ACTIVE NAVIGATION LINK ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.desktop-nav a, .sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ========== 4. ADD TO CART BUTTONS (All Pages) ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const itemName = this.getAttribute('data-item') || 'Item';
            showToast(`✓ ${itemName} added to cart!`);
        });
    });
    
    // ========== 5. CATEGORY FILTER FOR PRODUCTS PAGE ==========
    const filterBtns = document.querySelectorAll('.cat-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                // Filter products
                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.4s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // ========== 6. CONTACT FORM SUBMIT ==========
    const sendContactBtn = document.getElementById('sendContactBtn');
    if (sendContactBtn) {
        sendContactBtn.addEventListener('click', function() {
            const name = document.getElementById('contactName')?.value.trim();
            const email = document.getElementById('contactEmail')?.value.trim();
            const message = document.getElementById('contactMsg')?.value.trim();
            
            if (!name || !email || !message) {
                showToast('⚠️ Please fill all fields (Name, Email, Message)');
                return;
            }
            
            if (!email.includes('@')) {
                showToast('⚠️ Please enter a valid email address');
                return;
            }
            
            showToast('📨 Message sent! We\'ll reply within 24 hours.');
            
            // Clear form
            if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
            if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
            if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
        });
    }
    
    // ========== 7. CATERING FORM SUBMIT ==========
    const submitCateringBtn = document.getElementById('submitCateringBtn');
    if (submitCateringBtn) {
        submitCateringBtn.addEventListener('click', function() {
            const name = document.getElementById('catName')?.value.trim();
            const email = document.getElementById('catEmail')?.value.trim();
            
            if (!name || !email) {
                showToast('⚠️ Please enter your name and email');
                return;
            }
            
            showToast('🎉 Catering request received! We\'ll contact you soon.');
            
            // Clear form
            if (document.getElementById('catName')) document.getElementById('catName').value = '';
            if (document.getElementById('catEmail')) document.getElementById('catEmail').value = '';
            if (document.getElementById('catPhone')) document.getElementById('catPhone').value = '';
            if (document.getElementById('catEvent')) document.getElementById('catEvent').value = '';
            if (document.getElementById('catMsg')) document.getElementById('catMsg').value = '';
        });
    }
    
    // ========== 8. BULK ORDER FORM SUBMIT ==========
    const submitBulkBtn = document.getElementById('submitBulkBtn');
    if (submitBulkBtn) {
        submitBulkBtn.addEventListener('click', function() {
            const name = document.getElementById('bulkName')?.value.trim();
            
            if (!name) {
                showToast('⚠️ Please enter your name');
                return;
            }
            
            showToast('✓ Bulk order request sent! We\'ll contact you soon.');
            
            // Clear form
            if (document.getElementById('bulkName')) document.getElementById('bulkName').value = '';
            if (document.getElementById('bulkEmail')) document.getElementById('bulkEmail').value = '';
            if (document.getElementById('bulkPhone')) document.getElementById('bulkPhone').value = '';
            if (document.getElementById('bulkMsg')) document.getElementById('bulkMsg').value = '';
        });
    }
    
    // ========== 9. REGULAR ORDER FORM SUBMIT ==========
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill Name, Phone, and Address');
                return;
            }
            
            showToast(`✨ Thanks ${name}! Your order has been placed. We'll call you to confirm.`);
            
            // Clear form
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    // ========== 10. CATERING INQUIRY BUTTONS (Scroll to form) ==========
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
    
    // ========== 11. CARD ANIMATION ON SCROLL ==========
    const animateCards = document.querySelectorAll('.product-card');
    if (animateCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animateCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // ========== 12. MAP INITIALIZATION (Contact Page Only) ==========
    if (document.getElementById('map') && typeof L !== 'undefined') {
        const map = L.map('map').setView([9.02497, 38.74689], 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        L.marker([9.02497, 38.74689]).addTo(map).bindPopup('💜 MIRA SHOPPING<br>Addis Ababa, Ethiopia').openPopup();
    }
    
    // ========== 13. SHOP PAGE CART FUNCTIONALITY ==========
    let cart = [];
    const FREE_DELIVERY = 1500;
    
    window.updateCart = function() {
        const cartDiv = document.getElementById('cartItems');
        const totalSpan = document.getElementById('cartTotal');
        const countSpan = document.getElementById('cartCount');
        
        if (!cartDiv) return;
        
        if (cart.length === 0) {
            cartDiv.innerHTML = '<div class="empty-cart">🛒 Your cart is empty</div>';
            if (totalSpan) totalSpan.textContent = 'ETB 0';
            if (countSpan) countSpan.textContent = '(0 items)';
            return;
        }
        
        let html = '';
        let total = 0;
        cart.forEach((item, idx) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <span class="item-name"><strong>${item.name}</strong></span>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="window.changeQty(${idx}, -1)">−</button>
                        <span class="item-qty">${item.qty}</span>
                        <button class="qty-btn" onclick="window.changeQty(${idx}, 1)">+</button>
                        <button class="remove-btn" onclick="window.removeItem(${idx})">🗑️</button>
                    </div>
                    <span class="item-total-price">ETB ${itemTotal}</span>
                </div>
            `;
        });
        cartDiv.innerHTML = html;
        if (totalSpan) totalSpan.textContent = `ETB ${total}`;
        if (countSpan) countSpan.textContent = `(${cart.reduce((s, i) => s + i.qty, 0)} items)`;
        
        const deliveryNote = document.querySelector('.delivery-note');
        if (deliveryNote) {
            if (total >= FREE_DELIVERY) {
                deliveryNote.innerHTML = '✅ Free delivery applied!';
                deliveryNote.style.color = '#4CAF50';
            } else {
                deliveryNote.innerHTML = `🚚 Add ETB ${FREE_DELIVERY - total} more for free delivery`;
                deliveryNote.style.color = '#666';
            }
        }
    };
    
    window.changeQty = function(idx, delta) {
        const newQty = cart[idx].qty + delta;
        if (newQty <= 0) {
            cart.splice(idx, 1);
        } else {
            cart[idx].qty = newQty;
        }
        window.updateCart();
    };
    
    window.removeItem = function(idx) {
        cart.splice(idx, 1);
        window.updateCart();
    };
    
    window.clearCart = function() {
        cart = [];
        window.updateCart();
    };
    
    // Add to cart from shop items
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemDiv = this.closest('.shop-item');
            if (itemDiv) {
                const name = itemDiv.getAttribute('data-name');
                const price = parseInt(itemDiv.getAttribute('data-price'));
                const existing = cart.find(i => i.name === name);
                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({ name, price, qty: 1 });
                }
                window.updateCart();
                showToast(`✓ ${name} added`);
            }
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const name = document.getElementById('orderName')?.value.trim();
            const phone = document.getElementById('orderPhone')?.value.trim();
            const address = document.getElementById('orderAddress')?.value.trim();
            
            if (!name || !phone || !address) {
                showToast('⚠️ Please fill Name, Phone, and Address');
                return;
            }
            
            if (cart.length === 0) {
                showToast('⚠️ Your cart is empty. Please add items.');
                return;
            }
            
            const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
            showToast(`✅ Thanks ${name}! Your order (ETB ${total}) has been placed. We'll call you.`);
            
            cart = [];
            window.updateCart();
            
            if (document.getElementById('orderName')) document.getElementById('orderName').value = '';
            if (document.getElementById('orderPhone')) document.getElementById('orderPhone').value = '';
            if (document.getElementById('orderEmail')) document.getElementById('orderEmail').value = '';
            if (document.getElementById('orderAddress')) document.getElementById('orderAddress').value = '';
            if (document.getElementById('specialInstructions')) document.getElementById('specialInstructions').value = '';
        });
    }
    
    // Initialize cart display on shop page
    if (document.getElementById('cartItems')) {
        window.updateCart();
    }
    
    console.log('MIRA SHOPPING - Website loaded successfully!');
});
