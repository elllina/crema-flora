// Telegram Web App API
const tg = window.Telegram?.WebApp;

// Initialize Telegram Web App
if (tg) {
    tg.ready();
    tg.expand();

    // Apply Telegram theme
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#FFF9F0');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#666666');
    document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2A6B6B');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2A6B6B');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#FFFFFF');
}

// Products Data
const products = [
    {
        id: 1,
        name: "Chocolate Dream",
        category: "chocolate",
        description: "Rich Belgian chocolate layers with smooth ganache frosting. A chocolate lover's paradise crafted with premium cocoa.",
        price: 45.00,
        weight: "1.2 kg",
        image: "../assets/cakes/cocoa.webp"
    },
    {
        id: 2,
        name: "Strawberry Macaron",
        category: "fruit",
        description: "Delicate French macarons with fresh strawberry cream. Light, airy, and bursting with natural berry flavors.",
        price: 38.00,
        weight: "0.8 kg",
        image: "../assets/cakes/mac-strawberry.webp"
    },
    {
        id: 3,
        name: "Lemon Zest",
        category: "fruit",
        description: "Refreshing lemon cake with tangy citrus glaze. Perfect balance of sweet and sour for a delightful experience.",
        price: 35.00,
        weight: "1.0 kg",
        image: "../assets/cakes/limon.webp"
    },
    {
        id: 4,
        name: "Red Velvet Classic",
        category: "classic",
        description: "Traditional red velvet with cream cheese frosting. Soft, moist texture with the perfect hint of cocoa.",
        price: 42.00,
        weight: "1.3 kg",
        image: "../assets/cakes/red-welwet.webp"
    },
    {
        id: 5,
        name: "Tender Elegance",
        category: "special",
        description: "Our signature delicate sponge with vanilla buttercream. Decorated with edible flowers and gold leaf.",
        price: 55.00,
        weight: "1.5 kg",
        image: "../assets/cakes/nejnost.webp"
    },
    {
        id: 6,
        name: "Classic Biscuit",
        category: "classic",
        description: "Timeless layered biscuit cake with condensed milk cream. A nostalgic flavor that brings back sweet memories.",
        price: 32.00,
        weight: "1.0 kg",
        image: "../assets/cakes/stardart-busquite.webp"
    },
    {
        id: 7,
        name: "Honey Delight",
        category: "classic",
        description: "Traditional honey cake with layers of caramelized honey and sour cream. Melt-in-your-mouth goodness.",
        price: 40.00,
        weight: "1.2 kg",
        image: "../assets/cakes/honey.webp"
    },
    {
        id: 8,
        name: "Blueberry Bliss",
        category: "fruit",
        description: "Fresh blueberry cheesecake with buttery graham crust. Topped with a vibrant berry compote.",
        price: 48.00,
        weight: "1.1 kg",
        image: "../assets/cakes/blueberry.webp"
    },
    {
        id: 9,
        name: "Tiramisu Tower",
        category: "special",
        description: "Authentic Italian tiramisu with espresso-soaked ladyfingers. Dusted with premium cocoa powder.",
        price: 50.00,
        weight: "1.4 kg",
        image: "../assets/cakes/tiramisu.webp"
    },
    {
        id: 10,
        name: "Triple Chocolate",
        category: "chocolate",
        description: "Dark, milk, and white chocolate in perfect harmony. Three layers of pure chocolate indulgence.",
        price: 52.00,
        weight: "1.3 kg",
        image: "../assets/cakes/triple-chocolate.webp"
    },
    {
        id: 11,
        name: "Raspberry Rose",
        category: "special",
        description: "Delicate raspberry mousse with rose water essence. Adorned with fresh raspberries and rose petals.",
        price: 58.00,
        weight: "1.2 kg",
        image: "../assets/cakes/raspberry.webp"
    },
    {
        id: 12,
        name: "Caramel Apple",
        category: "fruit",
        description: "Spiced apple cake with salted caramel drizzle. A taste of autumn in every bite.",
        price: 44.00,
        weight: "1.2 kg",
        image: "../assets/cakes/caramel-apple.webp"
    }
];

// State
let cart = [];
let currentProduct = null;
let currentQuantity = 1;
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const checkoutBtn = document.getElementById('checkoutBtn');

const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalWeight = document.getElementById('modalWeight');
const modalPrice = document.getElementById('modalPrice');
const qtyValue = document.getElementById('qtyValue');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const addToCartBtn = document.getElementById('addToCartBtn');

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const orderSummaryItems = document.getElementById('orderSummaryItems');
const orderTotal = document.getElementById('orderTotal');
const deliveryDate = document.getElementById('deliveryDate');

