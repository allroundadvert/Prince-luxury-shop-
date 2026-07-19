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

const image=document.getElementById("productImage").files[0];

if(!name || !price || !quantity || !category || !description || !image){

alert("Please complete all fields.");

return;

}

try{

const imageRef=storageRef(storage,"products/"+Date.now()+"_"+image.name);

await uploadBytes(imageRef,image);

const imageURL=await getDownloadURL(imageRef);

const productRef=push(ref(db,"products"));

await set(productRef,{

name:name,

price:Number(price),

oldPrice:Number(oldPrice),

quantity:Number(quantity),

category:category,

description:description,

image:imageURL,

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
