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
