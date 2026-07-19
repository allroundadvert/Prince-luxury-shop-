// ===============================
// PRINCE JEWELRIES PLUG
// Products
// ===============================

const products = [

{
id:1,
name:"Luxury Gold Necklace",
price:85000,
oldPrice:100000,
image:"images/products/gold-necklace.jpg",
badge:"BEST SELLER"
},

{
id:2,
name:"Dubai Gold Ring",
price:45000,
oldPrice:60000,
image:"images/products/gold-ring.jpg",
badge:"NEW"
},

{
id:3,
name:"Luxury Gold Wristwatch",
price:120000,
oldPrice:150000,
image:"images/products/gold-watch.jpg",
badge:"HOT"
},

{
id:4,
name:"Gold Earrings Set",
price:35000,
oldPrice:50000,
image:"images/products/gold-earring.jpg",
badge:"SALE"
}

];

const container=document.getElementById("product-container");

if(container){

products.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<div class="badge">${product.badge}</div>

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="old-price">₦${product.oldPrice.toLocaleString()}</p>

<h2>₦${product.price.toLocaleString()}</h2>

<button onclick="addToCart('${product.name}',${product.price})">

Add To Cart

</button>

</div>

`;

});

}

function addToCart(name,price){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push({
name,
price
});

localStorage.setItem("cart",JSON.stringify(cart));

localStorage.setItem("cartCount",cart.length);

alert(name+" added to cart successfully.");

location.reload();

}
