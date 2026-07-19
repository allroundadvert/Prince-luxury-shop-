// ================================
// PRINCE JEWELRIES PLUG
// Main JavaScript
// ================================

// Hide loader after page loads
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1500);
});

// Sticky Header Effect
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.style.background = "#000";
        header.style.boxShadow = "0 5px 20px rgba(212,175,55,0.4)";
    } else {
        header.style.background = "rgba(0,0,0,.85)";
        header.style.boxShadow = "none";
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Floating animation for category cards
const boxes = document.querySelectorAll(".category-box");

boxes.forEach((box, index) => {

    box.style.animation =
        `float 3s ease-in-out ${index * 0.2}s infinite alternate`;

});

// Create animation style
const style = document.createElement("style");

style.innerHTML = `
@keyframes float{

0%{
transform:translateY(0px);
}

100%{
transform:translateY(-10px);
}

}
`;

document.head.appendChild(style);

// Search Box
const search = document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

console.log("Searching:",this.value);

});

}

// Cart Counter

let cartCount = localStorage.getItem("cartCount") || 0;

const cartDisplay = document.getElementById("cart-count");

if(cartDisplay){

cartDisplay.innerText = cartCount;

}

// Welcome Message

console.log("Welcome to Prince Jewelries Plug");
