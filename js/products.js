import { db } from "../firebase/firebase-config.js";

import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const container = document.getElementById("product-container");
const productRef = ref(db, "products");

let allProducts = [];
let currentCategory = "All";

// LOAD PRODUCTS
onValue(productRef, (snapshot) => {

    allProducts = [];

    snapshot.forEach((child) => {

        allProducts.push({
            id: child.key,
            ...child.val()
        });

    });

    displayProducts();

});

// DISPLAY PRODUCTS
function displayProducts() {

    container.innerHTML = "";

    allProducts.forEach(product => {

        if (currentCategory !== "All") {

            const category = (product.category || "").toLowerCase();

            if (currentCategory === "Jewelries") {

                if (
                    !category.includes("jewel") &&
                    !category.includes("ring") &&
                    !category.includes("chain") &&
                    !category.includes("necklace") &&
                    !category.includes("bracelet") &&
                    !category.includes("earring") &&
                    !category.includes("watch")
                ) {
                    return;
                }

            } else if (category !== currentCategory.toLowerCase()) {
                return;
            }

        }

        container.innerHTML += `
<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="old-price">
₦${Number(product.oldPrice).toLocaleString()}
</p>

<h2>
₦${Number(product.price).toLocaleString()}
</h2>

<p>${product.description}</p>

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

// FILTER PRODUCTS
window.filterProducts = function(category) {

    currentCategory = category;

    displayProducts();

};

// ADD TO CART
window.addToCart = function(id) {

    let selectedProduct = null;

    onValue(productRef, (snapshot) => {

        snapshot.forEach((child) => {

            if (child.key === id) {
                selectedProduct = child.val();
            }

        });

        if (selectedProduct) {

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

    }, { onlyOnce: true });

};

// SHARE PRODUCT
window.shareProduct = async function(name, price, description, image) {

    try {

        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], "product.jpg", {
            type: blob.type
        });

        await navigator.share({
            title: name,
            text: `💎 ${name}

💰 Price: ₦${price}

📝 ${description}

🛒 Buy Now:
https://allroundadvert.github.io/Prince-luxury-shop-/shop.html`,
            files: [file]
        });

    } catch (err) {
        console.log(err);
    }

};
