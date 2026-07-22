import { db } from "../firebase-config.js";

import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ======================
// LOADER
// ======================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});

// ======================
// HEADER EFFECT
// ======================
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (!header) return;

    if (window.scrollY > 80) {
        header.style.background = "#000";
        header.style.boxShadow = "0 5px 20px rgba(212,175,55,.4)";
    } else {
        header.style.background = "rgba(0,0,0,.85)";
        header.style.boxShadow = "none";
    }
});

// ======================
// CART COUNT
// ======================
const cart = document.getElementById("cart-count");

if (cart) {
    cart.textContent = localStorage.getItem("cartCount") || "0";
}

// ======================
// LOAD PRODUCTS
// ======================
const container = document.getElementById("product-container");

if (container) {

    onValue(ref(db, "products"), (snapshot) => {

        container.innerHTML = "";

        if (!snapshot.exists()) {
            container.innerHTML = "<h2>No products available.</h2>";
            return;
        }

        snapshot.forEach((child) => {

            const product = child.val();

            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">

                    <h3>${product.name}</h3>

                    <p>₦${Number(product.price).toLocaleString()}</p>

                    <button onclick="location.href='product.html?id=${child.key}'">
                        View Product
                    </button>
                </div>
            `;

        });

    });

}
