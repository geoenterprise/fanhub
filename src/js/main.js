import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const teamId = localStorage.getItem("favoriteTeamId");
    const playerId = localStorage.getItem("favoritePlayerId");

    if (document.body.id === "dashboard") {
        renderTeamData(teamId);
        renderTeamFixtures(teamId);
    } else if (document.body.id === "team-page") {
        renderTeamData(teamId);
        renderTeamFixtures(teamId);
    } else if (document.body.id === "player-page") {
        renderPlayerData(playerId);
    }
});

loadHeaderFooter();