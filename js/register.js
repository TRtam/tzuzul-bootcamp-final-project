const registerForm = document.getElementById("register-form");

registerForm.onsubmit = event => {
    event.preventDefault();

    const data = new FormData(event.target);

    axios.post("http://localhost:1337/auth/local/register", {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password")
    })
    .then(response => {
        console.log("successfully registered");

        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        axios.post("http://localhost:1337/carts",
        {
            products: [
                // empty
            ],
            users_permissions_user: response.data.user.id
        },
        {
            headers: {
                Authorization: `Bearer ${response.data.jwt}`
            }
        })
        .then(response => {
            console.log("successfully created cart");

            const user = JSON.parse(localStorage.getItem("user"));
            user.cart = response.data;
            localStorage.setItem("user", JSON.stringify(user));

            window.location = "../index.html";
        })
        .catch(error => {
            console.log("can't create cart", error);
        });
    })
    .catch(error => {
        console.log("can't register", error);
    });
}