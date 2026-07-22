import { db } from "../firebase-config.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const container = document.getElementById("product-container");

let allProducts = [];

let currentCategory = "All";

// Load Products From Firebase

onValue(ref(db,"products"),(snapshot)=>{

allProducts=[];

snapshot.forEach((child)=>{

allProducts.push({

id:child.key,

...child.val()

});

});

displayProducts();

});

// Category Filter

window.filterProducts=function(category){

currentCategory=category;

displayProducts();

};

// Display Products

function displayProducts(){

container.innerHTML="";

if(allProducts.length===0){

container.innerHTML="<h2>No Products Available</h2>";

return;

}

allProducts.forEach(product=>{

if(

currentCategory!=="All" &&

product.category!==currentCategory

){

return;

}

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="old-price">

₦${Number(product.oldPrice||0).toLocaleString()}

</p>

<h2>

₦${Number(product.price).toLocaleString()}

</h2>

<p>${product.description||""}</p>

<button onclick="viewProduct('${product.id}')">

View Product

</button>

<button onclick="shareProduct('${product.name}','${product.price}','${product.description}','${product.image}')">

📤 Share

</button>

<button onclick="addToCart('${product.id}')">

Add To Cart

</button>

</div>

`;

});

}
