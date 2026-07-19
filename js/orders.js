import { db } from "../firebase/firebase-config.js";

import {
ref,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const ordersContainer=document.getElementById("ordersContainer");

const ordersRef=ref(db,"orders");

onValue(ordersRef,(snapshot)=>{

ordersContainer.innerHTML="";

if(!snapshot.exists()){

ordersContainer.innerHTML="<h2>No Orders Yet</h2>";

return;

}

snapshot.forEach((child)=>{

const order=child.val();

ordersContainer.innerHTML+=`

<div class="product-card">

<h3>${order.customerName}</h3>

<p><strong>Phone:</strong> ${order.customerPhone}</p>

<p><strong>Email:</strong> ${order.customerEmail}</p>

<p><strong>Amount:</strong> ₦${Number(order.amount).toLocaleString()}</p>

<p><strong>Status:</strong> ${order.status}</p>

<p><strong>Reference:</strong> ${order.paymentReference}</p>

<hr>

</div>

`;

});

});
