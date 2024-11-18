// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(window.sessionStorage.getItem("cart") || "[]");

// Render product list
function renderProducts() {
    productList.innerHTML = ""; 

    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} 
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });

    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}

// Render cart list
function renderCart() {
    cartList.innerHTML = ""; 

    cart.forEach((cartItem) => {
        const li = document.createElement("li");
        li.innerHTML = `${cartItem.name} - $${cartItem.price} 
        <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
        cartList.appendChild(li);
    });

    document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.getAttribute("data-id"));
            removeFromCart(productId);
        });
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find((item) => item.id === productId);

    if (product) {
        cart.push(product);
        window.sessionStorage.setItem("cart", JSON.stringify(cart)); 
        renderCart(); 
        alert(`${product.name} added to cart!`);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    window.sessionStorage.setItem("cart", JSON.stringify(cart)); 
    renderCart(); 
    alert("Item removed from cart!");
}

// Clear cart
function clearCart() {
    cart = []; 
    window.sessionStorage.setItem("cart", JSON.stringify(cart)); 
    renderCart();
    alert("Cart cleared!");
}

// Initial render
renderProducts();
renderCart();


clearCartBtn.addEventListener("click", clearCart);