const successModal = document.getElementById('successModal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

// Category buttons
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize
function init() {
    renderProducts();
    setupEventListeners();
    setupDatePicker();
    loadCartFromStorage();
}

// Setup date picker with minimum date
function setupDatePicker() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    deliveryDate.min = tomorrow.toISOString().split('T')[0];
}

// Render products
function renderProducts(category = 'all') {
    const filteredProducts = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image"
                 onerror="this.src='../assets/cakes/stardart-busquite.webp'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-weight">${product.weight}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    // Add click listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.id);
            openProductModal(productId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Cart
    cartBtn.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCartDrawer);
    closeCart.addEventListener('click', closeCartDrawer);
    checkoutBtn.addEventListener('click', openCheckout);

    // Product modal
    closeModal.addEventListener('click', closeProductModal);
    qtyMinus.addEventListener('click', decreaseQuantity);
    qtyPlus.addEventListener('click', increaseQuantity);
    addToCartBtn.addEventListener('click', addToCart);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });

    // Checkout modal
    closeCheckout.addEventListener('click', closeCheckoutModal);
    checkoutForm.addEventListener('submit', submitOrder);
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
    });

    // Success modal
    continueShoppingBtn.addEventListener('click', closeSuccessModal);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });

    // Categories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts(currentCategory);
        });
    });
}

// Product Modal Functions
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQuantity = 1;

    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;
    modalTitle.textContent = currentProduct.name;
    modalDescription.textContent = currentProduct.description;
    modalWeight.textContent = currentProduct.weight;
    modalPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
    qtyValue.textContent = currentQuantity;

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
    currentQuantity = 1;
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        qtyValue.textContent = currentQuantity;
    }
}

function increaseQuantity() {
    if (currentQuantity < 10) {
        currentQuantity++;
        qtyValue.textContent = currentQuantity;
    }
}

// Cart Functions
function addToCart() {
    if (!currentProduct) return;

    const existingItem = cart.find(item => item.id === currentProduct.id);

    if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + currentQuantity, 10);
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: currentQuantity
        });
    }

    updateCartUI();
    saveCartToStorage();
    closeProductModal();

    // Haptic feedback for Telegram
    if (tg) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // Show brief notification
    showNotification('Added to cart!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 500;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                     onerror="this.src='../assets/cakes/stardart-busquite.webp'">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, Math.min(10, item.quantity + change));
        updateCartUI();
        saveCartToStorage();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();

    if (tg) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
}

// Checkout Functions
function openCheckout() {
    if (cart.length === 0) return;

    closeCartDrawer();

    // Update order summary
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderSummaryItems.innerHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;

    // Pre-fill user data from Telegram if available
    if (tg && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const customerName = document.getElementById('customerName');
        if (user.first_name) {
            customerName.value = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        }
    }

    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
}

function submitOrder(e) {
    e.preventDefault();

    const formData = {
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('deliveryAddress').value
        },
        delivery: {
            date: document.getElementById('deliveryDate').value,
            time: document.getElementById('deliveryTime').value
        },
        notes: document.getElementById('specialNotes').value,
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Send order to Telegram bot
    if (tg) {
        const orderMessage = formatOrderMessage(formData);
        tg.sendData(JSON.stringify({
            type: 'order',
            data: formData,
            message: orderMessage
        }));
    }

    // Show success modal
    closeCheckoutModal();
    successModal.classList.add('active');

    // Clear cart
    cart = [];
    updateCartUI();
    saveCartToStorage();
    checkoutForm.reset();

    if (tg) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

function formatOrderMessage(order) {
    let message = `🎂 NEW ORDER\n\n`;
    message += `👤 Customer: ${order.customer.name}\n`;
    message += `📞 Phone: ${order.customer.phone}\n`;
    message += `📍 Address: ${order.customer.address}\n\n`;
    message += `📅 Delivery: ${order.delivery.date} (${order.delivery.time})\n\n`;
    message += `🛒 Items:\n`;
    order.items.forEach(item => {
        message += `  • ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n💰 Total: $${order.total.toFixed(2)}`;
    if (order.notes) {
        message += `\n\n📝 Notes: ${order.notes}`;
    }
    return message;
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = '';

    // Close Telegram WebApp after order
    if (tg) {
        setTimeout(() => {
            tg.close();
        }, 500);
    }
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('cremaFlora_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cremaFlora_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Make functions available globally for onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// Initialize app
init();
