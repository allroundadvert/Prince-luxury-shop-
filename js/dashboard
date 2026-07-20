import { db } from "../firebase/firebase-config.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const productsRef = ref(db,"products");
const ordersRef = ref(db,"orders");

let totalProducts = 0;
let totalOrders = 0;
let totalRevenue = 0;
let delivered = 0;
let pending = 0;

onValue(productsRef,(snapshot)=>{

totalProducts = snapshot.exists() ? snapshot.size : 0;

document.getElementById("totalProducts").innerHTML = totalProducts;

});

onValue(ordersRef,(snapshot)=>{

totalOrders = 0;
totalRevenue = 0;
delivered = 0;
pending = 0;

snapshot.forEach((child)=>{

const order = child.val();

totalOrders++;

totalRevenue += Number(order.amount);

if(order.status==="Delivered"){

delivered++;

}else{

pending++;

}

});

document.getElementById("totalOrders").innerHTML = totalOrders;

document.getElementById("totalRevenue").innerHTML =
"₦"+totalRevenue.toLocaleString();

document.getElementById("deliveredOrders").innerHTML = delivered;

document.getElementById("pendingOrders").innerHTML = pending;

});
