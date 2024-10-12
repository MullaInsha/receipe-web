let form = document.querySelector("form");
let userName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let euser = document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let eform = document.querySelectorAll("span")[2];
let dataFromStorage = JSON.parse(localStorage.getItem("recipeUser"));
let signBtn = document.querySelectorAll("button")[0];

// Event listener for form submission
form.addEventListener("submit", (e) => {
    euser.innerHTML = "";
    epass.innerHTML = "";
    eform.innerHTML = "";

    // Checking if there is any data in localStorage
    if (!dataFromStorage) {
        alert("Please sign up first before logging in.");
        e.preventDefault(); // Prevent form submission
        return; // Exit the function
    }

    // Matching user details
    let matchData = dataFromStorage.find((e) => {
        return (e.email == userName.value || e.phone == userName.value) && e.password == password.value;
    });

    // Validating input fields
    if (userName.value === "" && password.value === "") {
        euser.innerHTML = "Enter Email or Mobile Number";
        epass.innerHTML = "Enter the password";
        e.preventDefault();
    } else if (userName.value === "") {
        euser.innerHTML = "Enter Email or Mobile Number";
        e.preventDefault();
    } else if (password.value === "") {
        epass.innerHTML = "Enter the password";
        e.preventDefault();
    } else if (matchData) {
        alert("Welcome to the page");
        localStorage.setItem("RecipeOneUser", JSON.stringify(matchData));
    } else {
        alert("Match Not Found. Please sign up first.");
        e.preventDefault(); // Prevent form submission
    }
});

// Event listener for password visibility toggle
let h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
    if (h3.innerHTML === "show") {
        password.type = "text";
        h3.innerHTML = "hide";
    } else {
        h3.innerHTML = "show";
        password.type = "password";
    }
});

// Event listener for the signup button
signBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
});
