function displayProducts() {

    container.innerHTML = "";

    allProducts.forEach(product => {

        if (
            currentCategory !== "All" &&
            product.category !== currentCategory
        ) {
            return;
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
