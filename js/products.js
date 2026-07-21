import { db } from "../firebase/firebase-config.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const container = document.getElementById("product-container");

const productRef = ref(db,"products");

onValue(productRef,(snapshot)=>{

container.innerHTML="";

snapshot.forEach((child)=>{

const product=child.val();

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="old-price">

₦${Number(product.oldPrice).toLocaleString()}

</p>

<h2>

₦${Number(product.price).toLocaleString()}

</h2>

<p>

${product.description}

</p>
<button onclick="shareProduct('${product.name}','${product.price}','${product.description}','${product.image}')">
📤 Share
</button>
<button onclick="addToCart('${child.key}')">

Add To Cart

</button>

</div>

`;

});

});

window.addToCart = function(id){

const product = {};

const snapshotProducts = document.querySelectorAll(".product-card");

let selectedProduct = null;

onValue(productRef,(snapshot)=>{

snapshot.forEach((child)=>{

if(child.key === id){

selectedProduct = child.val();

}

});

if(selectedProduct){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({

id: id,

name: selectedProduct.name,

price: Number(selectedProduct.price),

image: selectedProduct.image,

description: selectedProduct.description

});

localStorage.setItem("cart", JSON.stringify(cart));

localStorage.setItem("cartCount", cart.length);

alert("✅ Added to Cart Successfully");

}

},{onlyOnce:true});

}
window.shareProduct = async function(name, price, description, image) {

try {

const response = await fetch(image);
const blob = await response.blob();
const file = new File([blob], "product.jpg", { type: blob.type });

await navigator.share({
title: name,
text: `💎 ${name}

💰 Price: ₦${price}

📝 ${description}

🛒 Buy Now:
https://allroundadvert.github.io/Prince-jewelries-plug/shop.html`,
files: [file]
});

} catch (err) {
console.log(err);
}

};
