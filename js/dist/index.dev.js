"use strict";

//slider
document.querySelector('.carousel').addEventListener('click', function () {
  interval: 1000;
}); //active nav

var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('.nav-item a');
window.addEventListener('scroll', function () {
  var current = '';
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(function (link) {
    link.parentElement.classList.remove('active');

    if (link.getAttribute('href').includes(current)) {
      link.parentElement.classList.add('active');
    }
  });
}); // arrow scroll

var scrollIcon = document.querySelector('.scroll-icon');
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollIcon.style.display = 'flex';
  } else {
    scrollIcon.style.display = 'none';
  }
}); //tabs button active

var sectionn = document.querySelectorAll(".tabs-items");
sectionn.forEach(function (section) {
  var tabBtns = section.querySelectorAll(".tabs button");
  tabBtns.forEach(function (tabBtn) {
    tabBtn.addEventListener("click", function () {
      tabBtns.forEach(function (button) {
        button.classList.remove("active");
      });
      this.classList.add("active");
      var tabContents = section.closest(".items").querySelectorAll(".tab-content");
      tabContents.forEach(function (content) {
        content.style.display = "none";
      });
      var dataShow = this.getAttribute("data-show").toLowerCase();
      var contentToShow = section.closest(".items").querySelector(".tab-content[data-content=\"".concat(dataShow, "\"]"));

      if (contentToShow) {
        contentToShow.style.display = "block";
      }
    });
  });
}); //add card button

var addBtns = document.querySelectorAll(".itembtn");
addBtns.forEach(function (addBtn) {
  addBtn.addEventListener("click", function () {
    var buttonText = addBtn.querySelector("a");
    var cardElement = addBtn.closest('.cardProduct');
    var cardData = {
      id: cardElement.getAttribute('product-id'),
      name: cardElement.getAttribute('product-type'),
      price: cardElement.getAttribute('product-price'),
      image: cardElement.getAttribute('product-image'),
      count: 1
    };
    var savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
    var productExists = savedProducts.find(function (product) {
      return product.id === cardData.id;
    });

    if (productExists) {
      savedProducts = savedProducts.filter(function (product) {
        return product.id !== cardData.id;
      });
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
  var savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
  var countElement = document.querySelector('#card-count');

  if (countElement) {
    countElement.textContent = savedProducts.length;
  }
}

function initializeButtonStates() {
  var savedProducts = JSON.parse(localStorage.getItem('cardProducts')) || [];
  var allCards = document.querySelectorAll('.cardProduct');
  allCards.forEach(function (card) {
    var cardId = card.getAttribute('product-id');
    var addBtn = card.querySelector(".itembtn a");
    var productExists = savedProducts.find(function (product) {
      return product.id === cardId;
    });

    if (productExists) {
      addBtn.innerText = "Remove Card";
      addBtn.closest('.itembtn').style.backgroundColor = "red";
    } else {
      addBtn.innerText = "Add Card";
      addBtn.closest('.itembtn').style.backgroundColor = "#0099cc";
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  updateCardCount();
  initializeButtonStates();
}); // Toggle Heart Function

function toggleHeart(element) {
  var productElement = element.closest('.product');
  var heartIcon = productElement.querySelector('.heart i');
  heartIcon.classList.toggle('fa-heart');
  heartIcon.classList.toggle('fa-heart-broken');
  var productData = {
    id: productElement.getAttribute('data-id'),
    name: productElement.getAttribute('data-name'),
    description: productElement.getAttribute('data-description'),
    price: productElement.getAttribute('data-price'),
    image: productElement.getAttribute('data-image'),
    count: 1
  };
  var savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
  var productExists = savedProducts.find(function (product) {
    return product.id === productData.id;
  });

  if (productExists) {
    savedProducts = savedProducts.filter(function (product) {
      return product.id !== productData.id;
    });
  } else {
    savedProducts.push(productData);
  }

  localStorage.setItem('favoriteProducts', JSON.stringify(savedProducts));
  updateFavoriteCount();
}

function initializeHearts() {
  var savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
  var products = document.querySelectorAll('.product');
  products.forEach(function (product) {
    var productId = product.getAttribute('data-id');
    var heartIcon = product.querySelector('.heart i');

    if (savedProducts.some(function (p) {
      return p.id === productId;
    })) {
      heartIcon.classList.remove('fa-heart');
      heartIcon.classList.add('fa-heart-broken');
    }
  });
} //update wishing list count


function updateFavoriteCount() {
  var savedProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
  var countElement = document.querySelector('#favorite-count');

  if (countElement) {
    countElement.textContent = savedProducts.length;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initializeHearts();
  updateFavoriteCount();
});