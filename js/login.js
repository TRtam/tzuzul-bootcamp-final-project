const loginForm = document.getElementById("login-form");

loginForm.onsubmit = event => {
    event.preventDefault();

    const data = new FormData(event.target);

    axios.post("http://localhost:1337/auth/local", {
        identifier: data.get("email"),
        password: data.get("password")
    })
    .then(response => {
        console.log("successfully logged in");

        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        window.location = "../index.html";
    })
    .catch(error => {
        console.log("can't log in");
    });
}