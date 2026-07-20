alert("ADMIN JS IS RUNNING");


import {
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


document.getElementById("uploadBtn").addEventListener("click", async ()=>{

const image = document.getElementById("productImage").value.trim();

await set(push(ref(db,"products")),{

image:image,
name:"Test Product",
price:1000

});

alert("Uploaded");

});
