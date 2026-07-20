import { db, storage } from "../firebase/firebase-config.js";

import {
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

import {
ref as storageRef,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

window.uploadProduct = async function(){

const name=document.getElementById("productName").value.trim();

const price=document.getElementById("productPrice").value;

const oldPrice=document.getElementById("oldPrice").value;

const quantity=document.getElementById("productQuantity").value;

const category=document.getElementById("productCategory").value.trim();

const description=document.getElementById("productDescription").value.trim();

const image = document.getElementById("productImage").value.trim();

if(!name || !price || !quantity || !category || !description || !image){

alert("Please complete all fields.");

return;

}

try{



const productRef=push(ref(db,"products"));

await set(productRef,{

name:name,

price:Number(price),

oldPrice:Number(oldPrice),

quantity:Number(quantity),

category:category,

description:description,

image:image,

createdAt:Date.now()

});

alert("Product uploaded successfully!");

document.getElementById("productName").value="";

document.getElementById("productPrice").value="";

document.getElementById("oldPrice").value="";

document.getElementById("productQuantity").value="";

document.getElementById("productCategory").value="";

document.getElementById("productDescription").value="";

document.getElementById("productImage").value="";

}catch(error){

alert(error.message);

}

}
const uploadBtn = document.getElementById("uploadBtn");

if(uploadBtn){

uploadBtn.addEventListener("click", () => {

uploadProduct();

});

}
import {
remove,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const adminProducts = document.getElementById("adminProducts");

const productsRef = ref(db,"products");

onValue(productsRef,(snapshot)=>{

if(!adminProducts) return;

adminProducts.innerHTML="";

snapshot.forEach((child)=>{

const product=child.val();

adminProducts.innerHTML+=`

<div class="product-card">

<img src="${product.image}" width="120">

<h3>${product.name}</h3>

<p><strong>Price:</strong> ₦${Number(product.price).toLocaleString()}</p>

<p><strong>Stock:</strong> ${product.quantity}</p>

<p><strong>Category:</strong> ${product.category}</p>

<button onclick="deleteProduct('${child.key}')">

Delete

</button>

<hr>

</div>

`;

});

});

window.deleteProduct = function(id){

if(confirm("Delete this product?")){

remove(ref(db,"products/"+id));

}

}
