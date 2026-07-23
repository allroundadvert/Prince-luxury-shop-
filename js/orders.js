import { db } from "../firebase/firebase-config.js";

import {
ref,
onValue,
update
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

<h2>${order.customerName}</h2>

<p><strong>Phone:</strong> ${order.customerPhone}</p>

<p><strong>Email:</strong> ${order.customerEmail}</p>

<p><strong>State:</strong> ${order.customerState}</p>

<p><strong>City:</strong> ${order.customerCity}</p>

<p><strong>Address:</strong> ${order.customerAddress}</p>

<p><strong>Amount:</strong> ₦${Number(order.amount).toLocaleString()}</p>

<p><strong>Status:</strong>

<span id="status-${child.key}">

${order.status}

</span>

</p>

<p><strong>Reference:</strong> ${order.paymentReference}</p>

<h3>Products Ordered</h3>

${(order.cart || []).map(item => `

<div style="display:flex;gap:15px;align-items:center;margin:15px 0;padding:10px;border:1px solid #ddd;border-radius:10px;">

<img src="${item.image}"
style="width:80px;height:80px;object-fit:cover;border-radius:8px;">

<div>

<h4>${item.name}</h4>

<p><strong>Price:</strong> ₦${Number(item.price).toLocaleString()}</p>

<p><strong>Quantity:</strong> ${item.quantity || 1}</p>

<p><strong>Subtotal:</strong> ₦${Number((item.quantity || 1) * item.price).toLocaleString()}</p>

</div>

</div>

`).join("")}

<button onclick="markDelivered('${child.key}')">

Mark as Delivered

</button>

<hr>

</div>

`;

});

});

window.markDelivered=function(id){

update(ref(db,"orders/"+id),{

status:"Delivered"

}).then(()=>{

alert("Order marked as Delivered");

});

}
