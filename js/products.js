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

<button onclick="addToCart('${child.key}')">

Add To Cart

</button>

</div>

`;

});

});

function addToCart(id){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push(id);

localStorage.setItem("cart",JSON.stringify(cart));

alert("Added to Cart Successfully");

}
