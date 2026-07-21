import { db } from "../firebase/firebase-config.js";

import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const container = document.getElementById("product-container");

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
