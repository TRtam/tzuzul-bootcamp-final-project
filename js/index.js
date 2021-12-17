const getCart = async (userJWT, cartId) => {
    if(!(userJWT && cartId)) return false;
    try {
        const response = await fetch("http://localhost:1337/carts/" + cartId, {
            headers: {
                "Authorization": "Bearer " + userJWT
            }
        });
        const cart = await response.json();
        return cart;
    }
    catch(error) {
        return false;
    }
}

window.onload = async () => {
    // user things
    const userDiv = document.getElementById("user-container");
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = user ? await getCart(localStorage.getItem("jwt") || "", user.cart.id) : false;

    if(!user) {
        const div = document.createElement("div");
        div.className = "no-account"
        div.innerHTML = `
<<<<<<< HEAD
            <div class="sesion">
                <div>
                    <b>Hola,</b> Inicia tu sesi&oacute;n 
                </div>
                <div class="account_sub">
                    <a href="auth/login.html" data-test-common="login_register_button" class="mus-link1">Ingres&aacute;</a> | <a href="auth/register.html" data-test-common="login_register_button" class="mus-link1">Registrate</a>
                </div>
            </div>
            <div class="cart_sesion">
                <button class="btn_cart" id="carrito"><img class="cart-icon" src="img/cart-icon.svg" alt="cart"></button>
=======
            <div class="">
                <b>Hola,</b> Inicia tu sesi&oacute;n 
            </div>
            <div class="account_sub">
                <a href="auth/login.html" data-test-common="login_register_button" class="mus-link1">Ingres&aacute;</a> | <a href="auth/register.html" data-test-common="login_register_button" class="mus-link1">Registrate</a>
>>>>>>> a571d7c35bf9f8854c6579fb992a86dc8a703b02
            </div>
        `;
        userDiv.appendChild(div);
    } else {
        const div = document.createElement("div");
        div.className = "account"
        div.innerHTML = `
            <img class="user-icon" src="img/user-icon.svg" alt="account">
            <span class="user-text">${user.username}</span>
<<<<<<< HEAD
            <button class="btn_cart" id="carrito"><img class="cart-icon" src="img/cart-icon.svg" alt="cart"></button>
=======
            <img class="cart-icon" src="img/cart-icon.svg" alt="cart">
>>>>>>> a571d7c35bf9f8854c6579fb992a86dc8a703b02
            <span class="cart-total">${(cart && cart.products.length) || 0}</span>
        `;
        userDiv.appendChild(div);
    }
<<<<<<< HEAD
    const btnCarrito=document.getElementById("carrito");
    btnCarrito.onclick = function(){
        alert("No has iniciado sesión")
    }

}

=======
}
>>>>>>> a571d7c35bf9f8854c6579fb992a86dc8a703b02
