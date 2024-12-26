const wishlistContainer = document.querySelector(".cart ul");
let payNow = document.querySelector(".clearBtn");

function getEmptyWishlistHTML() {
    return `
        <div class="text-center">
            <img src="images/Shopping-Cart.png" class="heartimage" alt="clearWishing" style="width:40%">
           
        </div>
    `;
}

function getProductHTML(product) {
    const totalPrice = (product.price * product.count).toFixed(2); // حساب السعر الإجمالي باستخدام الكمية
    return `
        <li class="row justify-content-between align-items-center border-bottom py-3">
            <div class="col-4">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded me-2" style="width: 50px;">
                <span>${product.name}</span>
            </div>
            <div class="col-3 text-secondary">$${product.price}</div>
            <div class="col-2">
                <button class="btn btn-sm" onclick="updateQuantity('${product.id}', -1)">-</button>
                <span>${product.count}</span>
                <button class="btn btn-sm" onclick="updateQuantity('${product.id}', 1)">+</button>
            </div>
             <div class="col-1">
                <button class="btn btn-danger btn-sm remove-btn" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="col-2 text-secondary">$${totalPrice}</div>
           
        </li>
    `;
}



function renderWishlist() {
    const favoriteProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];

    // طباعة البيانات في وحدة التحكم لمراقبتها
    console.log(favoriteProducts);

    if (favoriteProducts.length === 0) {
        wishlistContainer.innerHTML = getEmptyWishlistHTML();
        payNow.disabled = true; // تعطيل زر "Pay Now" إذا كانت السلة فارغة
        return;
    }

    payNow.disabled = false; // تمكين زر "Pay Now" إذا كانت السلة تحتوي على منتجات
    wishlistContainer.innerHTML = favoriteProducts.map(product => getProductHTML(product)).join('');

    attachRemoveListeners();
    attachAddToCartListeners();
}

function updateQuantity(productId, change) {
    const savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    const productToUpdate = savedProducts.find(product => product.id === productId);

    if (!productToUpdate) return;

    productToUpdate.count += change;
    if (productToUpdate.count <= 0) productToUpdate.count = 1; // الحفاظ على الكمية على الأقل 1

    localStorage.setItem('cardProducts', JSON.stringify(savedProducts));
    renderWishlist();
    updateCartCount();
}


function attachRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            removeFromWishlist(productId);
        });
    });
}

function attachAddToCartListeners() {
    // هنا يمكن إضافة وظائف إذا أردت تنفيذ إضافة العناصر إلى السلة
}

function removeFromWishlist(productId) {
    let savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    savedProducts = savedProducts.filter(product => product.id !== productId);

    localStorage.setItem('cardProducts', JSON.stringify(savedProducts));
    renderWishlist();
    updateCartCount();
}

function updateCartCount() {
    const savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    const countElement = document.querySelector('#card-count');
    if (countElement) {
        countElement.textContent = savedProducts.length;
    }
}
payNow.addEventListener('click', function() {
    const savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    let totalPrice = 0;

    // حساب إجمالي السعر
    savedProducts.forEach(product => {
        totalPrice += product.price * product.count; // ضرب السعر في الكمية
    });

    const confirmPay = confirm(`Are you sure you want to pay? Total price: $${totalPrice.toFixed(2)}`);

    if (confirmPay) {
        // تفريغ السلة
        localStorage.removeItem('cardProducts');
        renderWishlist(); // إعادة رسم السلة بعد التفريغ
        updateCartCount(); // تحديث عداد السلة

        // إظهار صورة جديدة بعد التفريغ
        wishlistContainer.innerHTML = `
            <div class="text-center">
                <img src="images/Shopping-Cart.png" class="heartimage" alt="clearWishing" style="width:30%">
            </div>
        `;
        payNow.disabled = true; // تعطيل الزر بعد التفريغ
    }
});


document.addEventListener('DOMContentLoaded', function() {
    renderWishlist();
    updateCartCount();
});
