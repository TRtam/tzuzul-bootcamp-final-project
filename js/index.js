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
            </div>
        `;
        userDiv.appendChild(div);
    }else {
        const div = document.createElement("div");
        div.className = "account"
        div.innerHTML = `
            <img class="user-icon" src="img/user-icon.svg" alt="account">
            <span class="user-text">${user.username}</span>
            <button class="btn_cart"><img class="cart-icon" src="img/cart-icon.svg" alt="cart"></button>
            <span class="cart-total">${(cart && cart.products.length) || 0}</span>
        `;
        userDiv.appendChild(div);
    }

    const btnCarrito=document.getElementById("carrito");
    btnCarrito.onclick = function(){
        alert("No has iniciado sesión")
    }
}

//boton carrito
const btn_strapi = document.getElementById("btn_strapi")

btn_strapi.onclick = () =>{
    const idCarrito = localStorage.getItem(cartId)
    console.log("mi carrito")
    
    if(cartId){
        const response = await fetch("http://localhost:1337/carts/" + cartId, {
            method:"GET",
            headers: {
                "Authorization": "Bearer " + userJWT
            }
           
        });
        const cart = await response.json();
        return cart;
        console.log("Mi carrito", cart);

        const idsProductos = cart.productos.map(producto=>producto.id)
        idsProductos.push()
        const response = await fetch("http://localhost:1337/carts/" + cartId, {
            method:"PUT",
            headers: {
                "Authorization": "Bearer " + userJWT
            },
            body:JSON.stringify({
                productos: idsProductos
            })
        });
        const cart = await response.json();
        return cart;
        console.log("Mi carrito", cart)
    }else{
        //crea un carrito
        const response = await fetch("http://localhost:1337/carts/", {
            method:"POST",
            headers: {
                "Authorization": "Bearer " + userJWT
            },
            body:JSON.stringify({
                productos: [2],
                //cuando creo un carrito asigno un usuario, el id usuario
                user_permissions_user: 1,
                cantidad: 2
            })
        });
        const cart = await response.json();
        return cart;
        console.log("Mi carrito", cart)
        localStorage.setItem("cartId", cart.id)
    }
}