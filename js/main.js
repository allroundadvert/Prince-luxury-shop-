import { db } from "../firebase-config.js";

import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



// Loader
window.addEventListener("load", function () {

const loader = document.getElementById("loader");

if(loader){

setTimeout(()=>{
loader.style.opacity="0";
loader.style.visibility="hidden";
},1500);

}

});

// Header
window.addEventListener("scroll",function(){

const header=document.querySelector("header");

if(!header) return;

if(window.scrollY>80){

header.style.background="#000";
header.style.boxShadow="0 5px 20px rgba(212,175,55,.4)";

}else{

header.style.background="rgba(0,0,0,.85)";
header.style.boxShadow="none";

}

});

// Cart
const cart=document.getElementById("cart-count");

if(cart){

cart.innerHTML=localStorage.getItem("cartCount")||0;

}

// LOAD PRODUCTS

const container=document.getElementById("product-container");

if(container){

const productRef=ref(db,"products");

onValue(productRef,(snapshot)=>{

container.innerHTML="";

snapshot.forEach((child)=>{

const product=child.val();

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₦${product.price}</p>

<button onclick="location.href='product.html'">
View Product
</button>

</div>

`;

});

});

}
const container = document.getElementById("product-container");

if (container) {

    const productRef = ref(db, "products");

    onValue(productRef, (snapshot) => {

        container.innerHTML = "";

        snapshot.forEach((child) => {

            const product = child.val();

            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₦${product.price}</p>
                </div>
            `;

        });

    });

}
