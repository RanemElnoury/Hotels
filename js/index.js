//slider
document.querySelector('.carousel').addEventListener('click', function() {
    interval: 1000
});

//active nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.parentElement.classList.add('active');
        }
    });
});

// arrow scroll
const scrollIcon = document.querySelector('.scroll-icon');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollIcon.style.display = 'flex';
    } else {
        scrollIcon.style.display = 'none';
    }
});

//tabs button active
let sectionn = document.querySelectorAll(".tabs-items");

sectionn.forEach(function (section) {
    let tabBtns = section.querySelectorAll(".tabs button");
    tabBtns.forEach(function (tabBtn) {
        tabBtn.addEventListener("click", function () {
            tabBtns.forEach(function (button) {
                button.classList.remove("active");
            });

            this.classList.add("active");

            let tabContents = section.closest(".items").querySelectorAll(".tab-content");
            tabContents.forEach(function (content) {
                content.style.display = "none";
            });
            
            let dataShow = this.getAttribute("data-show").toLowerCase();
            let contentToShow = section.closest(".items").querySelector(
                `.tab-content[data-content="${dataShow}"]`
            );

            if (contentToShow) {
                contentToShow.style.display = "block";
            }
        });
    });
});



//add card button
var addBtns = document.querySelectorAll(".itembtn");

addBtns.forEach(function(addBtn) {
    addBtn.addEventListener("click", function() {
        var buttonText = addBtn.querySelector("a");

        const cardElement = addBtn.closest('.cardProduct');
        const cardData = {
            id: cardElement.getAttribute('product-id'),
            name: cardElement.getAttribute('product-type'),
            price:cardElement.getAttribute('product-price'), 
            image: cardElement.getAttribute('product-image'),
            count: 1
        };

        let savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
        const productExists = savedProducts.find(product => product.id === cardData.id);

        if (productExists) {
            savedProducts = savedProducts.filter(product => product.id !== cardData.id);
            buttonText.innerText = "Add Card"; 
            addBtn.style.backgroundColor = "#0099cc"; 
        } else {
            savedProducts.push(cardData);
            buttonText.innerText = "Remove Card"; 
            addBtn.style.backgroundColor = "red"; 
        }

        localStorage.setItem('cardProducts', JSON.stringify(savedProducts));
        updateCardCount();
    });
});

function updateCardCount() {
    const savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    const countElement = document.querySelector('#card-count');
    if (countElement) {
        countElement.textContent = savedProducts.length;
    }
}

function initializeButtonStates() {
    const savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    const allCards = document.querySelectorAll('.cardProduct');

    allCards.forEach(card => {
        const cardId = card.getAttribute('product-id');
        const addBtn = card.querySelector(".itembtn a");
        const productExists = savedProducts.find(product => product.id === cardId);

        if (productExists) {
            addBtn.innerText = "Remove Card";
            addBtn.closest('.itembtn').style.backgroundColor = "red";  
        } else {
            addBtn.innerText = "Add Card";  
            addBtn.closest('.itembtn').style.backgroundColor = "#0099cc";  
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    updateCardCount();
    initializeButtonStates();
});



// Toggle Heart Function
function toggleHeart(element) {
    const productElement = element.closest('.product');
    const heartIcon = productElement.querySelector('.heart i');

    heartIcon.classList.toggle('fa-heart');
    heartIcon.classList.toggle('fa-heart-broken');

    const productData = {
        id: productElement.getAttribute('data-id'),
        name: productElement.getAttribute('data-name'),
        description: productElement.getAttribute('data-description'),
        price: productElement.getAttribute('data-price'),
        image: productElement.getAttribute('data-image'),
        count: 1
    };

    let savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const productExists = savedProducts.find(product => product.id === productData.id);

    if (productExists) {
        savedProducts = savedProducts.filter(product => product.id !== productData.id);
    } else {
        savedProducts.push(productData);
    }

    localStorage.setItem('favoriteProducts', JSON.stringify(savedProducts));
    updateFavoriteCount();
}

function initializeHearts() {
    const savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productId = product.getAttribute('data-id');
        const heartIcon = product.querySelector('.heart i');

        if (savedProducts.some(p => p.id === productId)) {
            heartIcon.classList.remove('fa-heart');
            heartIcon.classList.add('fa-heart-broken');
        }
    });
}
//update wishing list count
function updateFavoriteCount() {
    const savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const countElement = document.querySelector('#favorite-count');
    if (countElement) {
        countElement.textContent = savedProducts.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeHearts();
    updateFavoriteCount();
});




