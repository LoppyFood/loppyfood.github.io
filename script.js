import {addCSSInHead} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

let cart = [];

window.addToCart=addToCart;
window.checkout=checkout;

function addToCart(name, price) {
    // Cek jika item sudah ada di keranjang
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // Bersihkan tampilan keranjang sebelum menambah item baru
    cartItemsContainer.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("li");
        cartItem.innerText = `${item.name} - Rp ${(item.price.toLocaleString('id-ID'))} x ${item.quantity} = Rp ${(itemTotal.toLocaleString('id-ID'))}`;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.innerText = `Total Harga: Rp ${(total.toLocaleString('id-ID'))}`;
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",  //success,warning,info,question
            title: "Keranjang Anda kosong. Tambahkan item sebelum checkout.",
            text: cart.length,
        });
        return;
    }

    let orderSummary = "Ringkasan Pesanan:\n";
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderSummary += `${item.name} x ${item.quantity} - Rp ${itemTotal.toLocaleString('id-ID')}\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    orderSummary += `\nTotal: Rp ${total.toLocaleString('id-ID')}`;
    //alert(orderSummary);
    Swal.fire({
        icon: "success",  //success,warning,info,question
        title: "Checkout",
        text: orderSummary,
    }).then((result) => {
        if (result.isConfirmed) {
            
            window.location.href = ""; // Mengalihkan ke halaman payment
        }
    });

    cart = [];
    updateCart();
}