import { db } from "../firebase/firebase-config.js";

import {
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
const PAYSTACK_PUBLIC_KEY = "pk_live_33b331a205d88d45cf78059c0b009354f7d1fb17";

function payNow(){

const customerName=document.getElementById("customerName").value;

const customerPhone=document.getElementById("customerPhone").value;

const customerEmail=document.getElementById("customerEmail").value;

const customerState=document.getElementById("customerState").value;

const customerCity=document.getElementById("customerCity").value;

const customerAddress=document.getElementById("customerAddress").value;

if(
customerName===""||
customerPhone===""||
customerEmail===""||
customerState===""||
customerCity===""||
customerAddress===""){

alert("Please complete all fields.");

return;

}

let cart=JSON.parse(localStorage.getItem("cart"))||[];

let total=0;

cart.forEach(item=>{

total+=item.price;

});

let handler=PaystackPop.setup({

key:PAYSTACK_PUBLIC_KEY,

email:customerEmail,

amount:total*100,

currency:"NGN",

ref:"PJP"+Date.now(),

metadata:{

custom_fields:[

{

display_name:"Customer",

variable_name:"customer",

value:customerName

},

{

display_name:"Phone",

variable_name:"phone",

value:customerPhone

}

]

},

callback:function(response){

const orderRef = push(ref(db,"orders"));

set(orderRef,{

customerName: customerName,

customerPhone: customerPhone,

customerEmail: customerEmail,

customerState: customerState,

customerCity: customerCity,

customerAddress: customerAddress,

cart: cart,

amount: total,

paymentReference: response.reference,

status: "Paid",

createdAt: Date.now()

}).then(()=>{

localStorage.removeItem("cart");

localStorage.setItem("cartCount",0);

window.location="payment-success.html";

});
},

onClose:function(){

alert("Payment Cancelled");

}

});

handler.openIframe();

}

window.payNow=payNow;
