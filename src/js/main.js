import { loadHeaderFooter, initializeFavorites, checkFavorites, saveFavorite } from './utils.mjs';
import { searchTeams, searchPlayers, displaySearchResults } from './api.mjs';

document.addEventListener("DOMContentLoaded", () => {
    initializeFavorites();

    // Redirect to dashboard if favorites are already selected
    if (checkFavorites()) {
        window.location.href = "/dashboard.html";
    } else {
        setupSearchListeners();
    }
});

function setupSearchListeners() {
    // Set up team search
    document.getElementById("team-search").addEventListener("input", async (event) => {
        const teamName = event.target.value;
        const teamResults = await searchTeams(teamName);
        displaySearchResults("team-results", teamResults, "team");
    });

    // Set up player search
    document.getElementById("player-search").addEventListener("input", async (event) => {
        const playerName = event.target.value;
        const playerResults = await searchPlayers(playerName);
        displaySearchResults("player-results", playerResults, "player");
    });
}

// Confirm selection function
function confirmSelection() {
    if (checkFavorites()) {
        alert("Favorites saved!");
        window.location.href = "/dashboard.html";
    } else {
        alert("Please select both a team and a player.");
    }
}

// Make confirmSelection available globally
window.confirmSelection = confirmSelection;

loadHeaderFooter();
