import { loadHeaderFooter, selectFavorite, confirmSelection} from "./utils.mjs";
import { fetchFavoriteTeams, fetchFavoritePlayers } from "./api.mjs"; // Adjust if needed
import { selectedFavorites } from "./favorites.js";
import { renderPlayerData } from "./players.js";
import { renderTeamData, renderTeamFixtures } from "./teams.js";

document.addEventListener("DOMContentLoaded", async () => {
    const teamId = localStorage.getItem("favoriteTeamId");
    const playerId = localStorage.getItem("favoritePlayerId");

    // Check if user is on the dashboard
    if (document.body.id === "dashboard") {
        const favoriteTeams = await fetchFavoriteTeams();
        const favoritePlayers = await fetchFavoritePlayers();

        // Render favorite teams and players
        const teamsContainer = document.getElementById("favorite-team");
        const playersContainer = document.getElementById("favorite-player");

        favoriteTeams.forEach(team => {
            const teamElement = document.createElement("div");
            teamElement.textContent = `${team.name} - ${team.league}`;
            teamsContainer.appendChild(teamElement);
        });

        favoritePlayers.forEach(player => {
            const playerElement = document.createElement("div");
            playerElement.textContent = `${player.name} - ${player.position}`;
            playersContainer.appendChild(playerElement);
        });

        renderTeamData(teamId);
        renderTeamFixtures(teamId);
    } else if (document.body.id === "team-page") {
        renderTeamData(teamId);
        renderTeamFixtures(teamId);
    } else if (document.body.id === "player-page") {
        renderPlayerData(playerId);
    }

    // Check localStorage for existing selections
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.teams.length && favorites.players.length) {
        window.location.href = "/dashboard/index.html";
    }
});

// Load header and footer
loadHeaderFooter();

// document.addEventListener("DOMContentLoaded", () => {
//     const teamId = localStorage.getItem("favoriteTeamId");
//     const playerId = localStorage.getItem("favoritePlayerId");

//     if (document.body.id === "dashboard") {
//         renderTeamData(teamId);
//         renderTeamFixtures(teamId);
//     } else if (document.body.id === "team-page") {
//         renderTeamData(teamId);
//         renderTeamFixtures(teamId);
//     } else if (document.body.id === "player-page") {
//         renderPlayerData(playerId);
//     }
// });
