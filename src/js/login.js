import { loginUser } from "./utils.mjs";
import { API_ENDPOINTS } from './api.mjs';

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Call the login function (uses JWT authentication)
    try {
        // const accessToken = await loginUser(email, password);
        const response = await fetch(API_ENDPOINTS.LOGIN, { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { accessToken } = await response.json();
        
        localStorage.setItem("token", accessToken);

         // Check if the user has selected their favorite player and team
         const favorites = JSON.parse(localStorage.getItem("favorites")) || { teams: [], players: [] };

        // Redirect based on favorites selection
        if (favorites.teams.length > 0 && favorites.players.length > 0) {
             window.location.href = "/src/dashboard/index.html";
         } else {
             window.location.href = "/src/favorites/index.html";
         }
    } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
    }
});
// const response = await fetch("http://localhost:3000/login", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ email, password })
// });