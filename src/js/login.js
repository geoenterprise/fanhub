import { loginUser } from "./utils.mjs";

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Call the login function (uses JWT authentication)
    try {
        const accessToken = await loginUser(email, password);

        // Store JWT in localStorage for future API requests
        localStorage.setItem("token", accessToken);

        // Redirect to the dashboard page after successful login
        window.location.href = "/dashboard/index.html";
    } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
    }
});