import { loadHeaderFooter, initializeFavorites, checkFavorites, } from './utils.mjs';
import { searchTeams, searchPlayers, displaySearchResults, fetchPlayerInfo, fetchTeamInfo } from './api.mjs';

document.addEventListener("DOMContentLoaded", () => {
    initializeFavorites();

    // Redirect to dashboard if favorites are already selected
    if (checkFavorites()) {
        window.location.href = "/dashboard/index.html";
    } else {
        setupSearchListeners();
    }
});

async function loadPlayerData() {
    const player = JSON.parse(localStorage.getItem("selectedPlayer"));
    if (player && player.id) {
        const stats = await fetchPlayerStats(player.id);
        if (stats) {
            updateStatsDisplay(stats);
        } else {
            document.getElementById("player-stats").innerHTML = "No stats available.";
        }
    }
}

async function loadTeamData() {
    const team = JSON.parse(localStorage.getItem("selectedTeam"));
    if (team && team.id) {
        const stats = await fetchPlayerStats(team.id);
        if (stats) {
            updateStatsDisplay(stats);
        } else {
            document.getElementById("team-stats").innerHTML = "No stats available.";
        }
    }
}

// Display player data
function displayPlayerInfo(playerInfo) {
    document.getElementById("player-name").textContent = playerInfo.player.name;

    document.getElementById("player-stats").innerHTML = `
        <p>Age: ${playerInfo.player.age}</p>
        <p>Position: ${playerInfo.statistics[0].position}</p>
        <p>Matches Played: ${playerInfo.statistics[0].games.appearences}</p>
        <p>Goals: ${playerInfo.statistics[0].goals.total}</p>
    `;

    document.getElementById("player-highlights").innerHTML = "<p>Highlights will be loaded here...</p>";
    document.getElementById("player-fixtures").innerHTML = "<p>Upcoming fixtures will be loaded here...</p>";
    document.getElementById("player-news").innerHTML = "<p>Player news will be loaded here...</p>";
}

// Display team data
function displayTeamInfo(teamInfo) {
    document.getElementById("team-name").textContent = teamInfo.team.name;

    document.getElementById("team-stats").innerHTML = `
        <p>Founded: ${teamInfo.team.founded}</p>
        <p>Stadium: ${teamInfo.team.venue.name}</p>
    `;

    document.getElementById("team-highlights").innerHTML = "<p>Team highlights will be loaded here...</p>";
    document.getElementById("team-fixtures").innerHTML = "<p>Upcoming fixtures will be loaded here...</p>";
    document.getElementById("team-news").innerHTML = "<p>Team news will be loaded here...</p>";
}

// Conditionally load data based on the page
window.addEventListener("load", () => {
    if (document.getElementById("player-page")) {
        loadPlayerData();
    } else if (document.getElementById("team-page")) {
        loadTeamData();
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
        window.location.href = "/dashboard/index.html";
    } else {
        alert("Please select both a team and a player.");
    }
}

// Make confirmSelection available globally
window.confirmSelection = confirmSelection;

loadHeaderFooter();
