// ===============================
// PRODUCT RENDERING
// ===============================

let currentProducts = [];

function createCard(product){

return `

<div class="card">

<img src="${product.image}" alt="${product.name}">

${product.badge ? `<span class="badge">${product.badge}</span>` : ""}

<h3>${product.name}</h3>

<button class="fav" onclick="toggleFavourite(this)">
❤️
</button>

<button class="cart-btn" onclick="addToCart('${product.name}')">
🛒 Add To Cart
</button>

<p class="brand">
${product.brand}
</p>

<p class="rating">
⭐ ${product.rating}/5
</p>

<p class="price">
£${product.price}
</p>

<p class="tags">
${product.tags.join(" • ")}
</p>

<a href="${product.link}" target="_blank">
View Item
</a>

</div>

`;

}

function renderProducts(items){

currentProducts = items;

const container =
document.getElementById("product-container");

if(!container) return;

container.innerHTML="";

items.forEach(product=>{

container.innerHTML += createCard(product);

});

updateCount(items.length);

}



// ===============================
// FILTER ENGINE
// ===============================

function filterProducts(){

let filtered=[...products];



// CATEGORY

const category=document.body.dataset.category;

if(category){

filtered=filtered.filter(
p=>p.category===category
);

}



// SEARCH

const search=document.getElementById("search");

if(search){

const value=search.value
.toLowerCase()
.trim();

if(value){

filtered=filtered.filter(product=>{

return (

product.name.toLowerCase().includes(value) ||

product.brand.toLowerCase().includes(value) ||

product.tags.join(" ").toLowerCase().includes(value)

);

});

}

}



// PRICE

const price=document.getElementById("priceFilter");

if(price){

switch(price.value){

case "under25":

filtered=filtered.filter(p=>p.price<25);

break;


case "under50":

filtered=filtered.filter(p=>p.price<50);

break;


case "50to75":

filtered=filtered.filter(
p=>p.price>=50 && p.price<=75
);

break;


case "75to100":

filtered=filtered.filter(
p=>p.price>75 && p.price<=100
);

break;


case "100plus":

filtered=filtered.filter(
p=>p.price>100
);

break;

}

}



// SORT

const sort=document.getElementById("sort");

if(sort){

switch(sort.value){

case "cheap":

filtered.sort(
(a,b)=>a.price-b.price
);

break;



case "expensive":

filtered.sort(
(a,b)=>b.price-a.price
);

break;



case "rating":

filtered.sort(
(a,b)=>b.rating-a.rating
);

break;



case "az":

filtered.sort(
(a,b)=>a.name.localeCompare(b.name)
);

break;



case "za":

filtered.sort(
(a,b)=>b.name.localeCompare(a.name)
);

break;

}

}



renderProducts(filtered);

}



// ===============================
// SEARCH
// ===============================

function searchItems(){

filterProducts();

}



// ===============================
// SORT
// ===============================

function sortProducts(){

filterProducts();

}



// ===============================
// LOAD PRODUCTS
// ===============================

function loadProducts(){

filterProducts();

}



// ===============================
// WISHLIST
// ===============================

function toggleFavourite(button){

const card = button.closest(".card");

const name = card.querySelector("h3").innerText;

const product = products.find(p=>p.name===name);

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

const index =
wishlist.findIndex(item=>item.name===product.name);

if(index>-1){

wishlist.splice(index,1);

button.classList.remove("active");

}else{

wishlist.push(product);

button.classList.add("active");

}

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

}



// ===============================
// LOAD WISHLIST HEARTS
// ===============================

function loadWishlistHearts(){

const wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".card").forEach(card=>{

const name =
card.querySelector("h3").innerText;

const fav =
card.querySelector(".fav");

if(

wishlist.find(item=>item.name===name)

){

fav.classList.add("active");

}

});

}



// ===============================
// CART
// ===============================

function addToCart(name){

const product =
products.find(p=>p.name===name);

if(!product) return;

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const exists =
cart.find(item=>item.name===name);

if(!exists){

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert("🛒 Added to cart!");

}else{

alert("Already in cart.");

}

}



// ===============================
// ITEM COUNTER
// ===============================

function updateCount(number){

const count =
document.getElementById("count");

if(count){

count.innerHTML =
`${number} Items`;

}

}



// ===============================
// REFRESH UI
// ===============================

function refreshProducts(){

filterProducts();

setTimeout(()=>{

loadWishlistHearts();

},10);

}



// ===============================
// AUTO LOAD
// ===============================

window.onload=function(){

refreshProducts();

};



// ===============================
// FUTURE FILTERS
// ===============================

// Brand filter
function filterBrand(){

refreshProducts();

}


// Colour filter
function filterColour(){

refreshProducts();

}


// Fit filter
function filterFit(){

refreshProducts();

}


// Badge filter
function filterBadge(){

refreshProducts();

}